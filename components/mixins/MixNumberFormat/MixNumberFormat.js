// @group Mixins
// @vuese
// Mixin for formatting of numbers.<br><br>
// **Data:**<br>
// langCode: `'sv-SE'`<br>
// currency: `'SEK'`<br>
// currencyDisplay: `'symbol'`<br>
// minDecimals: `0`<br>
// maxDecimals: `0`
export default {
  name: 'MixNumberFormat',
  mixins: [],
  props: {},
  data: () => ({
    langCode: 'sv-SE',
    currency: 'SEK',
    currencyDisplay: 'symbol',
    minDecimals: 0,
    maxDecimals: 0
  }),
  computed: {},
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
