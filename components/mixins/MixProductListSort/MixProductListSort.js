// @group Mixins
// @vuese
// A mixin with the default sort functions for a product list
// **Data:**<br>
// defaultSortOptions: `['RELEVANCE', 'LATEST', 'MOST_SOLD', 'PRICE', 'PRICE_DESC']`<br>
// sort: `null`
export default {
  name: 'MixProductListSort',
  mixins: [],
  props: {
    // The current sort of the product list
    currentSort: {
      type: String,
      required: true,
    },
    // Custom default sort options can be provided in the format `['SORT_OPTION', 'SORT_OPTION']`
    customDefaultSortOptions: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    defaultSortOptions: [
      'RELEVANCE',
      'LATEST',
      'MOST_SOLD',
      'PRICE',
      'PRICE_DESC',
    ],
    sort: null,
  }),
  computed: {
    // @vuese
    // The sort options for the product list, prepared for a select input
    // @type Array
    sortOptions() {
      return this.defaultSortOptions
        .filter((option) => {
          if (!this.$route.name.includes('search') && option === 'RELEVANCE') {
            return false;
          }
          return true;
        })
        .map((option) => {
          return {
            label: this.$t(`SORT_LABEL_${option}`),
            value: option,
          };
        });
    },
  },
  watch: {
    sort(newVal, oldVal) {
      if (oldVal !== null) {
        this.$emit('sortchange', newVal);
      }
    },
    currentSort() {
      this.sort = this.currentSort;
    },
  },
  mounted() {
    this.sort = this.currentSort;
    if (this.customDefaultSortOptions.length > 0) {
      this.defaultSortOptions = this.customDefaultSortOptions;
    }
  },
  methods: {},
};
