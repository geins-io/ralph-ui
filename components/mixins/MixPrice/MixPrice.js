// @group Mixins
// @vuese
// Displays product price
export default {
  name: 'MixPrice',
  mixins: [],
  props: {
    // Object that includes `isDiscounted`, `sellingPriceIncVatFormatted`, `sellingPriceExVatFormatted`, `regularPriceIncVatFormatted`, `regularPriceExVatFormatted`
    price: {
      type: Object,
      required: true,
      validator(value) {
        return (
          Object.prototype.hasOwnProperty.call(value, 'isDiscounted') &&
          Object.prototype.hasOwnProperty.call(
            value,
            'sellingPriceIncVatFormatted'
          ) &&
          Object.prototype.hasOwnProperty.call(
            value,
            'sellingPriceExVatFormatted'
          ) &&
          Object.prototype.hasOwnProperty.call(
            value,
            'regularPriceIncVatFormatted'
          ) &&
          Object.prototype.hasOwnProperty.call(
            value,
            'regularPriceExVatFormatted'
          )
        );
      }
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-price--sale': this.covertToBoolean(this.price.isDiscounted)
      };
    },
    sellingPrice() {
      return this.$store.getters.getSellingPrice(this.price);
    },
    regularPrice() {
      return this.$store.getters.getRegularPrice(this.price);
    },
    vatIncluded() {
      return this.$store.state.vatIncluded;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    covertToBoolean(value) {
      if (typeof value !== 'boolean') {
        return JSON.parse(value.toLowerCase());
      } else {
        return value;
      }
    }
  }
};
