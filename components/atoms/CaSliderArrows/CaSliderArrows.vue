<template>
  <div v-if="visible" class="ca-slider-arrows">
    <CaIconButton
      class="ca-slider-arrows__arrow ca-slider-arrows__arrow--left"
      aria-label="Arrow left"
      :class="{ 'ca-slider-arrows__arrow--disabled': minReached }"
      :icon-name="iconName + '-left'"
      @clicked="$emit('prevSlide')"
    />
    <CaIconButton
      class="ca-slider-arrows__arrow ca-slider-arrows__arrow--right"
      aria-label="Arrow right"
      :class="{ 'ca-slider-arrows__arrow--disabled': maxReached }"
      :icon-name="iconName + '-right'"
      @clicked="$emit('nextSlide')"
    />
  </div>
</template>
<script>
import CaIconButton from 'CaIconButton';
// @group Atoms
// @vuese
// Slider arrows for CaSlider<br><br>
// **SASS-path:** _./styles/components/atoms/ca-slider-arrows.scss_
export default {
  name: 'CaSliderArrows',
  components: { CaIconButton },
  mixins: [],
  props: {
    // First part of icon name for the arrows. Will add '-left', '-right', '-up' or '-down' as fitting
    iconName: {
      type: String,
      required: true
    },
    // If minumum index of the slider is reached
    minReached: {
      type: Boolean,
      required: true
    },
    // If maximum index of the slider is reached
    maxReached: {
      type: Boolean,
      required: true
    },
    // Show arrows?
    visible: {
      type: Boolean,
      default: false
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
@import 'atoms/ca-slider-arrows';
</style>
