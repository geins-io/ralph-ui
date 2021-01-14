<template>
  <div class="ca-slide" :class="modifiers">
    <slot></slot>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// A slide of CaSlider<br><br>
// **SASS-path:** _./styles/components/atoms/ca-slide.scss_
export default {
  name: 'CaSlide',
  components: {},
  mixins: [],
  props: {
    // Order index of the slide
    slideIndex: {
      type: Number,
      required: true
    },
    // SlideMeta sent from Slider component containeng currentSlide index
    slideMeta: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    isCurrentSlide() {
      return this.slideMeta.currentSlide !== undefined
        ? this.slideIndex === this.slideMeta.currentSlide
        : false;
    },
    modifiers() {
      return {
        'ca-slide--current': this.isCurrentSlide
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-slide';
</style>
