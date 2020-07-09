// @group ComponentType
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
          Object.prototype.hasOwnProperty.call(value, 'isDiscounted') &&
          Object.prototype.hasOwnProperty.call(value, 'sellingPriceIncVat') &&
          Object.prototype.hasOwnProperty.call(value, 'sellingPriceExVat') &&
          Object.prototype.hasOwnProperty.call(value, 'regularPriceIncVat') &&
          Object.prototype.hasOwnProperty.call(value, 'regularPriceExVat')
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
        ? this.price.sellingPriceIncVat
        : this.price.sellingPriceExVat;
    },
    regularPrice() {
      return this.$store.state.VATincluded
        ? this.price.regularPriceIncVat
        : this.price.regularPriceExVat;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
