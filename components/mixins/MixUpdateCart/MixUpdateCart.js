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
      return this.item?.groupKey && this.item?.groupKey.length;
    },
    // @vuese
    // Mutation based on if is a package or not
    mutation() {
      return !this.isPackage ? updateCartMutation : updateCartGroupMutation;
    },
    ...mapState({
      cart: state => state.cart.data
    })
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Update the cart. Will perform a graphql mutation
    // @arg sku id (Number), product quantity (Number)
    updateCart(updateId, productQuantity) {
      this.$emit('loading', true);

      const productPreUpdate = this.cart?.items?.find(
        item => item.skuId === updateId
      );
      const productQuantityPreUpdate = productPreUpdate?.quantity || 0;
      const updateItem = !this.isPackage
        ? {
            skuId: updateId,
            quantity: productQuantity
          }
        : {
            groupKey: updateId,
            quantity: productQuantity
          };
      const countUpdatedProductQuantity = () => {
        // remove totally item from cart
        if (productQuantity === productQuantityPreUpdate) {
          return productQuantityPreUpdate;
        }
        // decrease or increase items in cart
        return Math.abs(productQuantityPreUpdate - productQuantity);
      };

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

            this.$store.dispatch('cart/update', response);
            this.$emit('loading', false);

            const countCurrentProducts = () => {
              const product = response.items.find(
                item => item.skuId === updateId
              );

              if (!product) {
                // get item from store (item removed so whole quantity taken)
                return [productPreUpdate];
              }
              // get item from api response and update quantity as difference
              return response.items
                .filter(item => item.skuId === updateId)
                .map(item => ({
                  ...item,
                  quantity: countUpdatedProductQuantity()
                }));
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

            if (productQuantityPreUpdate > productQuantity) {
              const quantity = productQuantityPreUpdate - productQuantity;
              updateItem.quantity = quantity;

              this.$store.dispatch('events/push', {
                type: 'cart:remove',
                data: {
                  item: updateItem,
                  product: productPreUpdate
                }
              });
            } else if (productQuantity > productQuantityPreUpdate) {
              const quantity = productQuantity - productQuantityPreUpdate;
              updateItem.quantity = quantity;

              this.$store.dispatch('events/push', {
                type: 'cart:add',
                data: {
                  item: updateItem,
                  product: productPreUpdate
                }
              });
            }
          })
          .catch(error => {
            console.error('MixUpdateCart: ' + error);
          });
      this.enqueue(updateMutation);
    }
  }
};
