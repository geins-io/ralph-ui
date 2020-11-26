<template>
  <ul v-if="visible" class="ca-slider-dots">
    <li
      v-for="(slide, index) in slides"
      :key="index"
      class="ca-slider-dots__dot"
    >
      <button
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
    slides: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    currentSlide: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getCurrentClass(index) {
      return this.currentSlide % this.slides.length === index
        ? 'ca-slider-dots__trigger--current'
        : '';
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-slider-dots';
</style>
