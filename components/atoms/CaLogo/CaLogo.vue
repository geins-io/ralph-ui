<template>
  <img
    v-if="filename"
    class="ca-logo"
    :src="filename"
    :alt="alt"
    width="300"
    height="50"
  />
</template>
<script>
// @group Atoms
// This component displays a svg or png logo<br><br>
// **SASS-path:** _./styles/components/atoms/ca-logo.scss_
export default {
  name: 'CaLogo',
  mixins: [],
  props: {
    // Filetype of the logo
    filetype: {
      // 'svg', 'png'
      type: String,
      default: 'svg',
      validator(value) {
        return ['svg', 'png'].includes(value);
      },
    },
    // The alt-text for the logo
    alt: {
      type: String,
      required: true,
    },
    // Header theme
    theme: {
      type: String,
      default: 'light',
    },
  },
  data: () => ({}),
  computed: {
    filename() {
      let logoName = 'logo';
      if (this.theme === 'dark') {
        logoName = 'logo-theme-dark';
      }
      return require('~/assets/' + logoName + '.' + this.filetype);
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-logo';
</style>
