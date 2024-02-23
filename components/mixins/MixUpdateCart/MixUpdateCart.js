import updateCartMutation from 'cart/update.graphql';
import MixPromiseQueue from 'MixPromiseQueue';
import MixFetch from 'MixFetch';
import { mapState } from 'vuex';
// @group Mixins
// @vuese
// Function to update the current cart
export default {
  name: 'MixUpdateCart',
  mixins: [MixPromiseQueue, MixFetch],
  props: {},
  data: () => ({}),
  computed: {
    ...mapState({
      cart: (state) => state.cart.data,
    }),
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Update the cart. Will perform a graphql mutation
    // @arg sku id (Number), product quantity (Number)
    updateCart(prodSkuId, prodQuantity) {
      const productStateBeforeUpdate = this.cart?.items?.find(
        (item) => item.skuId === prodSkuId,
      );
      const previousProductQuantity = productStateBeforeUpdate?.quantity || 0;

      this.$emit('loading', true);
      const updateItem = {
        skuId: prodSkuId,
        quantity: prodQuantity,
      };
      const variables = {
        id: this.$store.getters['cart/id'],
        item: updateItem,
        allowExternalShippingFee:
          this.$store.state.currentRouteName?.includes('checkout'),
      };
      const callback = (result) => {
        this.$store.dispatch('cart/update', result.data.updateCartItem);
        this.$emit('loading', false);

        if (previousProductQuantity > prodQuantity) {
          const quantity = previousProductQuantity - prodQuantity;
          updateItem.quantity = quantity;

          this.$store.dispatch('events/push', {
            type: 'cart:remove',
            data: {
              item: updateItem,
              product: {
                campaign: productStateBeforeUpdate.campaign,
                ...productStateBeforeUpdate.product,
              },
            },
          });
        } else if (prodQuantity > previousProductQuantity) {
          const quantity = prodQuantity - previousProductQuantity;
          updateItem.quantity = quantity;

          this.$store.dispatch('events/push', {
            type: 'cart:add',
            data: {
              item: updateItem,
              product: {
                campaign: productStateBeforeUpdate.campaign,
                ...productStateBeforeUpdate.product,
              },
            },
          });
        }
      };

      const updateMutation = () =>
        this.mutateData(updateCartMutation, callback, variables);

      this.enqueue(updateMutation);
    },
  },
};
