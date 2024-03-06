<template>
  <div class="ca-skeleton" :class="modifiers" :style="styles" />
</template>
<script>
// @group Atoms
// @vuese
// Used to simulate content while content is loading<br><br>
// **SASS-path:** _./styles/components/atoms/ca-skeleton.scss_
export default {
  name: 'CaSkeleton',
  mixins: [],
  props: {
    // Height / Width
    ratio: {
      type: Number,
      default: null,
    },
    // Should corners be rounded?
    radius: {
      type: Boolean,
      default: true,
    },
    // Width of skeleton
    width: {
      type: String,
      default: '100%',
    },
    // Height of skeleton
    height: {
      type: String,
      default: '1.4em',
    },
    // Be transparent
    transparent: {
      type: Boolean,
      default: false,
    },
    // By default, a skeleton placed after another skeleton has a top margin. This can be disabled by setting this prop to false
    marginTop: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({}),
  computed: {
    ratioPadding() {
      return Math.round((this.ratio + Number.EPSILON) * 100) + '%';
    },
    modifiers() {
      return {
        'ca-skeleton--radius': this.radius,
        'ca-skeleton--transparent': this.transparent,
        'ca-skeleton--margin-top': this.marginTop,
      };
    },
    styles() {
      const stylesObj = {};
      stylesObj.width = this.width;
      stylesObj.height = this.height;
      if (this.ratio) {
        stylesObj.padding = '0 0 ' + this.ratioPadding;
      }
      return stylesObj;
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-skeleton';
</style>
