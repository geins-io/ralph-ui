<template>
  <div class="ca-logo">
    <img class="ca-logo__img" :src="filename" />
  </div>
</template>
<script>
// @group Atoms
// This component displays a svg or png logo
export default {
  name: 'CaLogo',
  components: {},
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
<style lang="scss"></style>
