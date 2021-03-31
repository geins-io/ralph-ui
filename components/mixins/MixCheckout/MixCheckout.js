// @group Mixins
// @vuese
export default {
  name: 'MixCheckout',
  mixins: [],
  props: {},
  data: () => ({
    checkout: {
      paymentMode: 'Simple',
      shippingMode: 'Simple',
      selectedShipping: {
        shippingId: 1,
        shippingName: 'BudBee'
      },
      selectedPayment: {
        paymentId: 1,
        paymentName: 'Manuell faktura'
      },
      consents: [
        {
          type: 'newsletter',
          name: 'Ja tack, jag vill få nyhetsbrev med spännande erbjudanden',
          description: 'Checka för denna om du vill ha nyhetsbrev',
          checked: true,
          autoAccept: false
        },
        {
          type: 'terms',
          name: 'Jag godkänner köpvillkoren',
          description: 'Checka för denna om du vill ha nyhetsbrev',
          checked: false,
          autoAccept: false
        }
      ],
      email: '',
      identityNumber: '',
      message: '',
      billingAddress: {
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        careOf: '',
        city: '',
        company: '',
        country: '',
        entryCode: '',
        mobile: '',
        phone: '',
        state: '',
        zip: ''
      },
      shippingAddress: {
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        careOf: '',
        city: '',
        company: '',
        country: '',
        entryCode: '',
        mobile: '',
        phone: '',
        state: '',
        zip: ''
      }
    }
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
