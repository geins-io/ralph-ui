<template>
  <div class="ca-image">
    <img
      v-show="loaded"
      class="ca-image__img"
      :src="imageUrl"
      @load="loadedAction"
    />
    <img
      v-if="!loaded && type === 'product'"
      class="ca-image__img"
      :src="placeholder"
    />
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Display an image in a specific size<br><br>
// **SASS-path:** _./styles/components/atoms/ca-image.scss_
export default {
  name: 'CaImage',
  components: {},
  mixins: [],
  props: {
    // The size of the image. Defined as '200w', '500x200' or '300f300'
    size: {
      type: String,
      required: true
    },
    // The filename part of the image path
    filename: {
      type: String,
      required: true
    },
    // Type of image, also name of the folder in the image path
    type: {
      type: String,
      required: true
    },
    // This will be displayed until real image is loaded
    placeholder: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    loaded: false
  }),
  computed: {
    imageUrl() {
      return (
        process.env.IMAGE_SERVER +
        '/' +
        this.type +
        '/' +
        this.size +
        '/' +
        this.filename
      );
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Action for when image is loaded
    loadedAction() {
      this.loaded = true;
      // When image is loaded
      this.$emit('loaded');
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-image';
</style>
