import MixMetaReplacement from 'MixMetaReplacement';
// @group Mixins
// @vuese
// All functionality for the list page<br><br>
// **Data:**<br>
// productList: `[]`<br>
// totalCount: `0`<br>
// skip: `0`<br>
// pageSize: `vm.$config.productListPageSize`<br>
// sort: `vm.$config.productListDefaultSort`<br>
// defaultSort: `vm.$config.productListDefaultSort`<br>
// listInfo: `null`<br>
// filters: `{}`<br>
// selection: `{ categories: [], brands: [] }`<br>
// filterParamQuery: `{}`<br>
// skipProductsQuery: `false`<br>
// currentPage: `1`<br>
// currentMinCount: `1`,<br>
// currentMaxCount: `vm.$config.productListPageSize`
// relocateTimeout: `null`
export default {
  name: 'MixListPage',
  mixins: [MixMetaReplacement],
  apollo: {
    products: {
      query() {
        return this.productsQuery;
      },
      variables() {
        return this.productsQueryVars;
      },
      deep: true,
      result(result) {
        this.productList = result.data.products.products;
        this.totalCount = result.data.products.count;
        this.filters = result.data.products.filters;
        if (result.data.products.filters.price) {
          this.setInitPriceSelection(
            result.data.products.filters.price.lowest,
            result.data.products.filters.price.highest
          );
        }
        if (this.$store.getters['list/relocateProduct']) {
          this.relocateProduct();
        }
        if (this.currentMaxCount > this.totalCount) {
          this.currentMaxCount = this.totalCount;
        }
        this.$store.dispatch('loading/end');
      },
      skip() {
        return this.skipProductsQuery;
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    listPageInfo: {
      query() {
        return this.infoQuery;
      },
      variables() {
        return {
          alias: this.currentAlias
        };
      },
      result(result) {
        this.listInfo = result.data.listPageInfo;
      },
      skip() {
        return this.isSearch;
      }
    }
  },
  props: {
    // @vuese
    // Type of list page
    type: {
      // 'category', 'brand', 'search', 'favorites'
      type: String,
      default: 'category' // 'brand', 'search', 'favorites'
    },
    // @vuese
    // Graphql for the listPageInfo query
    infoQuery: {
      type: Object,
      required: true
    },
    // @vuese
    // Graphql for the products query
    productsQuery: {
      type: Object,
      required: true
    },
    // @vuese
    // Current alias for the page
    currentAlias: {
      type: String,
      required: true
    }
  },
  head() {
    return {
      title: this.metaReplacement(this.listInfo?.meta?.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaReplacement(this.listInfo?.meta?.description)
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.metaReplacement(this.listInfo?.meta?.title)
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.metaReplacement(this.listInfo?.meta?.description)
        }
      ]
    };
  },
  data: vm => ({
    productList: [],
    totalCount: 0,
    skip: 0,
    pageSize: vm.$config.productListPageSize,
    sort: vm.$config.productListDefaultSort,
    defaultSort: vm.$config.productListDefaultSort,
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
    currentMaxCount: vm.$config.productListPageSize,
    relocateTimeout: null
  }),
  computed: {
    // @vuese
    // Are all products loaded?
    // @type Boolean
    allProductsLoaded() {
      return this.currentMaxCount >= this.totalCount;
    },
    // @vuese
    // Returns string of span of products showing right now, for example '10 - 20'
    // @type String
    showing() {
      return this.currentMinCount + ' - ' + this.currentMaxCount;
    },
    // @vuese
    // Returns the filter object used to query products based on filters
    // @type Object
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
    },
    // @vuese
    // The modifer class for the list page
    // @type String
    modifier() {
      return 'ca-list-page--' + this.type;
    },
    // @vuese
    // Is this list page of type category?
    // @type Boolean
    isCategory() {
      return this.type === 'category';
    },
    // @vuese
    // Is this list page of type brand?
    // @type Boolean
    isBrand() {
      return this.type === 'brand';
    },
    // @vuese
    // Is this list page of type search?
    // @type Boolean
    isSearch() {
      return this.type === 'search';
    },
    // @vuese
    // Is a filter selection made?
    // @type Boolean
    filterSelectionActive() {
      if (!this.selection.price) {
        return false;
      } else {
        return (
          this.selection.categories.length > 0 ||
          this.selection.brands.length > 0 ||
          this.selection.price.lowest !== this.filters.price.lowest ||
          this.selection.price.highest !== this.filters.price.highest
        );
      }
    },
    // @vuese
    // Returns the variable object with the query parameters for the product list
    // @type Object
    productsQueryVars() {
      const varsObj = {
        skip: this.skip,
        take: this.pageSize,
        sort: this.sort,
        filter: this.selection
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
      }
      if (this.isSearch) {
        varsObj.filter.searchText = this.currentAlias;
      }
      return varsObj;
    },
    // @vuese
    // Returns the variable object for loading more products
    // @type Object
    loadMoreQueryVars() {
      const varsObj = {
        skip: this.currentMaxCount,
        take: this.pageSize,
        sort: this.sort,
        filter: this.selection
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
      }
      return varsObj;
    },
    // @vuese
    // Returns the variable object for loading previous products
    // @type Object
    loadPrevQueryVars() {
      const varsObj = {
        skip: this.currentMinCount - 1 - this.pageSize,
        take: this.pageSize,
        sort: this.sort,
        filter: this.selection
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
      }

      return varsObj;
    },
    // @vuese
    // Returns an array of empty objects with same lengt as pageSize
    // @type Array
    skeletonProducts() {
      const prodArray = [];
      for (let i = 0; i < this.pageSize; i++) {
        prodArray.push({});
      }
      return prodArray;
    },
    // @vuese
    // Returns array of widget filters
    // @type Array
    widgetAreaFilters() {
      const filtersArray = [];
      const filterObj = {};
      if (this.isCategory && this.listInfo) {
        filterObj.key = 'CategoryId';
        filterObj.value = this.listInfo.id.toString();
        filtersArray.push(filterObj);
      } else if (this.isBrand && this.listInfo) {
        filterObj.key = 'BrandId';
        filterObj.value = this.listInfo.id.toString();
        filtersArray.push(filterObj);
      }
      return filtersArray;
    },
    breadcrumbsCurrent() {
      return {
        name: this.listInfo.name,
        alias: this.currentAlias,
        id: this.listInfo.id,
        type: this.type
      };
    },
    showControls() {
      return this.isSearch ? this.productList.length !== 0 : true;
    }
  },
  watch: {},
  created() {
    this.initProductList();
    if (this.isSearch) {
      const title = this.$t('SEARCH_RESULTS_PAGE_TITLE', {
        search: this.currentAlias
      });
      this.listInfo = {
        name: title,
        meta: {
          title,
          description: title
        }
      };
    }
  },
  mounted() {},
  methods: {
    // @vuese
    // Load next chunk of products
    loadMore() {
      const currentProductList = this.productList;
      this.productList = [...this.productList, ...this.skeletonProducts];
      this.currentPage = this.currentMaxCount / this.pageSize + 1;
      this.pushURLParams();
      this.$apollo.queries.products.fetchMore({
        variables: this.loadMoreQueryVars,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.products.products;
          this.currentMaxCount += newProducts.length;
          this.productList = [...currentProductList, ...newProducts];
        }
      });
    },
    // @vuese
    // Load previous chunk of products
    loadPrev() {
      const currentProductList = this.productList;
      const scrollHeight = this.getScrollHeight();
      this.productList = [...this.skeletonProducts, ...this.productList];
      this.currentPage = (this.currentMinCount - 1) / this.pageSize;
      this.pushURLParams();
      this.$nextTick(() => {
        const scrollAmount = this.getScrollHeight() - scrollHeight;
        window.scrollBy(0, scrollAmount);
      });
      this.$apollo.queries.products.fetchMore({
        variables: this.loadPrevQueryVars,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.products.products;
          this.currentMinCount -= newProducts.length;
          this.productList = [...newProducts, ...currentProductList];
        }
      });
    },
    // @vuese
    // Get the current scroll height of the page, used to keep scroll in the right position while loading previous products
    getScrollHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
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
      if (
        !this.$store.getters['list/backNavigated'] &&
        !this.$store.getters['list/relocateProduct']
      ) {
        this.resetCurrentPage();
      }

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
      if (this.currentPage > 1) {
        this.skip = (this.currentPage - 1) * this.pageSize;
        this.currentMinCount = this.skip + 1;
        this.currentMaxCount =
          this.skip + this.pageSize > this.totalCount
            ? this.totalCount
            : this.skip + this.pageSize;
      }
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
      clearTimeout(this.relocateTimeout);
      const product = document.querySelector(
        '[data-alias="' + this.$store.state.list.relocateAlias + '"]'
      );
      if (product !== null) {
        this.$nextTick(() => {
          window.scroll(0, product.offsetTop);
          product.focus();
          this.$store.dispatch('list/resetTriggerRelocate');
        });
      } else {
        this.relocateTimeout = setTimeout(() => {
          this.relocateProduct();
        }, 500);
      }
    }
  }
};
