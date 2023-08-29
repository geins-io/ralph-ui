<template>
  <div
    class="ca-slide"
    :class="modifiers"
    @pointerdown="gestureStart"
    @pointermove="gestureMove"
    @pointerup="gestureEnd"
    @pointercancel="gestureCancel"
  >
    <slot />
  </div>
</template>
<script>
// @group Atoms
// @vuese
// A slide of CaSlider<br><br>
// **SASS-path:** _./styles/components/atoms/ca-slide.scss_
export default {
  name: 'CaSlide',
  mixins: [],
  props: {
    // Order index of the slide
    slideIndex: {
      type: Number,
      required: true,
    },
    // SlideMeta sent from Slider component containeng currentSlide index
    slideMeta: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    tracking: false,
    start: {
      x: 0,
      t: 0,
    },
    end: {
      x: 0,
    },
    flickThresholdDistance: 10,
    flickThresholdTime: 300,
  }),
  computed: {
    isCurrentSlide() {
      return this.slideMeta.currentSlide !== undefined
        ? this.slideIndex === this.slideMeta.currentSlide
        : false;
    },
    modifiers() {
      return {
        'ca-slide--current': this.isCurrentSlide,
      };
    },
  },
  watch: {},
  mounted() {},
  methods: {
    gestureStart(e) {
      if (e.button === 0 && e.buttons === 1) {
        this.tracking = true;
        this.start.t = e.timeStamp;
        this.start.x = e.clientX;
        this.end.x = e.clientX;
      }
    },
    gestureMove(e) {
      if (this.tracking) {
        this.end.x = e.clientX;
      }
    },
    gestureEnd(e) {
      if (this.tracking) {
        const now = e.timeStamp;
        const deltaTime = now - this.start.t;
        const deltaX = this.end.x - this.start.x;
        const flick = deltaTime < this.flickThresholdTime;
        if (flick && Math.abs(deltaX) < this.flickThresholdDistance) {
          this.$emit('clicked');
        }
        this.tracking = false;
      }
    },
    gestureCancel() {
      this.tracking = false;
    },
  },
};
</script>
<style lang="scss">
@import 'atoms/ca-slide';
</style>
