<template>
  <span
    class="ca-flag"
    :class="modifiers"
    :style="'background-image:url(' + flagImage + ');'"
  />
</template>
<script>
// @group Atoms
// This component can display a flag based on the [ISO 3166-1-alpha-2 code](https://www.iso.org/obp/ui/#search/code/) for the country.<br><br> Takes flags from the static folder of the main project. Build for, and recommend using with, flags from [flag-icon-css] (https://github.com/lipis/flag-icon-css)
// **SASS-path:** _./styles/components/atoms/ca-flag.scss_
export default {
  name: 'CaFlag',
  mixins: [],
  props: {
    // The [ISO 3166-1-alpha-2 code](https://www.iso.org/obp/ui/#search/code/) for the country
    country: {
      type: String,
      required: true,
    },
    // Set the flags shape
    shape: {
      // 'default', 'square', 'circle'
      type: String,
      required: false,
      default: 'default',
      validator(value) {
        return ['default', 'square', 'circle'].includes(value);
      },
    },
  },
  data: () => ({}),
  computed: {
    squared() {
      return this.shape === 'square' || this.shape === 'circle';
    },
    modifiers() {
      return {
        'ca-flag--square': this.squared,
        'ca-flag--circle': this.shape === 'circle',
      };
    },
    flagImage() {
      const sizeFolder = this.squared ? '1x1' : '4x3';
      const fileName = this.country.toLowerCase() + '.svg';
      return '/flags/' + sizeFolder + '/' + fileName;
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-flag';
</style>
