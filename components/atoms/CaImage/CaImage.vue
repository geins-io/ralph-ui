<template>
  <div class="ca-image" :class="modifiers">
    <transition name="fade">
      <CaSkeleton
        v-if="!loaded"
        class="ca-image__skeleton"
        :ratio="ratio"
        :radius="false"
      />
    </transition>
    <img
      class="ca-image__img"
      :src="imgSrc"
      :alt="alt"
      :loading="loading"
      :style="loadingStyles"
      :srcset="imgSrcset"
      :sizes="sizes"
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
    // The Array of Objects with image sizes for the image. E.g [{folder: '100x100', descriptor: '100w'}}
    sizeArray: {
      type: Array,
      default: () => []
    },
    // The sizes string
    sizes: {
      type: String,
      default: ''
    },
    // The filename part of the image path
    filename: {
      type: String,
      default: ''
    },
    // Type of image, also name of the folder in the image path
    type: {
      type: String,
      default: ''
    },
    // A human friendly description of the image, for screen readers and SEO
    alt: {
      type: String,
      required: true
    },
    // The ratio of the image, height / width
    ratio: {
      type: Number,
      required: true
    },
    // Direct link to image if not from image service
    src: {
      type: String,
      default: ''
    },
    // Value for the loading attribute
    loading: {
      type: String,
      default: 'lazy'
    }
  },
  data: () => ({
    loaded: false
  }),
  computed: {
    imgSrc() {
      return this.src !== ''
        ? this.src
        : this.$config.imageServer +
            '/' +
            this.type +
            '/' +
            (this.sizeArray?.[0]?.folder ??
              this.$config.imageSizes?.[this.type]?.[0]?.folder) +
            '/' +
            this.filename;
    },
    imgSrcset() {
      if (this.sizeArray.length === 0 && this.src !== '') return '';
      const array = this.sizeArray?.length
        ? this.sizeArray
        : this.$config.imageSizes[this.type];
      const srcset = array.map(x => {
        const src =
          this.$config.imageServer +
          '/' +
          this.type +
          '/' +
          x.folder +
          '/' +
          this.filename;
        return src + ' ' + x.descriptor;
      });
      return srcset.toString();
    },
    loadingStyles() {
      // Instead of v-show, because display none never initializes the loading of the image
      let style = '';
      if (!this.loaded) {
        style = 'visibility: hidden; height: 0;';
      }
      return style;
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
