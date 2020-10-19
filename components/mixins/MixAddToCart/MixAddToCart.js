import addToCartMutation from 'cart/add.graphql';

// @group Mixins
// @vuese
// A mixin for the add to cart function
export default {
  components: {},
  mixins: [],
  props: {},
  data: () => ({
    addToCartLoading: false
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Add a product to the cart on the server. Performs a graphql mutation
    // @arg item id (Number), product quantity (Number)
    addToCart(prodItemId, prodQuantity) {
      const itemToAdd = {
        itemId: prodItemId,
        quantity: prodQuantity
      };
      this.$apollo
        .mutate({
          mutation: addToCartMutation,
          variables: {
            apiKey: this.$config.apiKey.toString(),
            id: this.$store.getters['cart/id'],
            item: itemToAdd
          }
        })
        .then(result => {
          this.$store.commit('cart/update', result.data.addToCart);
          this.addToCartLoading = false;
          this.$store.dispatch('snackbar/trigger', this.$t('CART_ITEM_ADDED'));
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
