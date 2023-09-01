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
  apollo: {
    checkout: {
      query: checkoutConfirmQuery,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      variables() {
        return {
          id: this.orderId,
          paymentType: this.type,
          checkoutMarket: this.$store.state.channel.checkoutMarket,
          cartId: this.cartId
        };
      },
      result(result) {
        if (!result.errors && result?.data?.checkout) {
          const completed = result.data.checkout.completed;

          if (completed !== null && completed === false) {
            this.$router.push(this.$getPath('checkout'));
            return;
          }
          this.checkoutConfirmData = result.data.checkout;
        }
      },
      skip() {
        return process.server || this.isDefault;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    }
  },
  props: {},
  data: () => ({
    orderCart: null,
    checkoutConfirmData: null,
    loading: true
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
    },
    // @vuese
    // Is the checkout of type 'DEFAULT'
    // @type Booleen
    isDefault() {
      return this.type === 'DEFAULT';
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
          return this.$route.query.oid || null;
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
      return 'DEFAULT';
    }
  },
  watch: {
    checkoutConfirmData(newVal, oldVal) {
      if (oldVal === null && newVal !== oldVal) {
        this.loading = false;
        this.confirmCartQuery();
      }
    }
  },
  mounted() {
    if (this.isDefault) {
      this.confirmCartQuery();
    }
  },
  methods: {
    // @vuese
    // Performs the complete cart mutation and resets the cart
    completeCart() {
      this.sendDataLayerEvents(this.checkoutConfirmData, this.isDefault);
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
    }
  }
};
