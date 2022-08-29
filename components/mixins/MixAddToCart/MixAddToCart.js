import addToCartMutation from 'cart/add.graphql';

// @group Mixins
// @vuese
// A mixin for the add to cart function
export default {
  name: 'MixAddToCart',
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
    // @arg sku id (Number), product quantity (Number), product (Object)
    addToCart(prodSkuId, prodQuantity, product = null) {
      const itemToAdd = {
        skuId: prodSkuId,
        quantity: prodQuantity
      };
      this.$apollo
        .mutate({
          mutation: addToCartMutation,
          variables: {
            id: this.$store.getters['cart/id'],
            item: itemToAdd
          }
        })
        .then(result => {
          this.$store.dispatch('cart/update', result.data.addToCart);
          this.addToCartLoading = false;
          if (product) {
            this.$store.dispatch('cart/triggerAddedNotification', {
              item: itemToAdd,
              product
            });
          }
          setTimeout(() => {
            this.$store.dispatch('cart/removeAddedNotification');
          }, 30000);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
