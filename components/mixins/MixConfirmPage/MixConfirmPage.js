import completeCartMutation from 'cart/complete.graphql';
import checkoutConfirmQuery from 'checkout/checkout-confirm.graphql';
import MixDatalayerConfirm from 'MixDatalayerConfirm';
// @group Mixins
// @vuese
// All functionality for the confirm page<br><br>
// **Data:**<br>
// checkoutConfirmData: `null`<br>
// loading: `true`<br>
export default {
  name: 'MixConfirmPage',
  mixins: [MixDatalayerConfirm],
  props: {},
  data: () => ({
    checkoutConfirmData: null,
    loading: true,
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
      return this.cartId === '' && !this.orderCart;
    },
    // @vuese
    // The external order id
    // @type String
    orderId() {
      switch (this.type) {
        case 'KLARNA':
          return this.$route.query.kid;
        case 'SVEA':
          return this.$route.query.sid;
        case 'WALLEY':
          return this.$route.query.wid;
        case 'AVARDA':
          return this.$route.query.aid;
        default:
          return this.$route.query.oid || '';
      }
    },
    // @vuese
    // The type of checkout
    // @type String
    type() {
      if (this.$route.query.sid) {
        return 'SVEA';
      }
      if (this.$route.query.kid) {
        return 'KLARNA';
      }
      if (this.$route.query.wid) {
        return 'WALLEY';
      }
      if (this.$route.query.aid) {
        return 'AVARDA';
      }
      return 'STANDARD';
    },
    // @vuese
    // The cart stored with the order
    // @type Object
    orderCart() {
      return this.checkoutConfirmData?.cart;
    },
    // @vuese
    // Returns true if the cart should be resetted
    // @type Boolean
    cartShouldReset() {
      return (
        this.cartId === this.$cookies.get('ralph-cart') ||
        !this.$cookies.get('ralph-cart')
      );
    },
  },
  watch: {},
  mounted() {
    this.getCheckoutData();
  },
  methods: {
    getCheckoutData() {
      this.$apollo
        .query({
          query: checkoutConfirmQuery,
          variables: {
            id: this.orderId,
            paymentType: this.type,
            checkoutMarket: this.$store.state.channel.checkoutMarket,
            cartId: this.cartId,
          },
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        })
        .then((result) => {
          if (!result.errors && result?.data?.checkout) {
            const completed = result.data.checkout.completed;

            if (completed !== null && completed === false) {
              this.$router.push(this.$getPath('checkout'));
              return;
            }

            this.checkoutConfirmData = result.data.checkout;
            this.loading = false;
            this.processCartCompletion();
          }
        })
        .catch((error) => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    },
    // @vuese
    // Performs the complete cart mutation and resets the cart
    completeCart() {
      this.sendDataLayerEvents(this.checkoutConfirmData);
      this.$apollo
        .mutate({
          mutation: completeCartMutation,
          variables: {
            id: this.cartId,
            checkoutMarket: this.$store.state.channel.checkoutMarket,
          },
          fetchPolicy: 'no-cache',
        })
        .then(() => {
          this.$store.dispatch('cart/reset');
        })
        .catch((error) => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    },
    // @vuese
    // Checks if the cart is completed and if not, calls the complete cart method
    processCartCompletion() {
      if (!!this.orderCart && !this.orderCart.isCompleted) {
        this.completeCart();
      } else if (this.orderCart?.isCompleted && this.cartShouldReset) {
        this.$store.dispatch('cart/reset');
      }
    },
  },
};
