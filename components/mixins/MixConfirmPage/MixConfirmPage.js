import completeCartMutation from 'cart/complete.graphql';
import checkoutConfirmQuery from 'checkout/checkout-confirm.graphql';
import MixDatalayerConfirm from 'MixDatalayerConfirm';
import MixFetch from 'MixFetch';
// @group Mixins
// @vuese
// All functionality for the confirm page<br><br>
// **Data:**<br>
// checkoutConfirmData: `null`<br>
// loading: `true`<br>
export default {
  name: 'MixConfirmPage',
  mixins: [MixDatalayerConfirm, MixFetch],
  props: {},
  async fetch() {
    this.checkoutConfirmData = await this.fetchData(
      checkoutConfirmQuery,
      (result) => {
        return result?.data?.checkout || null;
      },
    );

    const completed = this.checkoutConfirmData?.completed;

    if (completed !== null && completed === false) {
      this.$router.push(this.$getPath('checkout'));
      return;
    }

    this.loading = false;
    this.processCartCompletion();
  },
  data: () => ({
    checkoutConfirmData: null,
    loading: true,
    fetchPolicy: 'no-cache',
    cartProcessed: false,
  }),
  computed: {
    // @vuese
    // The variables for the checkout confirm query
    // @type Object
    variables() {
      return {
        id: this.orderId,
        paymentType: this.type,
        checkoutMarket: this.$store.state.channel.checkoutMarket,
        cartId: this.cartId,
      };
    },
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
    // @vuese
    // The html snippet from the external payment provider
    // @type String
    confirmSnippet() {
      return this.checkoutConfirmData?.htmlSnippet || '';
    },
  },
  mounted() {
    if (this.orderCart) {
      this.processCartCompletion();
    }
  },
  methods: {
    // @vuese
    // Performs the complete cart mutation and resets the cart
    async completeCart() {
      this.sendDataLayerEvents(this.checkoutConfirmData);

      const variables = {
        id: this.cartId,
        checkoutMarket: this.$store.state.channel.checkoutMarket,
      };
      const callback = () => {
        this.$store.dispatch('cart/reset');
      };
      await this.mutateData(completeCartMutation, callback, variables);
    },
    // @vuese
    // Checks if the cart is completed and if not, calls the complete cart method
    processCartCompletion() {
      if (this.cartProcessed || process.server) {
        return;
      }
      if (!!this.orderCart && !this.orderCart.isCompleted) {
        this.completeCart();
      } else if (this.orderCart?.isCompleted && this.cartShouldReset) {
        this.$store.dispatch('cart/reset');
      }
      this.cartProcessed = true;
    },
  },
};
