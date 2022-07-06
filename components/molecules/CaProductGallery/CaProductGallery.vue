<template>
  <div class="ca-product-gallery">
    <div class="ca-product-gallery__main">
      <CaSlider
        v-if="isGalleryModeSlider"
        ref="slider"
        class="ca-product-gallery__slider"
        :centered="true"
        :dots="images.length > 1 && showDots"
        :infinite="images.length > 1"
        :nr-of-slides="images.length"
        :arrow-icon-name="arrowIconName"
        @slideChange="slideChangeHandler"
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
      <CaClickable
        v-if="isGalleryModePlain"
        class="ca-product-gallery__image-container ca-product-gallery__image-container--main"
        @clicked="openModal(0)"
      >
        <CaImage
          class="ca-product-gallery__image ca-product-gallery__image--main"
          type="product"
          :filename="images[0]"
          :ratio="$config.productImageRatio"
          :alt="alt"
          :size-array="
            $config.imageSizes.product.filter(
              item => parseInt(item.descriptor) < 1700
            )
          "
          sizes="(min-width: 1360px) 510px, (min-width: 1024px) 38vw, (min-width: 768px) 51vw, 70vw"
        />
        <div v-if="hasOverlay" class="ca-product-gallery__slide-overlay">
          <CaIcon name="plus" />
        </div>
      </CaClickable>
      <CaCampaigns
        v-if="campaigns"
        class="ca-product-gallery__campaigns"
        :campaigns="campaigns"
      />
    </div>
    <CaSlider
      v-if="isThumbnailModeSlider"
      ref="navslider"
      class="ca-product-gallery__nav ca-product-gallery__nav--slider"
      :nr-of-slides="images.length"
      :infinite="false"
    >
      <template #slides="{ slideMeta }">
        <CaSlide
          v-for="(image, index) in images"
          :key="index"
          :slide-index="index"
          :slide-meta="slideMeta"
          class="ca-product-gallery__nav-slide"
          :class="{
            'ca-product-gallery__nav-slide--current': index === currentSlide
          }"
          @clicked="slideToIndex(index, 'slider')"
        >
          <CaImage
            class="ca-product-gallery__nav-image"
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
        </CaSlide>
      </template>
    </CaSlider>
    <div
      v-if="isThumbnailModeGrid"
      class="ca-product-gallery__thumbnails ca-product-gallery__thumbnails--grid"
    >
      <CaClickable
        v-for="(image, index) in images"
        :key="index"
        class="ca-product-gallery__thumbnail-container ca-product-gallery__thumbnail-container--grid"
        @clicked="openModal(index)"
      >
        <CaImage
          class="ca-product-gallery__thumbnail ca-product-gallery__thumbnail--grid"
          type="product"
          :filename="image"
          :ratio="$config.productImageRatio"
          :alt="alt"
          :size-array="
            $config.imageSizes.product.filter(
              item => parseInt(item.descriptor) <= 500
            )
          "
          sizes="(min-width: 1360px) 255px, (min-width: 1024px) 19vw, (min-width: 768px) 25.5vw, 35vw"
        />
      </CaClickable>
    </div>
  </div>
</template>
<script>
import eventbus from '@ralph/ralph-ui/plugins/eventbus.js';
import CaSlide from '../../../components/atoms/CaSlide/CaSlide.vue';
import CaImage from '../../../components/atoms/CaImage/CaImage.vue';

// @group Molecules
// The product page gallery<br><br>
// **SASS-path:** _./styles/components/molecules/ca-product-gallery.scss_
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
    // Gallery mode
    galleryMode: {
      // 'slider', 'plain'
      type: String,
      default: 'slider',
      validator(value) {
        return ['slider', 'plain'].includes(value);
      }
    },
    // Use overlay
    hasOverlay: {
      type: Boolean,
      default: true
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
    },
    // Thumbnail mode
    thumbnailMode: {
      // 'slider', 'grid'
      type: String,
      default: 'slider',
      validator(value) {
        return ['slider', 'grid'].includes(value);
      }
    },
    // Display dots or not
    showDots: {
      type: Boolean,
      default: true
    },
    // To show campaign badge on image
    campaigns: {
      type: [Array, Boolean],
      default: false
    }
  },
  data: () => ({
    modalIndex: 1,
    currentSlide: 0
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
    },
    hasImages() {
      return this.images.length > 0;
    },
    isGalleryModeSlider() {
      if (!this.hasImages) {
        return;
      }

      return (
        this.galleryMode === 'slider' ||
        (this.galleryMode === 'plain' && !this.$store.getters.viewportComputer)
      );
    },
    isGalleryModePlain() {
      if (!this.hasImages) {
        return;
      }

      return (
        this.galleryMode === 'plain' && this.$store.getters.viewportComputer
      );
    },
    isThumbnailModeSlider() {
      if (!this.hasImages) {
        return;
      }

      return (
        this.showGalleryThumbnails &&
        this.thumbnailMode === 'slider' &&
        this.$store.getters.viewportComputer
      );
    },
    isThumbnailModeGrid() {
      if (!this.hasImages) {
        return;
      }

      return (
        this.showGalleryThumbnails &&
        this.thumbnailMode === 'grid' &&
        this.$store.getters.viewportComputer
      );
    }
  },
  watch: {},
  mounted() {},
  beforeDestroy() {
    eventbus.$emit('close-modal');
  },
  methods: {
    // @vuese
    // Slide to specific image
    // @arg index (Number)
    slideToIndex(index, slider) {
      this.$refs[slider].goToSlide(index);
    },
    openModal(index) {
      this.modalIndex = index;
      const modalSettings = {
        component: 'CaProductGalleryModal',
        componentProps: this.modalProps
      };
      this.$store.commit('modal/open', modalSettings);
    },
    slideChangeHandler(index) {
      this.currentSlide = index;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-product-gallery';
</style>
