<template>
  <div class="ca-product-gallery">
    <Hooper
      v-if="images.length > 0"
      class="ca-product-gallery__slider"
      :center-mode="true"
      :items-to-show="1.25"
      :infinite-scroll="true"
      :wheel-control="false"
    >
      <Slide
        v-for="(image, index) in images"
        :key="index"
        class="ca-product-gallery__slide"
      >
        <img class="ca-product-galler__image" :src="image" />
      </Slide>
      <HooperPagination slot="hooper-addons"></HooperPagination>
    </Hooper>
  </div>
</template>
<script>
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';
// @group Molecules
// The product page gallery
export default {
  name: 'CaProductGallery',
  components: { Hooper, Slide, HooperPagination },
  mixins: [],
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-product-gallery {
  margin: 0 -#{$default-spacing/2};
  &__slider {
    height: auto;
  }
  &__slide {
    padding: 0 $px4;
  }
}
</style>
