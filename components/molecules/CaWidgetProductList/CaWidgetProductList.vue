<template>
  <div class="ca-widget-product-list">
    <h2 class="ca-widget-product-list__title">{{ configuration.title }}</h2>
    <CaProductList
      v-if="configuration.slideshowDisabled"
      class="ca-widget-product-list__list"
      :products="allProducts"
      :page-size="take"
      :filters-active="false"
      :skip="0"
    />
    <CaProductListSlider
      v-else
      class="ca-widget-product-list__list"
      :products="allProducts"
      :page-size="take"
      :arrows="configuration.displayNavigationArrows"
      :dots="configuration.displayNavigationLinks"
    />
  </div>
</template>
<script>
import CaProductList from 'CaProductList';
import CaProductListSlider from 'CaProductListSlider';
import productsQuery from 'productlist/products.graphql';
// @group Molecules
// @vuese
// Widget displaying a product list<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-product-list.scss_
export default {
  name: 'CaWidgetProductList',
  apollo: {
    products: {
      query: productsQuery,
      variables() {
        return {
          apiKey: this.$config.apiKey.toString(),
          skip: 0,
          take: this.take,
          filter: this.searchFilter,
          sort: this.sort
        };
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  components: { CaProductList, CaProductListSlider },
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    allProducts() {
      return this.products ? this.products.products : [];
    },
    take() {
      return this.configuration.pageCount * this.$config.productListRowSize;
    },
    searchFilter() {
      const filterObj = {};
      filterObj.categories = this.configuration.searchParameters.Categories;
      filterObj.brands = this.configuration.searchParameters.Brands;
      filterObj.aliases = this.configuration.searchParameters.Aliases;
      return filterObj;
    },
    sort() {
      switch (this.configuration.searchParameters.Sort) {
        case 'MOSTSOLD':
          return 'MOST_SOLD';
        case 'PRICEDESC':
          return 'PRICE_DESC';
        case 'PRICE':
          return 'PRICE';
        case 'LATEST':
          return 'LATEST';
        default:
          return this.$config.productListDefaultSort;
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-product-list';
</style>
