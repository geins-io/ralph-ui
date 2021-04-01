import updateCartMutation from 'cart/update.graphql';
// @group Mixins
// @vuese
// Function to update the current cart
export default {
  name: 'MixUpdateCart',
  mixins: [],
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
      const updateItem = {
        skuId: prodSkuId,
        quantity: prodQuantity
      };
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
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
