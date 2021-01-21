<template>
  <div class="ca-product-gallery">
    <ul class="ca-product-gallery__nav only-computer">
      <li
        v-for="(image, index) in images"
        :key="index"
        class="ca-product-gallery__nav-slide"
        @click="slideToIndex(index)"
      >
        <a href="javascript:;" @click="slideToIndex(index)">
          <CaImage
            class="ca-product-gallery__nav-image"
            size="200f200"
            type="product"
            :filename="image"
            :ratio="$config.productImageRatio"
            :alt="alt"
            :size-array="[
              { folder: '85f85', descriptor: '1x' },
              { folder: '170f170', descriptor: '2x' }
            ]"
          />
        </a>
      </li>
    </ul>
    <CaSlider
      v-if="images.length > 0"
      ref="slider"
      class="ca-product-gallery__slider"
      :centered="true"
      :dots="images.length > 1"
      :infinite="images.length > 1"
      :nr-of-slides="images.length"
      :arrow-icon-name="arrowIconName"
    >
      <template #slides="{ slideMeta }">
        <CaSlide
          v-for="(image, index) in images"
          :key="index"
          :slide-index="index"
          :slide-meta="slideMeta"
          class="ca-product-gallery__slide"
        >
          <CaImage
            class="ca-product-gallery__image"
            size="600f600"
            type="product"
            :filename="image"
            :ratio="$config.productImageRatio"
            :alt="alt"
            :size-array="
              $config.imageSizes.product.filter(
                item => parseInt(item.descriptor) < 1700
              )
            "
            sizes="(min-width: 1360px) 510px, (min-width: 1024px) 38vw, (min-width: 768px) 51vw, 70vw"
          />
        </CaSlide>
      </template>
    </CaSlider>
  </div>
</template>
<script>
// @group Molecules
// The product page gallery<br><br>
// **SASS-path:** _./styles/components/molecules/ca-product-gallery.scss_
export default {
  name: 'CaProductGallery',
  mixins: [],
  props: {
    // Array of the products image filenames
    images: {
      type: Array,
      required: true
    },
    // The alt text for the product images
    alt: {
      type: String,
      required: true
    },
    // First part of icon name for the arrows. Will add '-left', '-right', '-up' or '-down' as fitting
    arrowIconName: {
      type: String,
      default: 'chevron'
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Slide to specific image
    // @arg index (Number)
    slideToIndex(index) {
      this.$refs.slider.goToSlide(index);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-product-gallery';
</style>
