<template>
  <div class="ca-widget-product-list">
    <h2 class="ca-widget-product-list__title">{{ configuration.Title }}</h2>
    <CaProductList
      v-if="configuration.SlideshowDisabled"
      class="ca-widget-product-list__list"
      :products="products.products"
      :page-size="take"
      :filters-active="false"
      :skip="0"
    />
    <CaProductListSlider
      v-else
      class="ca-widget-product-list__list"
      :products="products.products"
      :page-size="take"
      :arrows="configuration.DisplayNavigationArrows"
      :dots="configuration.DisplayNavigationLinks"
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
    take() {
      return this.configuration.PageCount * this.$config.productListRowSize;
    },
    searchFilter() {
      const filterObj = {};
      filterObj.categories = this.configuration.SearchParameters.Categories;
      filterObj.brands = this.configuration.SearchParameters.Brands;
      filterObj.aliases = this.configuration.SearchParameters.Aliases;
      return filterObj;
    },
    sort() {
      switch (this.configuration.SearchParameters.Sort) {
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
