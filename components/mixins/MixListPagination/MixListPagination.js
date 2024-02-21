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
// nextPageLoading: `false`<br>
// prevPageLoading: `false`<br>
export default {
  name: 'MixListPagination',
  mixins: [],
  props: {},
  data: (vm) => ({
    currentPage: 1,
    currentMinCountSet: 0,
    currentMaxCountSet: 0,
    pageSize: vm.$config.productListPageSize,
    totalCount: 0,
    productList: [],
    mainProductList: true,
    nextPageLoading: false,
    prevPageLoading: false,
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
        return this.totalCount < this.currentMaxCountSet
          ? this.totalCount
          : this.currentMaxCountSet;
      }
      const count =
        this.pagingPage > 1 ? this.skip + this.pageSize : this.pageSize;
      const maxCount = count >= this.totalCount ? this.totalCount : count;
      const returnCount =
        maxCount < this.productList.length ? this.productList.length : maxCount;
      return returnCount;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Setup pagination
    // @arg count (Number)
    setupPagination(count) {
      this.totalCount = count || 0;

      // 404 if page number requested too high
      if (
        this.$route.query?.page &&
        Number(this.$route.query?.page) >
          Math.ceil(this.totalCount / this.pageSize)
      ) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'Page not found',
          url: this.$route.fullPath,
        });
      }

      if (this.pagingPage > 1) {
        this.currentMinCountSet = this.skip + 1;
        const count = this.skip + this.pageSize;

        this.currentMaxCountSet =
          count >= this.totalCount ? this.totalCount : count;
      }
    },
    // @vuese
    // Load next chunk of products
    async loadMore() {
      this.nextPageLoading = true;
      if (this.mainProductList) {
        this.userHasPaged = true;
      }
      const currentProductList = this.productList;
      this.productList = [...this.productList, ...this.skeletonProductsNext];

      this.currentMaxCountSet = this.currentMaxCountSet
        ? this.currentMaxCountSet
        : this.pageSize;

      this.currentPage = this.currentMaxCount / this.pageSize + 1;

      this.products = await this.fetchData(
        this.productsQuery,
        (result) => {
          const { products } = result.data;
          this.currentMaxCountSet += products.products.length;
          this.productList = [...currentProductList, ...products.products];
          if (this.mainProductList) {
            this.pushURLParams();
          }
          this.nextPageLoading = false;
          return products;
        },
        this.loadMoreQueryVars,
      );
    },
    // @vuese
    // Load previous chunk of products
    async loadPrev() {
      this.prevPageLoading = true;
      this.userHasPaged = true;
      const currentProductList = this.productList;
      const scrollHeight = this.getScrollHeight();
      this.productList = [...this.skeletonProducts, ...this.productList];
      this.currentPage = (this.currentMinCount - 1) / this.pageSize;

      this.$nextTick(() => {
        const scrollAmount = this.getScrollHeight() - scrollHeight;
        window.scrollBy(0, scrollAmount);
      });

      this.products = await this.fetchData(
        this.productsQuery,
        (result) => {
          const { products } = result.data;
          this.currentMinCountSet -= products.products.length;
          this.productList = [...products.products, ...currentProductList];
          this.pushURLParams();
          this.prevPageLoading = false;
          return products;
        },
        this.loadPrevQueryVars,
      );
    },
  },
};
