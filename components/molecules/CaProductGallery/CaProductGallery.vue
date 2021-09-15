<template>
  <div class="ca-product-gallery">
    <ul
      v-if="showGalleryThumbnails"
      class="ca-product-gallery__nav only-computer"
    >
      <li
        v-for="(image, index) in images"
        :key="index"
        class="ca-product-gallery__nav-slide"
        @click="slideToIndex(index)"
      >
        <a href="javascript:;" @click="slideToIndex(index)">
          <CaImage
            class="ca-product-gallery__nav-image"
            size="170f170"
            type="product"
            :filename="image"
            :ratio="$config.productImageRatio"
            :alt="alt"
            :size-array="
              $config.imageSizes.product.filter(
                item => parseInt(item.descriptor) <= 200
              )
            "
            sizes="85px"
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
          @clicked="openModal(index)"
        >
          <CaImage
            class="ca-product-gallery__image"
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
          <div class="ca-product-gallery__slide-overlay">
            <CaIcon name="plus" />
          </div>
        </CaSlide>
      </template>
    </CaSlider>
  </div>
</template>
<script>
// @group Molecules
// The product page gallery<br><br>
// **SASS-path:** _./styles/components/molecules/ca-product-gallery.scss_
import CaSlide from '../../../components/atoms/CaSlide/CaSlide.vue';
import CaImage from '../../../components/atoms/CaImage/CaImage.vue';
export default {
  name: 'CaProductGallery',
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
    // Display the gallery thumbnails or not
    showGalleryThumbnails: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    modalIndex: 1
  }),
  computed: {
    modalProps() {
      return {
        images: this.images,
        alt: this.alt,
        arrowIconName: this.arrowIconName,
        index: this.modalIndex,
        ratio: this.$config.productImageRatio
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Slide to specific image
    // @arg index (Number)
    slideToIndex(index) {
      this.$refs.slider.goToSlide(index);
    },
    openModal(index) {
      this.modalIndex = index;
      const modalSettings = {
        component: 'CaProductGalleryModal',
        componentProps: this.modalProps
      };
      this.$store.commit('modal/open', modalSettings);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-product-gallery';
</style>
