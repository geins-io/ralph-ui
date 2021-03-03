<template>
  <div class="ca-widget-product-list">
    <h2 class="ca-widget-product-list__title">{{ configuration.title }}</h2>
    <CaProductList
      v-if="configuration.slideshowDisabled"
      class="ca-widget-product-list__list"
      :products="allProducts"
      :page-size="take"
    />
    <CaProductListSlider
      v-else
      class="ca-widget-product-list__list"
      :products="allProducts"
      :page-size="take"
      :arrows="configuration.displayNavigationArrows"
      :dots="configuration.displayNavigationLinks"
      :arrow-icon-name="$config.productListWidgetArrowIconName"
    />
  </div>
</template>
<script>
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
          take: this.take,
          filter: this.configuration.searchParameters,
          sort: this.configuration.searchParameters.sort
        };
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
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
