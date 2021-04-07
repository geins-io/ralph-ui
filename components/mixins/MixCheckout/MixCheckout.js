import { mapState } from 'vuex';
import createOrUpdateCheckoutMutation from 'checkout/create-or-update.graphql';
// @group Mixins
// @vuese
const addressPlaceholder = {
  firstName: '',
  lastName: '',
  careOf: '',
  addressLine1: '',
  zip: '',
  city: '',
  entryCode: '',
  mobile: ''
};
export default {
  name: 'MixCheckout',
  apollo: {},
  mixins: [],
  props: {},
  data: () => ({
    cartLoading: false,
    checkout: {
      billingAddress: null,
      shippingAddres: null,
      email: '',
      identityNumber: ''
    }
  }),
  computed: {
    ...mapState(['cart'])
  },
  watch: {
    async 'cart.data'(newVal, oldVal) {
      console.log('cart data changed');
      if (
        await this.$store.dispatch('cart/changed', { new: newVal, old: oldVal })
      ) {
        this.createOrUpdateCheckout();
        console.log('updating checkout because cart has new data');
      }
    }
  },
  created() {
    this.checkout.billingAddress = addressPlaceholder;
  },
  mounted() {
    this.createOrUpdateCheckout();
  },
  methods: {
    createOrUpdateCheckout() {
      console.log('createOrUpdateCheckout');
      this.$apollo
        .mutate({
          mutation: createOrUpdateCheckoutMutation,
          variables: {
            cartId: this.$store.getters['cart/id']
          }
        })
        .then(result => {
          const checkout = result.data.createOrUpdateCheckout;
          checkout.shippingAddress = addressPlaceholder;
          if (!checkout.billingAddress) {
            checkout.billingAddress = addressPlaceholder;
          }
          this.checkout = checkout;
          this.updateCart(checkout.cart);
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
    }
  }
};
