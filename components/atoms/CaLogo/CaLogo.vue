<template>
  <img class="ca-logo" :src="filename" :alt="alt" />
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
      }
    },
    // The alt-text for the logo
    alt: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    filename() {
      return require('~/assets/logo.' + this.filetype);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-logo';
</style>
