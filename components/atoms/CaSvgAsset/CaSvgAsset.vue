<template>
  <img class="ca-svg-asset" :src="src" :alt="alt" :loading="loading" />
</template>
<script>
// @group Atoms
// @vuese
// Display an svg-file from the assets folder<br><br>
// **SASS-path:** _./styles/components/atoms/ca-svg-asset.scss_
export default {
  name: 'CaSvgAsset',
  components: {},
  mixins: [],
  props: {
    // The name of the file (without '.svg')
    filename: {
      type: String,
      required: true
    },
    // The name of the assets folder
    folder: {
      type: String,
      required: true
    },
    // Human friendly describtion of the image
    alt: {
      type: String,
      required: true
    },
    loading: {
      type: String,
      default: 'lazy'
    }
  },
  data: () => ({}),
  computed: {
    src() {
      return require('~/assets/' + this.folder + '/' + this.filename + '.svg');
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-svg-asset';
</style>
