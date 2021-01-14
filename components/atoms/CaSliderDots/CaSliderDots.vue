<template>
  <ul v-if="visible" class="ca-slider-dots">
    <li
      v-for="(slide, index) in slides"
      :key="index"
      class="ca-slider-dots__dot"
    >
      <button
        v-if="index % slidesToScroll === 0"
        class="ca-slider-dots__trigger"
        :class="getCurrentClass(index)"
        @click="$emit('navigation', index)"
      ></button>
    </li>
  </ul>
</template>
<script>
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-slider-dots.scss_
export default {
  name: 'CaSliderDots',
  components: {},
  mixins: [],
  props: {
    // Array of the corresponding slides
    slides: {
      type: Array,
      required: true
    },
    // Should dots be visible?
    visible: {
      type: Boolean,
      default: false
    },
    // Current slide index
    currentSlide: {
      type: Number,
      required: true
    },
    // Number of slides per dot
    slidesToScroll: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Returns current class to dot if that slide is active
    // @arg index (Number)
    getCurrentClass(index) {
      return Math.ceil(this.currentSlide / this.slidesToScroll) %
        Math.ceil(this.slides.length / this.slidesToScroll) ===
        Math.ceil(index / this.slidesToScroll)
        ? 'ca-slider-dots__trigger--current'
        : '';
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-slider-dots';
</style>
