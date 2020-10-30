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
    // @arg sku id (Number), product quantity (Number)
    addToCart(prodSkuId, prodQuantity) {
      const itemToAdd = {
        skuId: prodSkuId,
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
          this.$store.dispatch('snackbar/trigger', {
            message: this.$tc('CART_ITEM_ADDED', itemToAdd.quantity)
          });
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
