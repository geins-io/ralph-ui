// @group Mixins
// @vuese
// Shared pagination functions for product list<br><br>
// **Data:**<br>
// currentPage: `1`<br>
// currentMinCount: `1`,<br>
// currentMaxCount: `vm.$config.productListPageSize`<br>
// pageSize: `vm.$config.productListPageSize`<br>
// totalCount: `0`<br>
// productList: `[]`<br>
// mainProductList: `true`<br>
export default {
  name: 'MixListPagination',
  mixins: [],
  props: {},
  data: vm => ({
    currentPage: 1,
    currentMinCountSet: null,
    currentMaxCountSet: null,
    pageSize: vm.$config.productListPageSize,
    totalCount: 0,
    productList: [],
    mainProductList: true
  }),
  computed: {
    // @vuese
    // Returns an array of empty objects with same lengt as the nr of products left to load
    // @type Array
    skeletonProductsNext() {
      const prodArray = [];
      const count = this.totalCount - this.currentMaxCount;
      const nextPageSize = count < this.pageSize ? count : this.pageSize;
      for (let i = 0; i < nextPageSize; i++) {
        prodArray.push({});
      }
      return prodArray;
    },
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
    // Returns the correct current page when SSR
    // @type Number
    pagingPage() {
      const routePage = this.$route.query.page
        ? Number(this.$route.query.page)
        : 1;
      return routePage > 1 && this.currentPage === 1
        ? routePage
        : this.currentPage;
    },
    // @vuese
    // Returns the current min count
    // @type Number
    currentMinCount() {
      if (this.currentMinCountSet) {
        return this.currentMinCountSet;
      }

      return this.pagingPage > 1 ? this.skip + 1 : 1;
    },
    // @vuese
    // Returns the current max count
    // @type Number
    currentMaxCount() {
      if (this.currentMaxCountSet) {
        return this.currentMaxCountSet;
      }
      const count =
        this.pagingPage > 1 ? this.skip + this.pageSize : this.pageSize;
      const maxCount = count >= this.totalCount ? this.totalCount : count;
      const returnCount =
        maxCount < this.productList.length ? this.productList.length : maxCount;
      return returnCount;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Setup pagination
    // @arg products (Object)
    setupPagination(products) {
      this.totalCount = products?.count ?? 0;

      // 404 if page number requested too high
      if (
        this.$route.query?.page &&
        Number(this.$route.query?.page) >
          Math.ceil(this.totalCount / this.pageSize)
      ) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'Page not found',
          url: this.$route.fullPath
        });
      }

      this.productList = products?.products ?? [];

      if (!this.currentMaxCountSet) {
        return;
      }

      if (this.currentMaxCountSet > this.totalCount) {
        this.currentMaxCountSet = this.totalCount;
      }
      if (this.currentMaxCountSet < this.productList.length) {
        this.currentMaxCountSet = this.productList.length;
      }
    },
    // @vuese
    // Load next chunk of products
    loadMore() {
      if (this.mainProductList) {
        this.userHasPaged = true;
      }
      const currentProductList = this.productList;
      this.productList = [...this.productList, ...this.skeletonProductsNext];
      this.currentPage = this.currentMaxCount / this.pageSize + 1;
      this.$apollo.queries.products.fetchMore({
        variables: this.loadMoreQueryVars,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newProducts = fetchMoreResult.products.products;
          this.currentMaxCount += newProducts.length;
          this.productList = [...currentProductList, ...newProducts];
          if (this.mainProductList) {
            this.pushURLParams();
          }
        }
      });
    }
  }
};
