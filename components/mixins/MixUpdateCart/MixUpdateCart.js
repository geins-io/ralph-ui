import updateCartMutation from 'cart/update.graphql';
import MixPromiseQueue from 'MixPromiseQueue';
// @group Mixins
// @vuese
// Function to update the current cart
export default {
  name: 'MixUpdateCart',
  mixins: [MixPromiseQueue],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Update the cart. Will perform a graphql mutation
    // @arg sku id (Number), product quantity (Number)
    updateCart(prodSkuId, prodQuantity) {
      this.$emit('loading', true);
      const updateItem = {
        skuId: prodSkuId,
        quantity: prodQuantity
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
          })
          .catch(error => {
            // pass the error response to the error component
            this.$nuxt.error({ statusCode: error.statusCode, message: error });
          });
      this.enqueue(updateMutation);
    }
  }
};
