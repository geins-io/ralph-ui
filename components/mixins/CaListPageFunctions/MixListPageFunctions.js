// @group Mixins
// @vuese
export default {
  components: {},
  mixins: [],
  props: {},
  data: () => ({
    productList: [],
    totalCount: 0,
    skip: 0,
    take: 15,
    pageSize: 15,
    sort: 'LATEST',
    defaultSort: 'LATEST',
    listInfo: null,
    filters: {},
    selection: {
      categories: [],
      brands: []
    },
    filterParamQuery: {},
    queryPage: 1
  }),
  computed: {
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    },
    allProductsLoaded() {
      return (
        this.take >= this.totalCount ||
        this.currentPage * this.pageSize >= this.totalCount
      );
    },
    showing() {
      return this.skip + 1 + ' - ' + (this.skip + this.productList.length);
    },
    filterQuery() {
      const queryObj = {};
      if (this.selection.categories && this.selection.categories.length) {
        queryObj.categories = this.selection.categories.join();
      }
      if (this.selection.brands && this.selection.brands.length) {
        queryObj.brands = this.selection.brands.join();
      }
      if (
        this.selection.price &&
        this.selection.price.lowest &&
        this.selection.price.lowest !== this.filters.price.lowest
      ) {
        queryObj.priceLowest = this.selection.price.lowest;
      }
      if (
        this.selection.price &&
        this.selection.price.highest &&
        this.selection.price.highest !== this.filters.price.highest
      ) {
        queryObj.priceHighest = this.selection.price.highest;
      }
      if (this.sort !== this.defaultSort) {
        queryObj.sort = this.sort;
      }
      if (this.queryPage > 1) {
        queryObj.page = this.queryPage;
      }
      return queryObj;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    loadMore() {
      this.take += this.pageSize;
      this.queryPage = this.currentPage + 1;
      this.pushURLParams();
    },
    loadPrev() {
      this.take += this.pageSize;
      this.skip -= this.pageSize;
      this.queryPage = this.currentPage - 1;
      this.pushURLParams();
    },
    setInitPriceSelection(lowest, highest) {
      if (!this.selection.price) {
        this.$set(this.selection, 'price', {});
      }
      if (!this.selection.price.lowest || this.selection.price.lowest === 0) {
        this.setInitPriceLowest(lowest);
      }
      if (
        !this.selection.price.highest ||
        this.selection.price.highest === 1000000
      ) {
        this.setInitPriceHighest(highest);
      }
    },
    setInitPriceLowest(price) {
      if (!this.selection.price) {
        this.$set(this.selection, 'price', {});
      }
      if (!this.selection.price.highest) {
        this.$set(this.selection.price, 'highest', 1000000);
      }
      this.$set(this.selection.price, 'lowest', price);
    },
    setInitPriceHighest(price) {
      if (!this.selection.price) {
        this.$set(this.selection, 'price', {});
      }
      if (!this.selection.price.lowest) {
        this.$set(this.selection.price, 'lowest', 0);
      }
      this.$set(this.selection.price, 'highest', price);
    },
    sortChangeHandler(newVal) {
      this.sort = newVal;
      this.pushURLParams();
    },
    filterChangeHandler(newVal) {
      this.selection = newVal;
      this.pushURLParams();
    },
    pushURLParams() {
      this.$router.push({
        path: this.currentAlias,
        query: this.filterQuery
      });
    },
    readURLParams() {
      if (this.$route.query.categories) {
        this.selection.categories = this.$route.query.categories.split(',');
      }
      if (this.$route.query.brands) {
        this.selection.brands = this.$route.query.brands.split(',');
      }
      if (this.$route.query.priceLowest) {
        this.setInitPriceLowest(parseInt(this.$route.query.priceLowest));
      }
      if (this.$route.query.priceHighest) {
        this.setInitPriceHighest(parseInt(this.$route.query.priceHighest));
      }
      if (this.$route.query.sort) {
        this.sort = this.$route.query.sort;
      }
      if (this.$route.query.page) {
        this.queryPage = parseInt(this.$route.query.page);
        this.skip = (parseInt(this.$route.query.page) - 1) * this.pageSize;
      }
    }
  }
};
