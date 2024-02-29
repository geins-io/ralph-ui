<template>
  <CaSlider
    ref="slider"
    class="ca-product-list-slider"
    :dots="products.length > 1 && dots"
    :arrows="products.length > 1 && arrows"
    :nr-of-slides="products.length"
    :arrow-icon-name="arrowIconName"
    :slides-to-scroll="slidesToScroll"
    :infinite="false"
  >
    <template #slides="{ slideMeta }">
      <CaSlide
        v-for="(product, index) in allProducts"
        :key="index"
        :slide-index="index"
        :slide-meta="slideMeta"
        class="ca-product-list-slider__slide"
      >
        <CaProductCard :key="index" :product-data="product" base-tag="div" />
      </CaSlide>
    </template>
  </CaSlider>
</template>
<script>
import CaSlide from '@geins/ralph-ui/components/atoms/CaSlide/CaSlide.vue';
import CaProductCard from '@/components/organisms/CaProductCard/CaProductCard.vue';

// @group Molecules
// @vuese
// A product list displayed as a slider<br><br>
// **SASS-path:** _./styles/components/molecules/ca-product-list-slider.scss_
export default {
  name: 'CaProductListSlider',
  components: {
    CaProductCard,
    CaSlide,
  },
  mixins: [],
  props: {
    // Array of products
    products: {
      type: Array,
      required: true,
    },
    // Current page size
    pageSize: {
      type: Number,
      required: true,
    },
    // Should dots be displayed?
    dots: {
      type: Boolean,
      default: false,
    },
    // Should arrows be displayed?
    arrows: {
      type: Boolean,
      default: false,
    },
    // First part of icon name for the arrows. Will add '-left', '-right', '-up' or '-down' as fitting
    arrowIconName: {
      type: String,
      default: 'chevron',
    },
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
    },
    slidesToScroll() {
      const scrollSize =
        this.$config.productListScrollSize[this.$store.getters.viewport];
      if (isFinite(scrollSize)) {
        return scrollSize;
      }
      this.$ralphLogError(
        `Missing product list scroll size for viewport ${this.$store.getters.viewport}. Check config.`,
      );
      return 1;
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-product-list-slider';
</style>
