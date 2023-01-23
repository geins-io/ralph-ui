// @group Mixins
// @vuese
// Mixin for formatting of numbers.<br><br>
// **Data:**<br>
// currencyDisplay: `'symbol'`<br>
// minDecimals: `0`<br>
// maxDecimals: `0`
export default {
  name: 'MixNumberFormat',
  mixins: [],
  props: {},
  data: () => ({
    currencyDisplay: 'symbol',
    minDecimals: 0,
    maxDecimals: 0
  }),
  computed: {
    // @vuese
    // Current langCode from $i18n
    // @type String
    langCode() {
      return this.$i18n?.localeProperties?.iso || 'sv-SE';
    },
    // @vuese
    // Current currency from marketId
    // @type String
    currency() {
      return this.$store.getters.getCurrency;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Format a currency
    // @arg Number
    formatCurrency(sum) {
      return new Intl.NumberFormat(this.langCode, {
        style: 'currency',
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        minimumFractionDigits: this.minDecimals,
        maximumFractionDigits: this.maxDecimals
      }).format(sum);
    },
    // @vuese
    // Format a number
    // @arg Number
    formatNumber(num) {
      return new Intl.NumberFormat(this.langCode).format(num);
    }
  }
};
