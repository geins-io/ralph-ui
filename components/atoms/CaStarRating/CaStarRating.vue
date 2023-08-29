<template>
  <div class="ca-star-rating">
    <template v-for="star of STARS_CONST">
      <a
        v-if="
          hoverPreviewStars ? hoverPreviewStars >= star : currentRate >= star
        "
        :key="'filled' + star"
        class="ca-star-rating__link"
        @click="saveRate(star)"
        @mouseover="previewStars(star)"
        @mouseleave="resetPreview()"
      >
        <CaIcon class="ca-star-rating__star" name="star-filled" />
      </a>
      <a
        v-else-if="currentRate === null || star > Math.round(currentRate)"
        :key="'outlined' + star"
        class="ca-star-rating__link"
        @click="saveRate(star)"
        @mouseover="previewStars(star)"
        @mouseleave="resetPreview()"
      >
        <CaIcon
          class="ca-star-rating__star--default-color"
          name="star-outlined"
        />
      </a>
      <CaIcon
        v-else
        :key="'half-filed' + star"
        class="ca-star-rating__star"
        name="star-half-filled"
      />
    </template>
    <p v-if="showCounter" class="ca-star-rating__counter">
      {{ (readOnly ? defaultRate : rate) || 0 }}
      <span> / </span>
      {{ STARS_CONST }}
    </p>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Star rating component. This component can be used either to display rate (in read-only mode) or let user to rate using stars from 1-5. Half-star rates only visible for read-only mode - as te summary of rates shows average value. <br><br>
// **SASS-path:** _./styles/components/atoms/ca-star-rating.scss_
export default {
  name: 'CaStarRating',
  mixins: [],
  props: {
    // @vuese
    // @type Number
    // default rate - stars will be displayed based on this value on read only mode
    defaultRate: {
      type: Number,
      default: null,
    },
    // @vuese
    // @type Boolean
    // indicator for read only mode - disable/enable preview mode for stars on hover and submitting a rate
    readOnly: {
      type: Boolean,
      default: true,
    },
    // @vuese
    // @type Boolean
    // indicator to show/hide numerical rate representation
    showCounter: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    hoverPreviewStars: null,
    STARS_CONST: 5,
    rate: null,
  }),
  computed: {
    // @vuese
    // @type Number
    // indicates current rate (number of picked or hovered stars)
    currentRate() {
      if (this.readOnly) {
        return this.defaultRate === null ? 0 : this.defaultRate;
      }
      return this.rate ? this.rate : this.hoverPreviewStars;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Reset preview number value - show already chosen rate or show default state (no rate)
    resetPreview() {
      this.hoverPreviewStars = null;
    },
    // @vuese
    // Reset preview number value - trigger visible preview on stars (here used on hover to show preview rate on stars)
    // @arg star (Number) - number of stars (rate) which is currently previewed (hover over)
    previewStars(star) {
      if (!this.rate) {
        return;
      }
      this.hoverPreviewStars = star;
    },
    // @vuese
    // (Vote) method to confirm the rate
    // @arg rate (Number) - picked rate by the user (turned off by read-only mode). Indicates how many stars user picked.
    saveRate(rate) {
      if (this.readOnly) {
        return;
      }
      this.rate = rate;
      this.hoverPreviewStars = null;
      this.$emit('getProductStarRate', rate);
    },
  },
};
</script>
<style lang="scss">
@import 'atoms/ca-star-rating';
</style>
