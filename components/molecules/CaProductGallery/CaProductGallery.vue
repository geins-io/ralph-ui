<template>
  <div class="ca-product-gallery">
    <Hooper
      v-if="images.length > 0"
      ref="nav"
      class="ca-product-gallery__nav only-desktop"
      :settings="hooperSettingsNav"
      :infinite-scroll="navReachedSlideAmount"
      :mouse-drag="navReachedSlideAmount"
      @slide="slideGallery"
    >
      <Slide
        v-for="(image, index) in images"
        :key="index"
        class="ca-product-gallery__nav-slide"
      >
        <a href="javascript:;" @click="slideToIndex(index)">
          <CaImage
            class="ca-product-gallery__nav-image"
            size="200f200"
            type="product"
            :filename="image"
            :ratio="$config.productImageRatio"
            :alt="alt"
          />
        </a>
      </Slide>
      <HooperNavigation
        v-if="navReachedSlideAmount"
        slot="hooper-addons"
      ></HooperNavigation>
    </Hooper>
    <Hooper
      v-if="images.length > 0"
      ref="gallery"
      class="ca-product-gallery__slider"
      :settings="hooperSettings"
      :infinite-scroll="galleryReachedSlideAmount"
      :mouse-drag="galleryReachedSlideAmount"
      @slide="slideNav"
    >
      <Slide
        v-for="(image, index) in images"
        :key="index"
        class="ca-product-gallery__slide"
      >
        <CaImage
          class="ca-product-gallery__image"
          size="600f600"
          type="product"
          :filename="image"
          :ratio="$config.productImageRatio"
          :alt="alt"
          @loaded="() => (imageLoaded = true)"
        />
      </Slide>
      <HooperPagination
        v-if="imageLoaded && galleryReachedSlideAmount"
        slot="hooper-addons"
      ></HooperPagination>
    </Hooper>
  </div>
</template>
<script>
import {
  Hooper,
  Slide,
  Pagination as HooperPagination,
  Navigation as HooperNavigation
} from 'hooper';
import 'hooper/dist/hooper.css';

import CaImage from 'CaImage';
// @group Molecules
// The product page gallery<br><br>
// **SASS-path:** _./styles/components/molecules/ca-product-gallery.scss_
export default {
  name: 'CaProductGallery',
  components: { Hooper, Slide, HooperPagination, HooperNavigation, CaImage },
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
    }
  },
  data: () => ({
    imageLoaded: false,
    imagePlaceholder: require('~/assets/placeholders/product-image-square.png'),
    hooperSettings: {
      group: 'productGallery',
      itemsToShow: 1.4,
      centerMode: true,
      wheelControl: false,
      breakpoints: {
        480: {
          itemsToShow: 1.6
        },
        768: {
          itemsToShow: 1.9
        },
        1024: {
          itemsToShow: 1,
          centerMode: false
        }
      }
    },
    hooperSettingsNav: {
      group: 'productGallery',
      itemsToShow: 5,
      vertical: true,
      wheelControl: false
    }
  }),
  computed: {
    galleryReachedSlideAmount() {
      return this.images.length > this.hooperSettings.itemsToShow;
    },
    navReachedSlideAmount() {
      return this.images.length > this.hooperSettingsNav.itemsToShow;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Slide to specific image
    // @arg index (Number)
    slideToIndex(index) {
      this.$refs.gallery.slideTo(index);
    },
    // @vuese
    // Slide nav images
    // @arg payload (Object)
    slideNav(payload) {
      if (this.$refs.nav && this.navReachedSlideAmount)
        this.$refs.nav.slideTo(payload.currentSlide);
    },
    // @vuese
    // Slide gallery images
    // @arg payload (Object)
    slideGallery(payload) {
      if (this.$refs.gallery && this.galleryReachedSlideAmount)
        this.$refs.gallery.slideTo(payload.currentSlide);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-product-gallery';
</style>
