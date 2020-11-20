<template>
  <div class="ca-image" :class="modifiers">
    <transition name="fade">
      <CaSkeleton v-if="!loaded" class="ca-image__skeleton" :ratio="1 / 1" />
    </transition>
    <img
      v-show="loaded"
      class="ca-image__img"
      :src="imageUrl"
      :alt="alt"
      @load="loadedAction"
    />
  </div>
</template>
<script>
import CaSkeleton from 'CaSkeleton';
// @group Atoms
// @vuese
// Display an image in a specific size<br><br>
// **SASS-path:** _./styles/components/atoms/ca-image.scss_
export default {
  name: 'CaImage',
  components: { CaSkeleton },
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
    },
    // A human friendly description of the image, for screen readers and SEO
    alt: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loaded: false
  }),
  computed: {
    imageUrl() {
      return (
        this.$config.imageServer +
        '/' +
        this.type +
        '/' +
        this.size +
        '/' +
        this.filename
      );
    },
    modifiers() {
      return {
        'ca-image--loaded': this.loaded
      };
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
