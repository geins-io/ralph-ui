<template>
  <div class="ca-nosto-product-list">
    <h2 v-if="configuration.title" class="ca-widget-product-list__title">
      {{ configuration.title }}
    </h2>
    <CaProductList
      v-if="configuration.slideshowDisabled"
      class="ca-widget-product-list__list"
      :products="productList"
      :page-size="take"
    />
    <CaProductListSlider
      v-else-if="!(productsLoaded && productList.length === 0)"
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
          products.count > take
      "
      direction="next"
      :showing="showing"
      :total-count="products.count"
      :all-products-loaded="allProductsLoaded"
      :loading="$apollo.queries.products.loading"
      @loadmore="loadMore"
    />
  </div>
</template>
<script>
import MixListPagination from 'MixListPagination';
// import nostoProductsQuery from 'productlist/nosto-products.graphql';
import nostoRecommendationsQuery from 'productlist/nosto-recommendations.graphql';

// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-nosto-product-list.scss_
export default {
  name: 'CaWidgetNostoProductList',
  apollo: {
    products: {
      client: 'nosto',
      query: nostoRecommendationsQuery,
      variables() {
        return {
          take: 20,
          filter: {
            categories: []
          },
          sort: {
            field: 'PRICE',
            reverse: true
          }
        };
      },
      errorPolicy: 'all',
      result(result) {
        // const products = result?.data?.products ?? null;
        // this.setupPagination(products);
        this.productsLoaded = true;
      },
      skip() {
        return !this.isNostoRequest;
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  mixins: [MixListPagination],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    mainProductList: false,
    productsLoaded: false
  }),
  computed: {
    // @vuese
    // Condition to skip nosto request
    // @type Boolean
    isNostoRequest() {
      return this.$store.getters['nosto/isNostoActive'];
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
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-nosto-product-list';
</style>
