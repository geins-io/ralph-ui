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
import MixApolloRefetch from 'MixApolloRefetch';
// @group Molecules
// @vuese
// Widget displaying a product list<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-product-list.scss_
export default {
  name: 'CaWidgetProductList',
  mixins: [MixApolloRefetch, MixListPagination],
  apollo: {
    products: {
      query: productsQuery,
      variables() {
        return this.productVars;
      },
      errorPolicy: 'all',
      result(result) {
        const products = result?.data?.products ?? null;
        this.productList = products?.products || [];
        this.productsLoaded = true;
        this.setupPagination(products?.count);
      },
      skip() {
        return (
          this.isWidgetModeStatic ||
          (this.fetchProductsOnlyClientSide && process.server)
        );
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    }
  },
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    },
    // Fetch products only client side
    fetchProductsOnlyClientSide: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    mainProductList: false,
    productsLoaded: false
  }),
  computed: {
    // @vuese
    // Products loaded but no result
    // @type Boolean
    noProducts() {
      return this.productsLoaded && this.productList.length === 0;
    },
    // @vuese
    // Is the widget in favorite or latest mode
    // @type Boolean
    isWidgetModeStatic() {
      return this.checkModeConditions(null) === false;
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
        filter: this.configuration.searchParameters
      };
      return varsObj;
    },
    // @vuese
    // Is widget on latest products mode
    // @type Object
    isLatestMode() {
      return this.configuration?.mode === 'LATEST_VIEWED';
    },
    // @vuese
    // Is widget on favorite products mode
    // @type Object
    isFavoriteMode() {
      return this.configuration?.mode === 'FAVORITES';
    },
    // @vuese
    // Is title visible
    // @type Object
    isTitleVisible() {
      if (this.noProducts) {
        return false;
      }
      return this.checkModeConditions(this.configuration.title);
    },
    // @vuese
    // Latest visible products (need only in latest mode)
    // @type Object
    latestProducts() {
      const savedProductsAliases = this.$cookies.get('ralph-latest-products');
      return savedProductsAliases
        ? savedProductsAliases.map(this.formatToFacet)
        : [];
    },
    // @vuese
    // Latest visible products (need only in favorite mode)
    // @type Object
    favoritesProducts() {
      return this.$store.state.favorites.length
        ? this.$store.state.favorites.map(this.formatToFacet)
        : [];
    },
    // @vuese
    // Variables in product request
    // @type Object
    productVars() {
      let filter = this.configuration.searchParameters;

      if (this.isLatestMode) {
        filter = {
          facets: this.latestProducts
        };
      }

      if (this.isFavoriteMode) {
        filter = {
          facets: this.favoritesProducts
        };
      }

      return {
        filter,
        take: this.take
      };
    }
  },
  watch: {
    isWidgetModeStatic: {
      handler(val) {
        if (val) {
          this.setupPagination(0);
          this.productsLoaded = true;
        }
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    formatToFacet(alias) {
      return `a_${alias}`;
    },
    checkModeConditions(additionalCondition) {
      if (this.isLatestMode) {
        return Boolean(this.latestProducts.length);
      }

      if (this.isFavoriteMode) {
        return Boolean(this.favoritesProducts.length);
      }
      return additionalCondition;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-product-list';
</style>
