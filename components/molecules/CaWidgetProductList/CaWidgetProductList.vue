<template>
  <div v-show="!noProducts" class="ca-widget-product-list">
    <h2 v-show="isTitleVisible" class="ca-widget-product-list__title">
      {{ configuration.title }}
    </h2>
    <CaProductList
      v-if="configuration.slideshowDisabled"
      class="ca-widget-product-list__list"
      :products="productList"
      :page-size="take"
    />
    <CaProductListSlider
      v-else
      class="ca-widget-product-list__list"
      :products="productList"
      :page-size="take"
      :arrows="configuration.displayNavigationArrows"
      :dots="configuration.displayNavigationLinks"
      :arrow-icon-name="$config.productListWidgetArrowIconName"
    />
    <CaListPagination
      v-if="
        configuration.slideshowDisabled &&
        !configuration.limitNrOfRows &&
        products &&
        totalCount > take
      "
      direction="next"
      :showing="showing"
      :total-count="totalCount"
      :all-products-loaded="allProductsLoaded"
      :loading="$apollo.queries.products.loading"
      :min-count="currentMinCount"
      :max-count="currentMaxCount"
      @loadmore="loadMore"
    />
  </div>
</template>
<script>
import productsQuery from 'productlist/products.graphql';
import MixListPagination from 'MixListPagination';
import MixFetch from 'MixFetch';
// @group Molecules
// @vuese
// Widget displaying a product list<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-product-list.scss_
export default {
  name: 'CaWidgetProductList',
  mixins: [MixFetch, MixListPagination],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    mainProductList: false,
    productsLoaded: false,
  }),
  async fetch() {
    if (this.noData) {
      this.productsLoaded = true;
      return;
    }
    this.productList = await this.fetchData(
      productsQuery,
      this.variables,
      (result) => {
        const products = result?.data?.products || null;
        this.productsLoaded = true;
        this.setupPagination(products?.count);
        return products?.products || [];
      },
    );
  },
  computed: {
    // @vuese
    // Variables in product request
    // @type Object
    variables() {
      const filter = this.configuration.searchParameters;

      if (this.isLatestMode) {
        filter.productIds = this.latestProducts;
        filter.sort = 'FACET_ORDER';
      }

      if (this.isFavoriteMode) {
        filter.productIds = this.$store.state.favorites;
        filter.sort = 'FACET_ORDER';
      }

      return {
        filter,
        take: this.take,
      };
    },
    // @vuese
    // Products loaded but no result
    // @type Boolean
    noProducts() {
      return this.productsLoaded && this.productList.length === 0;
    },
    // @vuese
    // No data to show
    // @type Boolean
    noData() {
      if (this.isFavoriteMode && this.favoriteProducts.length === 0) {
        return true;
      }
      if (this.isLatestMode && this.latestProducts.length === 0) {
        return true;
      }
      return false;
    },
    // @vuese
    // How many products to take
    // @type Number
    take() {
      return this.configuration.limitNrOfRows
        ? this.configuration.pageCount * this.$config.productListRowSize
        : this.$config.productListPageSize;
    },
    // @vuese
    // Returns the variable object for loading more products
    // @type Object
    loadMoreQueryVars() {
      const varsObj = {
        skip: this.currentMaxCount,
        take: this.take,
        filter: this.configuration.searchParameters,
      };
      return varsObj;
    },
    // @vuese
    // Is widget on latest products mode
    // @type Boolean
    isLatestMode() {
      return this.configuration?.mode === 'LATEST_VIEWED';
    },
    // @vuese
    // Is widget on favorite products mode
    // @type Boolean
    isFavoriteMode() {
      return this.configuration?.mode === 'FAVORITES';
    },
    // @vuese
    // Is title visible
    // @type Boolean
    isTitleVisible() {
      if (this.noProducts) {
        return false;
      }
      return !!this.configuration?.title;
    },
    // @vuese
    // Latest visible products
    // @type Array
    latestProducts() {
      const latestProducts = this.$cookies.get('ralph-latest-products');
      return latestProducts?.length && typeof latestProducts[0] !== 'string'
        ? latestProducts
        : [];
    },
    // @vuese
    // Favorite products
    // @type Array
    favoriteProducts() {
      return this.$store.state.favorites;
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-product-list';
</style>
