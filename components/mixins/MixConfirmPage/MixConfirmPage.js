import confirmCartQuery from 'cart/confirm.graphql';
import completeCartMutation from 'cart/complete.graphql';
import checkoutConfirmQuery from 'checkout/checkout-confirm.graphql';
import MixDatalayerConfirm from 'MixDatalayerConfirm';
// @group Mixins
// @vuese
// All functionality for the confirm page<br><br>
// **Data:**<br>
// orderCart: `null`<br>
export default {
  name: 'MixConfirmPage',
  mixins: [MixDatalayerConfirm],
  props: {},
  data: () => ({
    orderCart: null,
    checkoutConfirmData: null
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
  mounted() {
    this.confirmCartQuery();
  },
  methods: {
    // @vuese
    // Performs the complete cart mutation and resets the cart
    completeCart() {
      this.checkoutConfirm();
      this.$apollo
        .mutate({
          mutation: completeCartMutation,
          variables: {
            id: this.cartId,
            checkoutMarket: this.$store.state.channel.checkoutMarket
          },
          fetchPolicy: 'no-cache'
        })
        .then(() => {
          this.$store.dispatch('cart/reset');
          this.cartCompleted = true;
        })
        .catch(error => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    },
    // @vuese
    // Calls the summary once the component is mounted
    confirmCartQuery() {
      this.$apollo
        .query({
          query: confirmCartQuery,
          variables: {
            id: this.cartId,
            checkoutMarket: this.$store.state.channel.checkoutMarket,
            allowExternalShippingFee: true
          }
        })
        .then(result => {
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
        })
        .catch(error => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    },
    // @vuese
    checkoutConfirm() {
      this.$apollo
        .query({
          query: checkoutConfirmQuery,
          errorPolicy: 'all',
          fetchPolicy: 'no-cache',
          variables: {
            id: this.orderId,
            paymentType: this.type,
            checkoutMarket: this.$store.state.channel.checkoutMarket
          }
        })
        .then(result => {
          if (!result.errors && result?.data?.checkout) {
            this.checkoutConfirmData = result.data.checkout;
            this.sendDataLayerEvents(this.checkoutConfirmData);
          }
        })
        .catch(error => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    }
  }
};
