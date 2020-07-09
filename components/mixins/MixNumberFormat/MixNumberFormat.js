// @group Mixins
// @vuese
export default {
  components: {},
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
    formatCurrency(sum) {
      return new Intl.NumberFormat(this.langCode, {
        style: 'currency',
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        minimumFractionDigits: this.minDecimals,
        maximumFractionDigits: this.maxDecimals
      }).format(sum);
    },
    formatNumber(num) {
      return new Intl.NumberFormat(this.langCode).format(num);
    }
  }
};
