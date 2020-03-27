<template>
  <span
    class="ca-flag"
    :class="modifiers"
    :style="'background-image:url(' + flagImage + ');'"
  ></span>
</template>
<script>
// @group Atoms
// This component can display a flag based on the [ISO 3166-1-alpha-2 code](https://www.iso.org/obp/ui/#search/code/) for the country.
export default {
  name: 'CaFlag',
  components: {},
  mixins: [],
  props: {
    // The [ISO 3166-1-alpha-2 code](https://www.iso.org/obp/ui/#search/code/) for the country
    country: {
      type: String,
      required: true
    },
    // Set the flags shape
    shape: {
      // 'default', 'square', 'circle'
      type: String,
      required: false,
      default: 'default',
      validator(value) {
        return ['default', 'square', 'circle'].includes(value);
      }
    }
  },
  data: () => ({}),
  computed: {
    squared() {
      return this.shape === 'square' || this.shape === 'circle';
    },
    modifiers() {
      return {
        'ca-flag--square': this.squared,
        'ca-flag--circle': this.shape === 'circle'
      };
    },
    flagImage() {
      const sizeFolder = this.squared ? '1x1' : '4x3';
      const fileName = this.country.toLowerCase() + '.svg';
      return require('flag-icon-css/flags/' + sizeFolder + '/' + fileName);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-flag {
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  position: relative;
  display: inline-block;
  width: 1.33333333em;
  line-height: 1em;
  &:before {
    content: '\00a0';
  }
  &--square {
    width: 1em;
  }
  &--circle {
    border-radius: 50%;
  }
}
</style>
