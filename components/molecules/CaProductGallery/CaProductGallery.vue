<template>
  <div class="ca-product-gallery">
    <Hooper
      v-if="images.length > 0 && imageLoaded"
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
            :placeholder="imagePlaceholder"
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
          :placeholder="imagePlaceholder"
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

import CaImage from '../../atoms/CaImage/CaImage.vue';
// @group Molecules
// The product page gallery
export default {
  name: 'CaProductGallery',
  components: { Hooper, Slide, HooperPagination, HooperNavigation, CaImage },
  mixins: [],
  props: {
    images: {
      type: Array,
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
    slideToIndex(index) {
      this.$refs.gallery.slideTo(index);
    },
    slideNav(payload) {
      if (this.$refs.nav && this.navReachedSlideAmount)
        this.$refs.nav.slideTo(payload.currentSlide);
    },
    slideGallery(payload) {
      if (this.$refs.gallery && this.galleryReachedSlideAmount)
        this.$refs.gallery.slideTo(payload.currentSlide);
    }
  }
};
</script>
<style lang="scss">
.ca-product-gallery {
  $block: &;
  margin: 0 -#{$default-spacing/2};
  overflow: hidden;
  @include bp(laptop) {
    margin: 0 0 $px20;
  }
  &__nav {
    height: auto;
    width: 13.74%;
    margin: -14px 0;
  }
  &__nav-image {
    cursor: pointer;
  }
  &__nav-slide {
    padding: 14px 0;
  }
  &__slider {
    height: auto;
    @include bp(laptop) {
      width: 80.15%;
    }
  }
  &__slide {
    padding: 0 $px4;
    opacity: 0.6;
    transition: opacity 200ms ease;
    @include bp(laptop) {
      padding: 0;
      opacity: 1;
    }
    &.is-current {
      opacity: 1;
    }
  }
}
.hooper-navigation {
  &.is-vertical {
    .hooper-prev,
    .hooper-next {
      width: 100%;
      padding: 0;
      height: 20px;
      background: $c-overlay;
      fill: $c-white;
      @include flex-calign;
      .icon {
        width: 20px;
      }
    }
    .hooper-prev {
      top: 14px;
    }
    .hooper-next {
      bottom: 14px;
    }
  }
}
.hooper-indicator {
  background: $c-light-gray;
}
</style>
