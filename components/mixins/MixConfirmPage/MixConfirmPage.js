import confirmCartQuery from 'cart/confirm.graphql';
import completeCartMutation from 'cart/complete.graphql';
import MixDatalayerConfirm from 'MixDatalayerConfirm';
// @group Mixins
// @vuese
// All functionality for the confirm page<br><br>
// **Data:**<br>
// orderCart: `null`<br>
export default {
  name: 'MixConfirmPage',
  mixins: [MixDatalayerConfirm],
  apollo: {
    getCart: {
      query: confirmCartQuery,
      variables() {
        return {
          id: this.cartId
        };
      },
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      result(result) {
        if (result.data && result.data.getCart) {
          this.orderCart = result.data.getCart;
          if (!this.orderCart.isCompleted && !process.server) {
            this.completeCart();
          } else if (
            this.orderCart.isCompleted &&
            (this.cartId === this.$cookies.get('ralph-cart') ||
              !this.$cookies.get('ralph-cart'))
          ) {
            this.$store.dispatch('cart/reset');
          }
        }
      },
      skip() {
        return this.cartId === '' || this.orderCart !== null;
      },
      error(error) {
        // pass the error response to the error component
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    }
  },
  props: {},
  data: () => ({
    orderCart: null
  }),
  computed: {
    // @vuese
    // The cart id from the url parameter 'cartid'
    // @type String
    cartId() {
      return this.$route.query.cartid ?? '';
    },
    // @vuese
    // No cart id and no order cart
    // @type Booleen
    noCart() {
      return this.cartId === '' && this.orderCart === null;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Performs the complete cart mutation and resets the cart
    completeCart() {
      this.datalayerConfirm();
      this.$apollo
        .mutate({
          mutation: completeCartMutation,
          variables: {
            id: this.cartId
          },
          fetchPolicy: 'no-cache'
        })
        .then(() => {
          this.$store.dispatch('cart/reset');
          this.cartCompleted = true;
        })
        .catch(error => {
          // pass the error response to the error component
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    }
  }
};
