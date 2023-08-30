<template>
  <div class="ca-widget-product-list">
    <div :id="nostoId" class="nosto_element" />
    <div v-if="loaded">
      <h2 style="height: 25px" class="ca-widget-product-list__title">
        <span v-if="isTitleVisible">{{ nostoTitle }}</span>
      </h2>
      <CaProductList
        v-if="configuration.slideshowDisabled"
        class="ca-widget-product-list__list"
        :products="products"
        :page-size="take"
      />
      <CaProductListSlider
        v-else-if="loading || products.length > 0"
        class="ca-widget-product-list__list"
        :products="products"
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
        :loading="loading"
        @loadmore="loadMore"
      />
    </div>
  </div>
</template>
<script>
import MixListPagination from 'MixListPagination';
import MixNostoSection from 'MixNostoSection';

// @group Atoms
// @vuese
// Nosto placement block
// **SASS-path:** _./styles/components/atoms/ca-ca-nosto-section.scss_
export default {
  name: 'CaNostoSection',
  mixins: [MixListPagination, MixNostoSection],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    productsLoaded: false,
    loading: true,
    loaded: false,
  }),
  computed: {
    isTitleVisible() {
      return this.nostoTitle && this.products?.length;
    },
    nostoId() {
      return this.configuration?.nostoId;
    },
    take() {
      return this.configuration.limitNrOfRows
        ? this.configuration.pageCount * this.$config.productListRowSize
        : this.$config.productListPageSize;
    },
    nostoTitle() {
      return this.nostoData?.title;
    },
    products() {
      const nostoProducts = this.nostoData?.products;
      if (nostoProducts) {
        return this.formatNostoData(nostoProducts);
      }
      return [];
    },
    isProductsEmpty() {
      return !this.loading && this.products.length === 0;
    },
  },
  watch: {
    products: {
      handler(val) {
        this.loading = false;
        this.productsLoaded = true;
      },
    },
    nostoData(newVal) {
      if (newVal) {
        this.loaded = newVal.products.length;
      }
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-nosto-section';
/* stylelint-disable */
.nosto_element {
  display: none !important;
}
/* stylelint-enable */
</style>
