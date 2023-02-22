<template>
  <div class="ca-product-gallery-modal">
    <CaSlider
      v-if="images.length > 0"
      ref="slider"
      class="ca-product-gallery-modal__slider"
      :centered="true"
      :arrows="true"
      :infinite="images.length > 1"
      :nr-of-slides="images.length"
      :arrow-icon-name="arrowIconName"
    >
      <template #slides="{ slideMeta }">
        <CaSlide
          v-for="(image, i) in images"
          :key="i"
          :slide-index="i"
          :slide-meta="slideMeta"
          class="ca-product-gallery-modal__slide"
        >
          <CaImage
            class="ca-product-gallery-modal__image"
            type="product"
            loading="eager"
            :filename="image"
            :ratio="$config.productImageRatio"
            :alt="alt"
            :size-array="
              $config.imageSizes.product.filter(
                item => parseInt(item.descriptor) > 500
              )
            "
            sizes="(min-width: 2000px) 2000px, 95vw"
          />
        </CaSlide>
      </template>
    </CaSlider>
  </div>
</template>
<script>
import CaSlide from '../../../components/atoms/CaSlide/CaSlide.vue';
import CaImage from '../../../components/atoms/CaImage/CaImage.vue';
// @group Molecules
// @vuese
// Product gallery to be placed in modal<br><br>
// **SASS-path:** _./styles/components/molecules/ca-product-gallery-modal.scss_
export default {
  name: 'CaProductGalleryModal',
  components: {
    CaSlide,
    CaImage
  },
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
    },
    // Index of curretn slide
    index: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {
    index(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$refs.slider.goToSlide(newVal);
      }
    }
  },
  mounted() {
    this.$refs.slider.goToSlide(this.index);
    this.$emit('ready');
  },
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-product-gallery-modal';
</style>
