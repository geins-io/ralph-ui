// @group Mixins
// @vuese
// All functionality for the list page<br><br>
// **Data:**<br>
// productList: `[]`<br>
// totalCount: `0`<br>
// skip: `0`<br>
// take: `15`<br>
// pageSize: `15`<br>
// sort: `'LATEST'`<br>
// defaultSort: `'LATEST'`<br>
// listInfo: `null`<br>
// filters: `{}`<br>
// selection: `{ categories: [], brands: [] }`<br>
// filterParamQuery: `{}`<br>
// skipProductsQuery: `false`
// currentPage: `1`
export default {
  components: {},
  mixins: [],
  props: {},
  data: () => ({
    productList: [],
    totalCount: 0,
    skip: 0,
    take: 20,
    pageSize: 20,
    sort: 'LATEST',
    defaultSort: 'LATEST',
    listInfo: null,
    filters: {},
    selection: {
      categories: [],
      brands: []
    },
    filterParamQuery: {},
    skipProductsQuery: false,
    currentPage: 1,
    currentMinCount: 1,
    currentMaxCount: 20
  }),
  computed: {
    allProductsLoaded() {
      return this.currentMaxCount >= this.totalCount;
    },
    showing() {
      return this.currentMinCount + ' - ' + this.currentMaxCount;
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
      if (this.currentPage > 1) {
        queryObj.page = this.currentPage.toString();
      }
      return queryObj;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // @vuese
    // Load next chunk of products
    loadMore() {
      this.currentPage = this.currentMaxCount / this.pageSize + 1;
      this.pushURLParams();
      this.$apollo.queries.products.fetchMore({
        variables: this.loadMoreQueryVars,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.products.products;
          this.currentMaxCount += newProducts.length;
          this.productList = [...this.productList, ...newProducts];
        }
      });
    },
    // @vuese
    // Load previous chunk of products
    loadPrev() {
      this.currentPage = (this.currentMinCount - 1) / this.pageSize;
      this.pushURLParams();
      const firstProductAlias = document.querySelector(
        '.ca-product-card__image-link'
      ).dataset.alias;
      this.$apollo.queries.products.fetchMore({
        variables: this.loadPrevQueryVars,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.products.products;
          this.currentMinCount -= newProducts.length;
          this.productList = [...newProducts, ...this.productList];
          this.$nextTick(() => {
            const firstProduct = document.querySelector(
              '[data-alias="' + firstProductAlias + '"]'
            );
            window.scroll(0, firstProduct.offsetTop);
            firstProduct.focus();
          });
        }
      });
    },
    // @vuese
    // Set price filter selection
    // @arg lowest price (Number), highest price (Number)
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
    // @vuese
    // Set price filter selection for lowest price
    // @arg price (Number)
    setInitPriceLowest(price) {
      if (!this.selection.price) {
        this.$set(this.selection, 'price', {});
      }
      if (!this.selection.price.highest) {
        this.$set(this.selection.price, 'highest', 1000000);
      }
      this.$set(this.selection.price, 'lowest', price);
    },
    // @vuese
    // Set price filter selection for highest price
    // @arg price (Number)
    setInitPriceHighest(price) {
      if (!this.selection.price) {
        this.$set(this.selection, 'price', {});
      }
      if (!this.selection.price.lowest) {
        this.$set(this.selection.price, 'lowest', 0);
      }
      this.$set(this.selection.price, 'highest', price);
    },
    // @vuese
    // Update the sort setting
    // @arg new value (String)
    sortChangeHandler(newVal) {
      this.sort = newVal;
      this.pushURLParams();
    },
    // @vuese
    // Update the filter selections
    // @arg new value (Object)
    filterChangeHandler(newVal) {
      this.selection = newVal;
      this.pushURLParams();
    },
    // @vuese
    // Resetting the filter selections
    resetFilters() {
      this.selection.categories = [];
      this.selection.brands = [];
      this.selection.price.lowest = this.filters.price.lowest;
      this.selection.price.highest = this.filters.price.highest;
    },
    // @vuese
    // Reset paging state
    resetCurrentPage() {
      this.currentPage = 1;
      this.skip = 0;
      this.currentMinCount = 1;
      this.currentMaxCount = this.pageSize;
    },
    // @vuese
    // Set filter selection in URL
    pushURLParams() {
      if (
        JSON.stringify(this.$route.query) !== JSON.stringify(this.filterQuery)
      ) {
        this.$router
          .replace({
            query: this.filterQuery
          })
          .catch(() => {});
      }
    },
    // @vuese
    // Read filter selection from URL
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
    },
    // @vuese
    // Sets current page from URL or saved state
    setPagingState() {
      if (this.$store.getters['list/backNavigated']) {
        if (this.$store.getters['list/relocateProduct']) {
          this.currentPage = this.$store.state.list.relocatePage;
          this.pushURLParams();
        } else {
          this.$store.commit('list/setBackNavigated', false);
          if (this.$route.query.page) {
            this.currentPage = parseInt(this.$route.query.page);
          }
        }
      } else if (this.$route.query.page) {
        this.currentPage = parseInt(this.$route.query.page);
      }
      this.skip = (this.currentPage - 1) * this.pageSize;
      this.currentMinCount = this.skip + 1;
      this.currentMaxCount =
        this.skip + this.productList.length > this.totalCount
          ? this.totalCount
          : this.skip + this.productList.length;
    },
    // @vuese
    // Run to init the product list
    initProductList() {
      this.skipProductsQuery = true;
      this.readURLParams();
      this.setPagingState();
      this.skipProductsQuery = false;
    },
    // @vuese
    // Runned to relocate product on page after back navigating
    relocateProduct() {
      let callTimeout;
      const product = document.querySelector(
        '[data-alias="' + this.$store.state.list.relocateAlias + '"]'
      );
      if (product !== null) {
        clearTimeout(callTimeout);
        this.$nextTick(() => {
          window.scroll(0, product.offsetTop);
          product.focus();
          this.$store.dispatch('list/resetTriggerRelocate');
        });
      } else {
        callTimeout = setTimeout(() => {
          this.relocateProduct();
        }, 500);
      }
    }
  }
};
