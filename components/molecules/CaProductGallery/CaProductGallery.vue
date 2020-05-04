<template>
  <div class="ca-product-gallery">
    <Hooper
      v-if="images.length > 0 && imageLoaded"
      ref="navSlider"
      class="ca-product-gallery__nav only-desktop"
      :settings="hooperSettingsNav"
    >
      <Slide
        v-for="(image, index) in images"
        :key="index"
        class="ca-product-gallery__nav-slide"
      >
        <img class="ca-product-gallery__nav-image" :src="image" />
      </Slide>
      <HooperNavigation slot="hooper-addons"></HooperNavigation>
    </Hooper>
    <Hooper
      v-if="images.length > 0"
      ref="slider"
      class="ca-product-gallery__slider"
      :settings="hooperSettings"
    >
      <Slide
        v-for="(image, index) in images"
        :key="index"
        class="ca-product-gallery__slide"
      >
        <img
          class="ca-product-gallery__image"
          :src="image"
          @load="() => (imageLoaded = true)"
        />
      </Slide>
      <HooperPagination slot="hooper-addons"></HooperPagination>
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
// @group Molecules
// The product page gallery
export default {
  name: 'CaProductGallery',
  components: { Hooper, Slide, HooperPagination, HooperNavigation },
  mixins: [],
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    imageLoaded: false,
    hooperSettings: {
      group: 'productGallery',
      itemsToShow: 1.4,
      centerMode: true,
      infiniteScroll: true,
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
      infiniteScroll: true,
      wheelControl: false
    }
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-product-gallery {
  margin: 0 -#{$default-spacing/2};
  @include bp(laptop) {
    margin: 0 0 $px20;
  }
  &__nav {
    height: auto;
    width: 13.74%;
    margin: -14px 0;
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
    }
    &.is-current {
      opacity: 1;
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
}
</style>
