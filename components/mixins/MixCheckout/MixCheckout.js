import { mapState } from 'vuex';
import createOrUpdateCheckoutMutation from 'checkout/create-or-update.graphql';
// @group Mixins
// @vuese
export default {
  name: 'MixCheckout',
  apollo: {},
  mixins: [],
  props: {},
  data: () => ({
    cartLoading: false,
    checkout: {},
    desiredDeliveryDate: null,
    message: ''
  }),
  computed: {
    singleShippingOption() {
      return this.checkout.shippingMode === 'SIMPLE';
    },
    singlePaymentOption() {
      return this.checkout.paymentMode === 'SIMPLE';
    },
    acceptedConsents() {
      return this.checkout.consents?.filter(i => i.checked).map(i => i.type);
    },
    checkoutInput() {
      const obj = {};
      if (this.checkout.billingAddress) {
        obj.billingAddress = this.checkout.billingAddress;
      }
      if (this.checkout.email) {
        obj.email = this.checkout.email;
      }
      if (this.checkout.identityNumber) {
        obj.identityNumber = this.checkout.identityNumber;
      }
      if (this.checkout.message) {
        obj.message = this.checkout.message;
      }
      if (this.acceptedConsents?.length) {
        obj.acceptedConsents = this.acceptedConsents;
      }
      if (
        this.checkout.shippingAddress &&
        this.checkout.shippingAddress.addressLine1 !== ''
      ) {
        obj.shippingAddress = this.checkout.shippingAddress;
      }
      if (this.desiredDeliveryDate) {
        obj.desiredDeliveryDate = this.desiredDeliveryDate;
      }
      return obj;
    },
    ...mapState(['cart'])
  },
  watch: {
    async 'cart.data'(newVal, oldVal) {
      if (
        await this.$store.dispatch('cart/changed', { new: newVal, old: oldVal })
      ) {
        this.createOrUpdateCheckout();
      }
    }
  },
  mounted() {
    this.createOrUpdateCheckout();
  },
  methods: {
    createOrUpdateCheckout() {
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
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
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
    updateCheckoutData(data) {
      this.checkout.billingAddress = data.billingAddress;
      this.checkout.email = data.email;
      this.checkout.identityNumber = data.identityNumber;
      this.message = data.message;
      this.checkout.shippingAddress = data.addShippingAddress
        ? data.shippingAddress
        : null;
    }
  }
};
