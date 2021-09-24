<template>
  <div class="ca-image" :class="modifiers">
    <CaSkeleton
      v-if="forceRatio"
      class="ca-image__skeleton"
      :ratio="ratio"
      :radius="false"
    />
    <transition v-else name="fade">
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
// @group Atoms
// @vuese
// Display an image in a specific size<br><br>
// **SASS-path:** _./styles/components/atoms/ca-image.scss_
export default {
  name: 'CaImage',
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
    // Force the image to keep supplied ratio
    forceRatio: {
      type: Boolean,
      default: false
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
    encodedFilename() {
      return encodeURIComponent(this.filename);
    },
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
            this.encodedFilename;
    },
    imgSrcset() {
      if (this.sizeArray.length === 0 && this.src !== '') {
        return this.src + ' 1x';
      }
      const array = this.sizeArray?.length
        ? this.sizeArray
        : this.$config.imageSizes[this.type];
      const srcset = array.map(item => {
        const src =
          this.$config.imageServer +
          '/' +
          this.type +
          '/' +
          item.folder +
          '/' +
          this.encodedFilename;
        return src + ' ' + item.descriptor;
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
        'ca-image--loaded': this.loaded && !this.forceRatio,
        'ca-image--force-ratio': this.forceRatio
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
