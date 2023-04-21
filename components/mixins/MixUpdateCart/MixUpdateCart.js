import updateCartMutation from 'cart/update.graphql';
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
    updateCart(prodSkuId, prodQuantity) {
      const productStateBeforeUpdate = this.cart?.items?.find(
        item => item.skuId === prodSkuId
      );
      const previousProductQuantity = productStateBeforeUpdate?.quantity || 0;

      this.$emit('loading', true);
      const updateItem = {
        skuId: prodSkuId,
        quantity: prodQuantity
      };
      const countUpdatedProductQuantity = () => {
        // remove totally item from cart
        if (prodQuantity === previousProductQuantity) {
          return previousProductQuantity;
        }
        // decrease or increase items in cart
        return Math.abs(previousProductQuantity - prodQuantity);
      };
      const updateMutation = () =>
        this.$apollo
          .mutate({
            mutation: updateCartMutation,
            variables: {
              id: this.$store.getters['cart/id'],
              item: updateItem
            }
          })
          .then(result => {
            this.$store.dispatch('cart/update', result.data.updateCartItem);
            this.$emit('loading', false);

            const countCurrentProducts = () => {
              const product = result.data.updateCartItem.items.find(
                item => item.skuId === prodSkuId
              );

              if (!product) {
                // get item from store (item removed so whole quantity taken)
                return [productStateBeforeUpdate];
              }
              // get item from api response and update quantity as difference
              return result.data.updateCartItem.items
                .filter(item => item.skuId === prodSkuId)
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
              previousQuantity: previousProductQuantity,
              currentQuantity: prodQuantity,
              products: countCurrentProducts()
            });

            if (previousProductQuantity > prodQuantity) {
              const quantity = previousProductQuantity - prodQuantity;
              updateItem.quantity = quantity;

              this.$store.dispatch('events/push', {
                type: 'cart:remove',
                data: {
                  item: updateItem,
                  product: productStateBeforeUpdate
                }
              });
            } else if (prodQuantity > previousProductQuantity) {
              const quantity = prodQuantity - previousProductQuantity;
              updateItem.quantity = quantity;

              this.$store.dispatch('events/push', {
                type: 'cart:add',
                data: {
                  item: updateItem,
                  product: productStateBeforeUpdate
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
