import { mapState } from 'vuex';
import createOrUpdateCheckoutMutation from 'checkout/create-or-update.graphql';
import placeOrderMutation from 'checkout/place-order.graphql';
// @group Mixins
// @vuese
// All functionality for the checkout
// **Data:**<br>
// cartLoading: `false`<br>
// checkoutLoading: `false`<br>
// checkout: `{}`<br>
// desiredDeliveryDate: `null`<br>
// message: `''`
// pickupPoint: `''`,
// externalShippingId: `''`,
// udcValid: `false`
export default {
  name: 'MixCheckout',
  apollo: {},
  mixins: [],
  props: {},
  data: () => ({
    cartLoading: false,
    checkoutLoading: false,
    shippingLoading: false,
    checkout: {},
    desiredDeliveryDate: null,
    message: '',
    pickupPoint: '',
    externalShippingId: '',
    udcValid: false
  }),
  computed: {
    // @vuese
    // A list of accepted consents
    // @type Array
    acceptedConsents() {
      return this.checkout.consents?.filter(i => i.checked).map(i => i.type);
    },
    // @vuese
    // The checkout input object prepared for the API
    // @type Object
    checkoutInput() {
      const obj = {};
      if (this.checkout.billingAddress) {
        obj.billingAddress = this.checkout.billingAddress;
        delete obj.billingAddress.__typename;
      }
      if (this.checkout.email) {
        obj.email = this.checkout.email;
      }
      if (this.checkout.identityNumber) {
        obj.identityNumber = this.checkout.identityNumber;
      }
      if (this.orderMessage) {
        obj.message = this.orderMessage;
      }
      if (this.acceptedConsents?.length) {
        obj.acceptedConsents = this.acceptedConsents;
      }
      if (
        this.checkout.shippingAddress &&
        this.checkout.shippingAddress.addressLine1 !== ''
      ) {
        obj.shippingAddress = this.checkout.shippingAddress;
        delete obj.shippingAddress.__typename;
      }
      if (this.desiredDeliveryDate) {
        obj.desiredDeliveryDate = this.desiredDeliveryDate;
      }
      if (this.pickupPoint) {
        obj.pickupPoint = this.pickupPoint;
      }
      if (this.externalShippingId) {
        obj.externalShippingId = this.externalShippingId;
      }
      return obj;
    },
    // @vuese
    // This is the message that gets sent to the api. Override this if more than just the user inputted message should go in there
    // @type String
    orderMessage() {
      return this.message;
    },
    // @vuese
    // The current billing zip
    // @type String
    currentZip() {
      return this.checkout?.billingAddress?.zip || '';
    },
    ...mapState(['cart'])
  },
  watch: {
    async 'cart.data'(newVal, oldVal) {
      if (
        await this.$store.dispatch('cart/itemsChanged', {
          new: newVal,
          old: oldVal
        })
      ) {
        this.shippingLoading = true;
        this.createOrUpdateCheckout();
      }
    }
  },
  mounted() {
    this.createOrUpdateCheckout();
    // Refetch checkout on window/tab focus to keep state between windows/tabs
    window.addEventListener('focus', this.createOrUpdateCheckout);
  },
  methods: {
    // @vuese
    // Handling the api call for creating an updating the checkout session
    createOrUpdateCheckout() {
      this.checkoutLoading = true;
      if (this.$refs.udc) {
        this.$refs.udc.disable();
      }
      const vars = {
        cartId: this.$store.getters['cart/id']
      };
      if (Object.keys(this.checkoutInput).length) {
        vars.checkout = this.checkoutInput;
      }
      this.$apollo
        .mutate({
          mutation: createOrUpdateCheckoutMutation,
          variables: vars
        })
        .then(result => {
          this.checkout = result.data.createOrUpdateCheckout;
          this.updateCart(this.checkout.cart);
          this.checkoutLoading = false;
          this.shippingLoading = false;
          this.cartLoading = false;
          this.$nextTick(() => {
            if (this.$refs.udc && this.$refs.udc.widget) {
              this.$refs.udc.enable();
            }
          });
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    // @vuese
    // Updating the cart if the cart is different from the existing cart
    // @arg cart (Object)
    async updateCart(cart) {
      if (
        await this.$store.dispatch('cart/changed', {
          new: cart,
          old: this.cart.data
        })
      ) {
        this.$store.dispatch('cart/update', cart);
      }
    },
    // @vuese
    // Updating the checkout data received from Carismar Checkout
    // @arg data (Object)
    updateCheckoutData(data) {
      this.checkout.billingAddress = data.billingAddress;
      this.checkout.email = data.email;
      if (this.$config.checkout.identityNumber) {
        this.checkout.identityNumber = data.identityNumber;
      }
      if (this.$config.checkout.message) {
        this.message = data.message;
      }
      this.checkout.shippingAddress = data.addShippingAddress
        ? data.shippingAddress
        : null;
    },
    // @vuese
    // Placing the order and redirecting to confirm page if completed
    placeOrder() {
      this.$apollo
        .mutate({
          mutation: placeOrderMutation,
          variables: {
            cartId: this.$store.getters['cart/id'],
            checkout: this.checkoutInput
          }
        })
        .then(result => {
          if (result.data.placeOrder.status === 'completed') {
            const confirmUrl =
              '/checkout/confirm?cid=' +
              this.$store.getters['cart/id'] +
              '&oid=' +
              result.data.placeOrder.orderId +
              '&email=' +
              this.checkout.email;
            this.$router.push(confirmUrl);
          } else {
            this.$refs.checkoutCarismar.showErrorFeedback();
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    initUDC(zip) {
      this.shippingLoading = true;
      if (this.checkout.billingAddress) {
        this.checkout.billingAddress.zip = zip;
      } else {
        this.checkout.billingAddress = {
          firstName: '',
          lastName: '',
          careOf: '',
          addressLine1: '',
          zip,
          city: '',
          entryCode: '',
          mobile: '',
          country: 'SE'
        };
      }
      this.createOrUpdateCheckout();
    },
    setUDCdata(data) {
      this.message = data.deliveryData;
      this.pickupPoint = data.pickupPoint;
      if (data.selectedOptionId !== this.externalShippingId) {
        this.externalShippingId = data.selectedOptionId;
        this.cartLoading = true;
        this.createOrUpdateCheckout();
      }
    }
  }
};
