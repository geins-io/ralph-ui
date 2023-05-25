import MixMetaReplacement from 'MixMetaReplacement';
import MixListPagination from 'MixListPagination';
import MixApolloRefetch from 'MixApolloRefetch';
import sampleProductsQuery from 'productlist/list-products.graphql';
import productsQuery from 'productlist/no-filters-products.graphql';
import nostoRecommendationsQuery from 'productlist/nosto-recommendations.graphql';
import filtersQuery from 'productlist/products-filter.graphql';
import widgetAreaQuery from 'global/widget-area.graphql';
import { mapState, mapGetters } from 'vuex';
import eventbus from '@ralph/ralph-ui/plugins/eventbus.js';
import combineQuery from 'graphql-combine-query';
// @group Mixins
// @vuese
// All functionality for the list page<br><br>
// **Data:**<br>
// isInitialRequest: `true`<br>
// baseFilters: `{}`<br>
// userSkip: `0`<br>
// listInfo: `null`<br>
// filters: `{}`<br>
// userSelection: `null`<br>
// filterParamQuery: `{}`<br>
// skipProductsQuery: `false`<br>
// relocateTimeout: `null`<br>
// URLparamsRead: `false`<br>
// filtersSet: `false`<br>
// userHasPaged: `false`<br>
// productsFetched: `false`<br>
export default {
  name: 'MixListPage',
  mixins: [MixMetaReplacement, MixListPagination, MixApolloRefetch],
  apollo: {
    listPageInfo: {
      query() {
        return this.infoQuery;
      },
      variables() {
        return this.infoQueryVars;
      },
      result(result) {
        if (result && result.data) {
          this.listInfo = result.data.listPageInfo;
        }
      },
      skip() {
        return this.isSearch || this.isAll || this.customListInfo;
      }
    },
    widgetArea_0: {
      query() {
        return this.generateReqValues().document;
      },
      variables() {
        return this.generateReqValues().variables;
      },
      deep: true,
      errorPolicy: 'all',
      result(result) {
        if (result && result.data) {
          const { products, ...widgetAreaInfo } = result.data;

          if (!process.server && !this.isSearch & !this.isAll) {
            this.switchToCanonicalOr404();
          }

          if (this.widgetAreaVars) {
            this.widgetData = widgetAreaInfo;
          }

          if (!this.isNostoRequest) {
            this.setupPagination(products);
            this.$store.dispatch('loading/end');
          }
          this.productsFetched = true;
          this.isInitialRequest = false;
        }
      },
      skip() {
        return !this.isInitialRequest;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    },
    products: {
      query() {
        return sampleProductsQuery;
      },
      variables() {
        return this.productsQueryVars;
      },
      deep: true,
      result(result) {
        if (result && result.data) {
          if (result.data.products?.filters.facets.length > 0) {
            this.baseFilters = result.data.products.filters;
          }
          if (this.filtersSet) {
            this.updateFilters(result.data.products.filters);
          }
          this.setupPagination(result.data.products);
          this.productsFetched = true;
          this.$store.dispatch('loading/end');
        }
      },
      skip() {
        return (
          this.isInitialRequest ||
          this.skipProductsQuery ||
          this.isNostoRequest ||
          !process.client
        );
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    },
    nostoProducts: {
      client: 'nosto',
      query() {
        return nostoRecommendationsQuery;
      },
      variables() {
        return this.nostoQueryVars;
      },
      fetchPolicy: 'no-cache',
      skip() {
        return !this.isNostoRequest || !process.client;
      },
      deep: true,
      result(result) {
        const paginationData = this.formatNostoData(result.data);

        this.setupPagination(paginationData);
        this.productsFetched = true;
        this.$store.dispatch('loading/end');
      },
      update: data => data.session?.recos?.category?.primary
    }
  },
  props: {
    // @vuese
    // Type of list page
    type: {
      // 'list', 'category', 'brand', 'search', 'favorites', 'all'
      type: String,
      default: 'list',
      validator: value => {
        return [
          'list',
          'category',
          'brand',
          'search',
          'favorites',
          'all'
        ].includes(value);
      }
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
      default: ''
    },
    // @vuese
    // Current url path for the page
    currentPath: {
      type: String,
      default: ''
    },
    // @vuese
    // Base filters for this page
    filtersVars: {
      type: Object,
      default: () => ({})
    },
    // @vuese
    // Automatically applied parameters, added through routing. Can be used for section style routing. See Ekotextil for implementation example.
    implicitFacets: {
      type: Array,
      default: () => []
    },
    // @vuese
    // Exclude facets by facet ids
    excludeFacets: {
      type: Array,
      default: () => []
    },
    // @vuese
    // Use custom list info instead of fetching it from the server (e.g. { name: '', primaryDescription: '', meta: { title: '', description: ''}};)
    customListInfo: {
      type: Object,
      default: null
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
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            this.listInfo?.primaryImage ||
            this.$config.baseUrl + '/meta-image-fallback.jpg'
        }
      ]
    };
  },
  data: vm => ({
    isInitialRequest: true,
    baseFilters: {},
    userSkip: 0,
    listInfo: null,
    widgetData: {},
    filters: {},
    userSelection: null,
    filterParamQuery: {},
    skipProductsQuery: false,
    relocateTimeout: null,
    URLparamsRead: false,
    filtersSet: false,
    userHasPaged: false,
    productsFetched: false,
    interval: null
  }),
  computed: {
    // @vuesed
    // Determine is CaListTop are visible on page
    // @type Boolean
    hideListInfo() {
      return this.listInfo?.hideDescription && this.listInfo?.hideTitle;
    },
    // @vuesed
    // Status of loading filters state
    // @type Boolean
    filtersLoaded() {
      return Object.keys(this.baseFilters).length > 0;
    },
    // @vuese
    // Condition to skip nosto request
    // @type Boolean
    isNostoRequest() {
      return (
        process.client &&
        this.selection.sort === 'BEST_MATCH' &&
        this.$store.getters['nosto/isNostoActive'] &&
        this.$config.nostoAccountAppsKey
      );
    },
    // @vuese
    // Returns the current category alias
    // @type String
    categoryAlias() {
      const aliasArr = this.$route.path.split('/').slice(2);
      aliasArr.unshift('');
      return aliasArr.join('/');
    },
    // @vuese
    // Current number of products to skip when querying
    // @type Number
    skip() {
      if (this.$store.getters['list/relocateProduct']) {
        return (this.list.relocatePage - 1) * this.pageSize;
      } else if (this.$route.query.page) {
        if (this.userHasPaged) {
          return this.userSkip;
        } else {
          return (parseInt(this.$route.query.page) - 1) * this.pageSize;
        }
      } else {
        return this.userSkip;
      }
    },
    // @vuese
    // Returns the filter object used to query products based on filters
    // @type Object
    filterURLparams() {
      const queryObj = {};
      if (this.selection.categories && this.selection.categories.length) {
        queryObj.categories = this.getReadableParams(this.selection.categories);
      }
      if (this.selection.brands && this.selection.brands.length) {
        queryObj.brands = this.getReadableParams(this.selection.brands);
      }
      if (this.selection.skus && this.selection.skus.length) {
        queryObj.skus = this.getReadableParams(this.selection.skus);
      }
      if (this.selection.price && this.selection.price.length) {
        queryObj.price = this.getReadableParams(this.selection.price);
      }
      if (this.selection.discount && this.selection.discount.length) {
        queryObj.discount = this.getReadableParams(this.selection.discount);
      }
      if (Object.keys(this.selection.parameters).length > 0) {
        for (const group in this.selection.parameters) {
          if (this.selection.parameters[group].length) {
            queryObj['p-' + group] = this.getReadableParams(
              this.selection.parameters[group]
            );
          }
        }
      }

      if (this.selection.sort !== this.defaultSort) {
        if (this.selection.sort === 'RELEVANCE' && !this.isSearch) {
          return;
        }

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
    // Is this list page of type list?
    // @type Boolean
    isList() {
      return this.type === 'list';
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
    // Is this list page of type discountCampaign?
    // @type Boolean
    isCampaign() {
      return this.type === 'discountCampaign';
    },
    // @vuese
    // Is this list page of type search?
    // @type Boolean
    isSearch() {
      return this.type === 'search';
    },
    // @vuese
    // Is this list page of type all?
    // @type Boolean
    isAll() {
      return this.type === 'all';
    },
    // @vuese
    // Current selection
    // @type Object
    selection() {
      if (this.userSelection) {
        return this.userSelection;
      } else {
        const querySelection = JSON.parse(
          JSON.stringify(this.list.querySelection)
        );
        if (!querySelection.sort) {
          querySelection.sort = this.$route.query.sort
            ? this.$route.query.sort
            : this.defaultSort;
        }
        return querySelection;
      }
    },
    // @vuese
    // Returns the filter object for the productsQueryVars
    // @type Object
    productsQueryFilter() {
      const obj = {};

      const categories = this.selection.categories.map(i => i.id);
      const brands = this.selection.brands.map(i => i.id);
      const skus = this.selection.skus.map(i => i.id);
      const price = this.selection.price.map(i => i.id);
      const discount = this.selection.discount.map(i => i.id);
      const parameters = [];
      for (const group in this.selection.parameters) {
        const selection = this.selection.parameters[group].map(i => i.id);
        selection.forEach(i => parameters.push(i));
      }
      const facets = categories.concat(
        brands.concat(skus.concat(price.concat(discount.concat(parameters))))
      );

      this.$set(obj, 'facets', facets.concat(this.implicitFacets));

      if (this.excludeFacets.length) {
        this.$set(obj, 'excludeFacets', this.excludeFacets);
      }

      this.$set(
        obj,
        'sort',
        this.selection.sort === 'BEST_MATCH' ? 'LATEST' : this.selection.sort
      );

      this.$set(obj, 'filterMode', facets.length ? 'BY_GROUP' : 'CURRENT');

      if (this.isSearch) {
        this.$set(obj, 'searchText', this.currentAlias);
      }

      return obj;
    },
    // @vuese
    // Number of total filters active
    // @type Number
    totalFiltersActive() {
      return (
        this.productsQueryFilter.facets.length - this.implicitFacets.length
      );
    },
    // @vuese
    // Is a filter selection made?
    // @type Boolean
    filterSelectionActive() {
      return this.totalFiltersActive > 0;
    },
    // @vuese
    // Returns the variable object with the query parameters for the nosto product list
    // @type Object
    nostoQueryVars() {
      return this.generateNostoVars(this.skip / this.pageSize);
    },
    loadMoreNostoVars() {
      return this.generateNostoVars(this.currentPage - 1);
    },
    loadPrevNostoVars() {
      return this.generateNostoVars(this.currentPage - 2);
    },
    // @vuese
    // Returns the variable object with the query parameters for the product list
    // @type Object
    productsQueryVars() {
      const varsObj = {
        ...this.filtersVars,
        skip: this.skip,
        take: this.pageSize,
        filter: this.productsQueryFilter
      };
      if (this.isList) {
        this.$set(varsObj, 'url', this.currentPath);
      } else if (!this.isAll && !this.isSearch) {
        this.$set(varsObj, `${this.type}Alias`, this.currentAlias);
      }
      return varsObj;
    },
    // @vuese
    // Returns the variable object with the query parameters for the product list information
    // @type Object
    infoQueryVars() {
      if (this.isList) {
        return {
          listPageUrl: this.currentPath
        };
      }
      if (!(this.isSearch || this.isAll)) {
        return {
          alias: this.currentAlias
        };
      }
      return {};
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
      if (this.isList) {
        this.$set(varsObj, 'url', this.currentPath);
      } else if (!this.isAll && !this.isSearch) {
        this.$set(varsObj, `${this.type}Alias`, this.currentAlias);
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
      if (this.isList) {
        this.$set(varsObj, 'url', this.currentPath);
      } else if (!this.isAll && !this.isSearch) {
        this.$set(varsObj, `${this.type}Alias`, this.currentAlias);
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
      if (this.isList) {
        return [];
      }
      const filtersArray = [];
      const filterObj = {
        value: this.currentAlias
      };
      if (this.isCategory) {
        filterObj.key = 'Category';
      } else if (this.isBrand) {
        filterObj.key = 'Brand';
      } else if (this.isCampaign) {
        filterObj.key = 'Campaign';
      }
      filtersArray.push(filterObj);
      return filtersArray;
    },
    // @vuese
    // Current bredcrumb info
    // @type Object
    breadcrumbsCurrent() {
      const currentAlias = this.isList
        ? this.currentPath.split('/').pop()
        : this.currentAlias;
      return this.listInfo
        ? {
            name: this.listInfo.name,
            alias: currentAlias,
            canonical: this.listInfo.canonicalUrl,
            id: this.listInfo.id,
            type: this.type
          }
        : {};
    },
    // @vuese
    // Show filters and other controls
    // @type Boolean
    showControls() {
      return this.isSearch ? this.productList.length !== 0 : true;
    },
    // @vuese
    // Default sort option, will return "RELEVANCE" if on search page, otherwise will return the `productListDefaultSort` from $config
    // @type String
    defaultSort() {
      if (this.customDefaultSort) {
        return this.customDefaultSort;
      }
      return this.isSearch ? 'RELEVANCE' : this.$config.productListDefaultSort;
    },
    ...mapState(['list']),
    ...mapGetters({
      customDefaultSort: 'list/customDefaultSort'
    })
  },
  watch: {
    userSelection(newVal, oldVal) {
      if (newVal && oldVal === null) {
        this.$store.commit('list/resetQuerySelection');
      }
    }
  },
  mounted() {
    this.initProductList();
    eventbus.$on('route-change', routes => {
      this.handleFilteredRoutesRouting(routes);
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    eventbus.$off('route-change');
  },
  methods: {
    // @vuese
    // Load next chunk of products
    loadMore() {
      this.userHasPaged = true;
      const currentProductList = this.productList;
      this.productList = [...this.productList, ...this.skeletonProductsNext];
      this.currentPage = this.currentMaxCount / this.pageSize + 1;

      if (this.isNostoRequest) {
        this.$apollo.queries.nostoProducts.fetchMore({
          variables: this.loadMoreNostoVars,
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { products: newProducts } = this.formatNostoData(
              fetchMoreResult
            );
            this.currentMaxCount += newProducts.length;
            this.productList = [...currentProductList, ...newProducts];
            this.pushURLParams();
          }
        });
      } else {
        this.$apollo.queries.products.fetchMore({
          variables: this.loadMoreQueryVars,
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newProducts = fetchMoreResult.products.products;
            this.currentMaxCount += newProducts.length;
            this.productList = [...currentProductList, ...newProducts];
            this.pushURLParams();
          }
        });
      }
    },
    // @vuese
    // Load previous chunk of products
    loadPrev() {
      this.userHasPaged = true;
      const currentProductList = this.productList;
      const scrollHeight = this.getScrollHeight();
      this.productList = [...this.skeletonProducts, ...this.productList];
      this.currentPage = (this.currentMinCount - 1) / this.pageSize;

      this.$nextTick(() => {
        const scrollAmount = this.getScrollHeight() - scrollHeight;
        window.scrollBy(0, scrollAmount);
      });

      if (this.isNostoRequest) {
        this.$apollo.queries.nostoProducts.fetchMore({
          variables: this.loadPrevNostoVars,
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const { products: newProducts } = this.formatNostoData(
              fetchMoreResult
            );
            this.currentMinCount -= newProducts.length;
            this.productList = [...newProducts, ...currentProductList];
            this.pushURLParams();
          }
        });
      } else {
        this.$apollo.queries.products.fetchMore({
          variables: this.loadPrevQueryVars,
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newProducts = fetchMoreResult.products.products;
            this.currentMinCount -= newProducts.length;
            this.productList = [...newProducts, ...currentProductList];
            this.pushURLParams();
          }
        });
      }
    },
    formatNostoData(data) {
      const {
        totalPrimaryCount: count,
        primary: products,
        resultId
      } = data?.session?.recos?.category;

      const createObjectNode = (indexKey, keys, acc, value) => {
        acc[keys[indexKey]] = acc[keys[indexKey]]
          ? { ...acc[keys[indexKey]] }
          : {};

        if (indexKey === keys.length - 1) {
          acc[keys[indexKey]] = value;
          return;
        }

        createObjectNode(indexKey + 1, keys, acc[keys[indexKey]], value);
      };

      const mappedAttributesProducts = products.map(product => ({
        ...product,
        ...product.attributes.reduce((acc, { key, value }) => {
          const keys = key.split('_');
          if (keys.length > 1) {
            createObjectNode(0, keys, acc, value);
            return acc;
          }
          return { ...acc, [keys[0]]: value };
        }, {})
      }));

      const formattedProduct = mappedAttributesProducts.map(product => ({
        ...product,
        nostoResultId: resultId,
        images: product.images.split(','),
        skus: [
          {
            skuId: product?.primarySku?.id,
            productId: product.productId
          }
        ],
        totalStock: {
          ...product.totalStock,
          totalStock: product.totalStock.sellable
        },
        canonicalUrl: `/${product.canonicalUrl
          .split('/')
          .slice(3)
          .join('/')}`,
        alias: product.canonicalUrl
          .split('/')
          .slice(-1)
          .join(''),
        discountCampaigns: product.discountCampaigns
          ? [product.discountCampaigns.split(',')]
          : []
      }));

      return { count, products: formattedProduct };
    },
    generateNostoVars(skipPages) {
      return {
        ...this.filtersVars,
        filters: {
          customFields: [
            { attribute: 'Facets', values: this.productsQueryFilter.facets }
          ]
        },
        excludeFilters: {
          availability: 'InStock'
        },
        customerId:
          this.$store.getters['nosto/getSessionToken'] ||
          this.$cookies.get('2c.cId'),
        by: 'BY_CID',
        preview: false,
        category: this.categoryAlias,
        limit: this.pageSize,
        skipPages
      };
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
      if (this.userSelection) {
        this.userSelection.sort = newVal;
      } else {
        const selection = this.selection;
        this.$set(selection, 'sort', newVal);
        this.userSelection = selection;
      }
      if (
        this.userHasPaged &&
        !this.$store.getters['list/relocateProduct'] &&
        !this.$store.getters['list/backNavigated']
      ) {
        this.resetCurrentPage();
      }
      this.pushURLParams();
    },
    // @vuese
    // Update the filter selections
    // @arg new value (Object)
    filterChangeHandler(selectionData) {
      if (
        !this.$store.getters['list/backNavigated'] &&
        !this.$store.getters['list/relocateProduct']
      ) {
        this.resetCurrentPage();
      }
      const selection = selectionData;
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
      this.userSelection.price = [];
      this.userSelection.discount = [];
      this.userSelection.parameters = {};
      this.resetCurrentPage();
      this.pushURLParams();
    },
    // @vuese
    // Reset paging state
    resetCurrentPage() {
      this.currentPage = 1;
      this.userSkip = 0;
      this.currentMinCount = 1;
      this.currentMaxCount = this.pageSize;
    },
    // @vuese
    // Set filter selection in URL
    pushURLParams() {
      if (
        this.filterURLparams &&
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
      this.userSkip = this.skip;
      this.userHasPaged = true;
      if (
        this.$store.getters['list/relocateProduct'] ||
        this.$route.query.page
      ) {
        this.currentPage = this.$store.getters['list/relocateProduct']
          ? this.list.relocatePage
          : parseInt(this.$route.query.page);
      }
      this.pushURLParams();
      this.skipProductsQuery = false;
      this.$store.commit('list/setSkipProductsQuery', false);
      if (this.$store.getters['list/relocateProduct']) {
        this.relocateProduct();
      }
      this.$store.commit('list/setBackNavigated', false);
      this.$store.commit('list/setRelocatePage', 1);
      if (this.currentPage > 1) {
        this.currentMinCount = this.skip + 1;
        const count = this.skip + this.pageSize;
        this.currentMaxCount =
          count >= this.totalCount ? this.totalCount : count;
      }
    },
    // @vuese
    // Run to init the product list
    initProductList() {
      if (this.customListInfo) {
        this.listInfo = this.customListInfo;
      } else if (this.isSearch || this.isAll) {
        const title = this.isSearch
          ? this.$t('SEARCH_RESULTS_PAGE_TITLE', {
              search: this.currentAlias
            })
          : this.$t('ALL_PAGE_TITLE');
        this.listInfo = {
          name: title,
          meta: {
            title,
            description: title
          }
        };
      }

      this.interval = setInterval(() => {
        if (this.baseFilters && Object.keys(this.baseFilters).length > 0) {
          clearInterval(this.interval);
          if (this.baseFilters.facets.length) {
            this.setupFilters(this.baseFilters);
          }
        }
      }, 100);
    },
    generateReqValues() {
      let finishQuery = {
        document: productsQuery,
        variables: this.productsQueryVars
      };

      if (this.widgetAreaVars) {
        finishQuery = combineQuery('productsAndWidgetArea')
          .add(finishQuery.document, finishQuery.variables)
          .addN(
            widgetAreaQuery,
            this.widgetAreaVars.map(item => ({
              ...item,
              filters: this.widgetAreaFilters,
              channelId: this.$store.state.channel.id,
              url: this.currentPath,
              languageId: this.$i18n.localeProperties.iso,
              marketId: this.$store.state.channel.currentMarket
            }))
          );
      }

      return finishQuery;
    },
    // @vuese
    // Runned to relocate product on page after back navigating
    relocateProduct() {
      clearTimeout(this.relocateTimeout);
      const product = document.querySelector(
        '[data-alias="' + this.list.relocateAlias + '"]'
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
    // @vuese
    // Setting up the current user selection from store
    async setupUserSelection(sort = this.defaultSort) {
      const selection = {};
      await this.$store.dispatch('list/saveQuerySelection', {
        query: this.$route.query,
        setPage: false
      });
      if (this.selection.categories) {
        this.$set(selection, 'categories', this.selection.categories);
      }

      if (this.selection.brands) {
        this.$set(selection, 'brands', this.selection.brands);
      }

      if (this.selection.skus) {
        this.$set(selection, 'skus', this.selection.skus);
      }

      if (this.selection.price) {
        this.$set(selection, 'price', this.selection.price);
      }

      if (this.selection.discount) {
        this.$set(selection, 'discount', this.selection.discount);
      }

      if (this.selection.parameters) {
        this.$set(selection, 'parameters', this.selection.parameters);
      }

      if (this.selection.sort) {
        this.$set(selection, 'sort', this.selection.sort);
      } else {
        this.$set(selection, 'sort', sort);
      }
      this.userSelection = selection;
      this.$nextTick(() => {
        this.setPagingState();
      });
    },
    // @vuese
    // Setting up all filters
    // @arg filters (Object)
    async setupFilters(filters) {
      let sortedFilters = this.getSortedFilters(filters);
      if (Object.keys(this.$route.query).length) {
        try {
          const result = await this.$apollo.query({
            query: filtersQuery,
            variables: this.filtersVars
          });
          sortedFilters = this.getSortedFilters(result.data.products.filters);
        } catch (error) {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        }
      }

      this.$set(
        this.filters,
        'categories',
        sortedFilters.categories?.values || []
      );
      this.$set(this.filters, 'brands', sortedFilters.brands?.values || []);
      this.$set(this.filters, 'skus', sortedFilters.skus?.values || []);
      this.$set(this.filters, 'price', sortedFilters.price?.values || []);
      this.$set(this.filters, 'discount', sortedFilters.discount?.values || []);
      this.$set(this.filters, 'parameters', sortedFilters.parameters || []);
      this.filtersSet = true;
      this.updateFilters(this.baseFilters);
      if (
        Object.keys(this.$route.query).length > 0 &&
        !(Object.keys(this.$route.query).length === 1 && this.$route.query.page)
      ) {
        this.setupUserSelection();
      } else {
        this.$nextTick(() => {
          this.setPagingState();
        });
      }
    },
    removeQueryVar(query, fields) {
      const newQuery = JSON.parse(JSON.stringify(query));

      fields.forEach(field => {
        const indexQueryVariable = newQuery.definitions[0].variableDefinitions.findIndex(
          item => item.variable.name.value === field
        );
        const indexQueryField = newQuery.definitions[0].selectionSet.selections[0].arguments.findIndex(
          item => item.value.name.value === field
        );

        if (![indexQueryVariable, indexQueryField].includes(-1)) {
          newQuery.definitions[0].variableDefinitions.splice(
            indexQueryVariable,
            1
          );
        }
      });

      return newQuery;
    },
    // @vuese
    // Updating all filters
    // @arg filters (Object)
    updateFilters(filters) {
      const sortedFilters = this.getSortedFilters(filters);

      if (this.list.firstFilterChanged !== 'categories') {
        this.filters.categories = this.setNewCount(
          this.filters.categories,
          sortedFilters.categories
        );
      }
      if (this.list.firstFilterChanged !== 'brands') {
        this.filters.brands = this.setNewCount(
          this.filters.brands,
          sortedFilters.brands
        );
      }
      if (this.list.firstFilterChanged !== 'skus') {
        this.filters.skus = this.setNewCount(
          this.filters.skus,
          sortedFilters.skus
        );
      }
      if (this.list.firstFilterChanged !== 'price') {
        this.filters.price = this.setNewCount(
          this.filters.price,
          sortedFilters.price
        );
      }
      if (this.list.firstFilterChanged !== 'discount') {
        this.filters.discount = this.setNewCount(
          this.filters.discount,
          sortedFilters.discount
        );
      }
      this.filters.parameters = this.filters.parameters.map(filter => {
        const newFilter = sortedFilters.parameters.find(
          i => i.filterId === filter.filterId
        );
        let filterClone = JSON.parse(JSON.stringify(filter));
        if (this.list.firstFilterChanged !== filter.filterId) {
          filterClone = {
            ...filterClone,
            values: this.setNewCount(filter.values, newFilter)
          };
        }
        return filterClone;
      });
    },
    // @vuese
    // Used to set new count of filters
    // @arg base filters (Array), new filters (Array)
    setNewCount(baseFilters, newFilters) {
      if (!baseFilters) {
        return baseFilters;
      }
      const baseFiltersClone = JSON.parse(JSON.stringify(baseFilters));

      if (!newFilters) {
        return baseFiltersClone.map(i => ({ ...i, count: 0 }));
      }

      const newFiltersClone = JSON.parse(JSON.stringify(newFilters));

      const array = baseFiltersClone.map(i => {
        const existsInNewFilters = newFiltersClone?.values.findIndex(
          ii => ii.facetId === i.facetId
        );
        if (existsInNewFilters === -1) {
          i.count = 0;
        } else {
          const newCount = newFiltersClone?.values.find(
            ii => ii.facetId === i.facetId
          ).count;
          i.count = newCount || 0;
        }
        return i;
      });
      return array;
    },
    // @vuese
    // Sorting all filters into groups
    // @arg filters (Object)
    getSortedFilters(filters) {
      const categories = filters.facets.find(i => i.type === 'Category');
      const brands = filters.facets.find(i => i.type === 'Brand');
      const skus = filters.facets.find(i => i.type === 'Sku');
      const price = filters.facets.find(i => i.type === 'Price');
      const discount = filters.facets.find(i => i.type === 'Discount');
      const parameters = filters.facets.filter(i => i.type === 'Parameter');
      return { categories, brands, skus, price, discount, parameters };
    },
    // @vuese
    // Setting up params for filter in URL
    // @arg filter selection (Array)
    getReadableParams(array) {
      const readableParams = array.map(i => i.label + '~' + i.id);
      return readableParams.join();
    },
    // @vuese
    // Switching to canonical url if different from route path
    switchToCanonicalOr404() {
      if (this.listInfo) {
        if (this.listInfo.canonicalUrl !== this.$route.path) {
          this.$router.replace({
            path: this.listInfo.canonicalUrl,
            query: this.$route.query
          });
          this.$store.dispatch('loading/end');
        }
      } else {
        this.$nuxt.error({
          statusCode: 404,
          message: 'Page not found',
          url: this.$route.path
        });
      }
    },
    // @vuese
    // Controls routing between filtered paths on the same category/brand etc
    handleFilteredRoutesRouting(routes) {
      if (
        routes.to.path === routes.from.path &&
        routes.to.fullPath !== routes.from.fullPath
      ) {
        const fixRouting = async () => {
          await this.$store.dispatch('list/saveQuerySelection', {
            query: routes.to.query,
            setPage: false
          });
          let resetSelectionFromQuery = false;
          const userSelectionExists = !!this.userSelection;

          this.userSelection = userSelectionExists
            ? this.userSelection
            : {
                brands: [],
                categories: [],
                skus: [],
                price: [],
                discount: [],
                parameters: {},
                sort: this.defaultSort
              };

          for (const [key, value] of Object.entries(this.list.querySelection)) {
            if (
              JSON.stringify(this.userSelection[key]) !== JSON.stringify(value)
            ) {
              resetSelectionFromQuery = true;
            }
          }
          if (resetSelectionFromQuery) {
            this.userSelection = null;
            await this.setupUserSelection();
            window.scrollTo(0, 0);
          } else {
            if (!userSelectionExists) {
              this.userSelection = null;
            }
            if (
              Object.keys(this.$route.query).length > 0 &&
              !(
                Object.keys(this.$route.query).length === 1 &&
                this.$route.query.page
              )
            ) {
              this.$store.commit('list/resetQuerySelection');
            }
          }
        };
        fixRouting();
      }
    }
  }
};
