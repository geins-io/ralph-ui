import MixMetaReplacement from 'MixMetaReplacement';
import productsQuery from 'productlist/list-products.graphql';
// import filtersQuery from 'productlist/products-filter.graphql';
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
// userSelection: `{ categories: [], brands: [] }`<br>
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
        return productsQuery;
      },
      variables() {
        return this.productsQueryVars;
      },
      deep: true,
      result(result) {
        console.log('products', result);
        if (result && result.data) {
          console.log('filtersSet', this.filtersSet);
          if (this.filtersSet) {
            this.updateFilters(result.data.products.filters);
          }
          this.productList = result.data.products.products;
          this.totalCount = result.data.products.count;
          if (this.$store.getters['list/relocateProduct']) {
            this.relocateProduct();
          }
          if (this.currentMaxCount > this.totalCount) {
            this.currentMaxCount = this.totalCount;
          }
          this.$store.dispatch('loading/end');
        }
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
    // Current alias for the page
    currentAlias: {
      type: String,
      required: true
    },
    baseFilters: {
      type: Object,
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
    productListIdle: [],
    totalCount: 0,
    skip: 0,
    pageSize: vm.$config.productListPageSize,
    defaultSort: vm.$config.productListDefaultSort,
    listInfo: null,
    filters: {},
    userSelection: null,
    filterParamQuery: {},
    skipProductsQuery: false,
    currentPage: 1,
    currentMinCount: 1,
    currentMaxCount: vm.$config.productListPageSize,
    relocateTimeout: null,
    URLparamsRead: false,
    filtersSet: false
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
    filterURLparams() {
      const queryObj = {};
      if (this.selection.categories && this.selection.categories.length) {
        const readableParams = this.selection.categories.map(
          i => i.label + '~' + i.id
        );
        queryObj.categories = readableParams.join();
      }
      if (this.selection.brands && this.selection.brands.length) {
        const readableParams = this.selection.brands.map(
          i => i.label + '~' + i.id
        );
        queryObj.brands = readableParams.join();
      }
      if (this.selection.skus && this.selection.skus.length) {
        const readableParams = this.selection.skus.map(
          i => i.label + '~' + i.id
        );
        queryObj.skus = readableParams.join();
      }
      if (Object.keys(this.selection.parameters).length > 0) {
        for (const group in this.selection.parameters) {
          const readableParams = this.selection.parameters[group].map(
            i => i.label + '~' + i.id
          );
          if (readableParams.length) {
            queryObj['p-' + group] = readableParams.join();
          }
        }
      }
      if (this.selection.sort !== this.defaultSort) {
        queryObj.sort = this.selection.sort;
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
    selection() {
      if (this.userSelection) {
        console.log('userSelection', this.userSelection);
        return this.userSelection;
      } else {
        const querySelection = JSON.parse(
          JSON.stringify(this.$store.state.list.querySelection)
        );
        if (!querySelection.sort) {
          querySelection.sort = this.defaultSort;
        }
        console.log('querySelection', querySelection);
        return querySelection;
      }
    },
    // @vuese
    // Is a filter selection made?
    // @type Boolean
    filterSelectionActive() {
      return this.productsQueryFilter.facets.length > 0;
    },
    productsQueryFilter() {
      const obj = {};

      const categories = this.selection.categories.map(i => i.id);
      const brands = this.selection.brands.map(i => i.id);
      const skus = this.selection.skus.map(i => i.id);
      const parameters = [];
      for (const group in this.selection.parameters) {
        const selection = this.selection.parameters[group].map(i => i.id);
        selection.forEach(i => parameters.push(i));
      }
      this.$set(
        obj,
        'facets',
        categories.concat(brands.concat(skus.concat(parameters)))
      );
      this.$set(obj, 'sort', this.selection.sort);

      if (this.isSearch) {
        this.$set(obj, 'searchText', this.currentAlias);
      }
      return obj;
    },
    // @vuese
    // Returns the variable object with the query parameters for the product list
    // @type Object
    productsQueryVars() {
      const varsObj = {
        skip: this.skip,
        take: this.pageSize,
        filter: this.productsQueryFilter
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
        this.$set(varsObj, 'brandAlias', null);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
        this.$set(varsObj, 'categoryAlias', null);
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
        filter: this.productsQueryFilter
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
        this.$set(varsObj, 'brandAlias', null);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
        this.$set(varsObj, 'categoryAlias', null);
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
        filter: this.productsQueryFilter
      };
      if (this.isCategory) {
        this.$set(varsObj, 'categoryAlias', this.currentAlias);
        this.$set(varsObj, 'brandAlias', null);
      }
      if (this.isBrand) {
        this.$set(varsObj, 'brandAlias', this.currentAlias);
        this.$set(varsObj, 'categoryAlias', null);
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
  watch: {
    userSelection(newVal, oldVal) {
      if (newVal && oldVal === null) {
        this.$store.commit('list/resetQuerySelection');
        console.log('resetted queryselection');
      }
    }
  },
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
    // Update the sort setting
    // @arg new value (String)
    sortChangeHandler(newVal) {
      this.userSelection.sort = newVal;
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
      console.log('filterChange');
      const selection = newVal;
      this.$set(selection, 'sort', this.selection.sort);
      this.userSelection = selection;
      this.pushURLParams();
    },
    // @vuese
    // Resetting the filter selections
    resetFilters() {
      this.userSelection.categories = [];
      this.userSelection.brands = [];
      this.userSelection.skus = [];
      this.userSelection.parameters = {};
      this.resetCurrentPage();
      this.pushURLParams();
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
        JSON.stringify(this.$route.query) !==
        JSON.stringify(this.filterURLparams)
      ) {
        this.$router
          .replace({
            query: this.filterURLparams
          })
          .catch(() => {});
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
      this.setPagingState();

      const interval = setInterval(() => {
        if (Object.keys(this.baseFilters).length > 0) {
          clearInterval(interval);
          this.setupFilters(this.baseFilters);
          this.skipProductsQuery = false;
        }
      }, 100);
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
    },
    setupUserSelection() {
      const selection = {};

      if (this.selection.categories) {
        this.$set(selection, 'categories', this.selection.categories);
      }

      if (this.selection.brands) {
        this.$set(selection, 'brands', this.selection.brands);
      }

      if (this.selection.skus) {
        this.$set(selection, 'skus', this.selection.skus);
      }

      if (this.selection.parameters) {
        this.$set(selection, 'parameters', this.selection.parameters);
      }

      if (this.selection.sort) {
        this.$set(selection, 'sort', this.selection.sort);
      } else {
        this.$set(selection, 'sort', this.defaultSort);
      }
      console.log('setupUserSelection', selection);
      this.userSelection = selection;
    },
    setupFilters(filters) {
      const sortedFilters = this.getSortedFilters(filters);

      this.$set(this.filters, 'categories', sortedFilters.categories.values);
      this.$set(this.filters, 'brands', sortedFilters.brands.values);
      this.$set(this.filters, 'skus', sortedFilters.skus.values);
      this.$set(this.filters, 'parameters', sortedFilters.parameters);
      this.filtersSet = true;
      if (Object.keys(this.$route.query).length > 0) {
        this.setupUserSelection();
      }
    },
    updateFilters(filters) {
      const sortedFilters = this.getSortedFilters(filters);

      this.filters.categories = this.setNewCount(
        this.filters.categories,
        sortedFilters.categories
      );
      this.filters.brands = this.setNewCount(
        this.filters.brands,
        sortedFilters.brands
      );
      this.filters.skus = this.setNewCount(
        this.filters.skus,
        sortedFilters.skus
      );
    },
    setNewCount(baseFilters, newFilters) {
      const array = baseFilters.map(i => {
        const existsInNewFilters = newFilters?.values.findIndex(
          ii => ii.facetId === i.facetId
        );
        if (existsInNewFilters === -1) {
          i.count = 0;
        } else {
          const newCount = newFilters?.values.find(
            ii => ii.facetId === i.facetId
          ).count;
          i.count = newCount;
        }
        return i;
      });
      return array;
    },
    getSortedFilters(filters) {
      const categories = filters.facets.find(i => i.type === 'Category');
      const brands = filters.facets.find(i => i.type === 'Brand');
      const skus = filters.facets.find(i => i.type === 'Sku');
      const parameters = filters.facets.filter(i => i.type === 'Parameter');
      return { categories, brands, skus, parameters };
    }
  }
};
