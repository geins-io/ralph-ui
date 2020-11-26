<template>
  <div class="ca-slide" :class="modifiers">
    <slot></slot>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-slide.scss_
export default {
  name: 'CaSlide',
  components: {},
  mixins: [],
  props: {
    slideIndex: {
      type: Number,
      required: true
    },
    slideMeta: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    isCurrentSlide() {
      if (
        this.slideIndex !== undefined &&
        this.slideMeta.currentSlide !== undefined
      ) {
        return this.slideIndex === this.slideMeta.currentSlide;
      } else {
        return false;
      }
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
