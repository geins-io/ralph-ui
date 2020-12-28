<template>
  <CaSlider
    ref="slider"
    class="ca-product-list-slider"
    :dots="products.length > 1 && dots"
    :arrows="products.length > 1 && arrows"
    :nr-of-slides="products.length"
    :arrow-icon-name="arrowIconName"
  >
    <template #slides="{ slideMeta }">
      <CaSlide
        v-for="(product, index) in allProducts"
        :key="index"
        :slide-index="index"
        :slide-meta="slideMeta"
        class="ca-product-list-slider__slide"
      >
        <CaProductCard :product="product" base-tag="div" />
      </CaSlide>
    </template>
  </CaSlider>
</template>
<script>
import CaSlider from 'CaSlider';
import CaSlide from 'CaSlide';
import CaProductCard from 'CaProductCard';
// @group Molecules
// @vuese
// A product list displayed as a slider<br><br>
// **SASS-path:** _./styles/components/molecules/ca-product-list-slider.scss_
export default {
  name: 'CaProductListSlider',
  components: { CaSlider, CaSlide, CaProductCard },
  mixins: [],
  props: {
    // Array of products
    products: {
      type: Array,
      required: true
    },
    // Current page size
    pageSize: {
      type: Number,
      required: true
    },
    // Should dots be displayed?
    dots: {
      type: Boolean,
      default: false
    },
    // Should arrows be displayed?
    arrows: {
      type: Boolean,
      default: false
    },
    // First part of icon name for the arrows. Will add '-left', '-right', '-up' or '-down' as fitting
    arrowIconName: {
      type: String,
      default: 'chevron'
    }
  },
  data: () => ({}),
  computed: {
    allProducts() {
      return this.products.length === 0 ? this.skeletonProducts : this.products;
    },
    skeletonProducts() {
      const prodArray = [];
      for (let i = 0; i < this.pageSize; i++) {
        prodArray.push({});
      }
      return prodArray;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-product-list-slider';
</style>
