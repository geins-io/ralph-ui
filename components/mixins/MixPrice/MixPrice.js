// @group Micins
// @vuese
// Displays product price
export default {
  name: 'MixPrice',
  components: {},
  mixins: [],
  props: {
    // Object that includes isDiscounted, sellingPriceIncVat, sellingPriceExVat, regularPriceIncVat, regularPriceExVat
    price: {
      type: Object,
      required: true,
      validator(value) {
        return (
          Object.prototype.hasOwnProperty.call(value, '__typename') &&
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
        'ca-price--sale': this.price.isDiscounted
      };
    },
    sellingPrice() {
      return this.$store.state.VATincluded
        ? this.price.sellingPriceIncVatFormatted
        : this.price.sellingPriceExVatFormatted;
    },
    regularPrice() {
      return this.$store.state.VATincluded
        ? this.price.regularPriceIncVatFormatted
        : this.price.regularPriceExVatFormatted;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
