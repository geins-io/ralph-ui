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
    if (this.isWidgetModeStatic) {
      this.setupPagination(0);
      this.productsLoaded = true;
      return;
    }

    this.productList = await this.$apollo
      .query({
        query: productsQuery,
        variables: this.productVars,
      })
      .then((result) => {
        const products = result?.data?.products ?? null;
        this.productsLoaded = true;
        this.setupPagination(products?.count);
        return products?.products || [];
      })

      .catch((error) => {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      });
  },
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
      return this.isLatestMode || this.isFavoriteMode;
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
      return !!this.configuration?.title;
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
          facets: this.latestProducts,
        };
      }

      if (this.isFavoriteMode) {
        filter = {
          facets: this.favoritesProducts,
        };
      }

      return {
        filter,
        take: this.take,
      };
    },
  },
  watch: {
    productVars: {
      deep: true,
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.$fetch();
        }
      },
    },
  },
  mounted() {},
  methods: {
    // @vuese
    // Format alias to facet
    // @arg alias
    formatToFacet(alias) {
      return `a_${alias}`;
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-product-list';
</style>
