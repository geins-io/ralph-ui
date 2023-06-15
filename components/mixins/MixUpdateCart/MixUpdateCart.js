import updateCartMutation from 'cart/update.graphql';
import updateCartGroupMutation from 'cart/update-group.graphql';
import MixPromiseQueue from 'MixPromiseQueue';
import { mapState } from 'vuex';
import * as GTM from '../../../services/gtm';
// @group Mixins
// @vuese
// Function to update the current cart
export default {
  name: 'MixUpdateCart',
  mixins: [MixPromiseQueue],
  props: {},
  data: () => ({}),
  computed: {
    // @vuese
    // If is a product package
    isPackage() {
      return !!this.item?.product?.productPackage;
    },
    // @vuese
    // Mutation based on if is a package or not
    mutation() {
      return !this.isPackage ? updateCartMutation : updateCartGroupMutation;
    },
    ...mapState({
      cart: state => state.cart.data,
      cartmeta: state => state.cartmeta
    })
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Get update item
    // @arg updateId (Number), product quantity (Number)
    getUpdateItem(updateId, productQuantity) {
      const data = {
        quantity: productQuantity
      };

      if (!this.isPackage) {
        data.skuId = updateId;
      } else {
        data.groupKey = this.packageGroupKey;
      }

      return data;
    },
    // @vuese
    // Count updated product quantity
    // @arg productQuantityPreUpdate (Number), product quantity (Number)
    getUpdatedProductQuantity(productQuantityPreUpdate, productQuantity) {
      // remove totally item from cart
      if (productQuantity === productQuantityPreUpdate) {
        return productQuantityPreUpdate;
      }
      // decrease or increase items in cart
      return Math.abs(productQuantityPreUpdate - productQuantity);
    },
    // @vuese
    // Get product pre update
    // @arg updateId (Number)
    getProductPreUpdate(updateId) {
      let items = this.cart?.items;

      if (this.isPackage) {
        items = this.cartmeta?.productPackages;
      }

      console.log(
        'getProductPreUpdate',
        this.cartmeta?.productPackages,
        updateId
      );

      return items.find(item => item.skuId === updateId);
    },
    // @vuese
    // Get selected sku from items
    // @arg items (Array), skuIdToMatch (Number)
    getSelectedSku(
      items,
      idToMatch,
      productQuantityPreUpdate,
      productQuantity
    ) {
      // get item from cartmeta and update quantity as difference
      return items
        .filter(item => item.skuId === idToMatch)
        .map(item => ({
          ...item,
          quantity: this.getUpdatedProductQuantity(
            productQuantityPreUpdate,
            productQuantity
          )
        }));
    },
    // @vuese
    // Update the cart. Will perform a graphql mutation
    // @arg sku id (Number), product quantity (Number)
    updateCart(updateId, productQuantity) {
      this.$emit('loading', true);

      const productPreUpdate = this.getProductPreUpdate(updateId);
      const productQuantityPreUpdate = productPreUpdate?.quantity || 0;
      const updateItem = this.getUpdateItem(updateId, productQuantity);

      const updateMutation = () =>
        this.$apollo
          .mutate({
            mutation: this.mutation,
            variables: {
              id: this.$store.getters['cart/id'],
              item: updateItem
            }
          })
          .then(result => {
            const response = !this.isPackage
              ? result.data.updateCartItem
              : result.data.updateCartGroup;
            let updateEvent = 'cart:add';

            this.$store.dispatch('cart/update', response);
            this.$emit('loading', false);

            if (productQuantity > productQuantityPreUpdate) {
              const quantity = productQuantity - productQuantityPreUpdate;
              updateItem.quantity = quantity;
            } else if (productQuantityPreUpdate > productQuantity) {
              const quantity = productQuantityPreUpdate - productQuantity;
              updateItem.quantity = quantity;
              updateEvent = 'cart:remove';
            }

            this.$store.dispatch('events/push', {
              type: updateEvent,
              data: {
                item: updateItem,
                product: productPreUpdate
              }
            });

            if (this.isPackage) {
              this.$store.commit(
                'cartmeta/updateExistingProductPackageQuantity',
                {
                  skuId: updateId,
                  quantity: productQuantity
                }
              );
            }

            // GTM
            const countCurrentProducts = () => {
              let product = response.items.find(
                item => item.skuId === updateId
              );

              if (this.isPackage) {
                product = this.cartmeta.productPackages.find(
                  item => item.skuId === updateId
                );
              }

              if (!product) {
                // get item from store (item removed so whole quantity taken)
                return [productPreUpdate];
              }

              // get item from api response and update quantity as difference
              let item = this.getSelectedSku(
                response.items,
                updateId,
                productQuantityPreUpdate,
                productQuantity
              );

              if (this.isPackage) {
                // get item from cartmeta and update quantity as difference
                item = this.getSelectedSku(
                  this.cartmeta.productPackages,
                  updateId,
                  productQuantityPreUpdate,
                  productQuantity
                );
              }

              return item;
            };

            GTM.updateProductQuantityInCart({
              gtmInputs: {
                gtm: this.$gtm,
                currency: this.$store.getters['channel/currentCurrency'],
                key: this.$store.getters.getGtmProductsKey
              },
              previousQuantity: productQuantityPreUpdate,
              currentQuantity: productQuantity,
              products: countCurrentProducts()
            });
          })
          .catch(error => {
            console.error('MixUpdateCart: ' + error);
          });
      this.enqueue(updateMutation);
    }
  }
};
