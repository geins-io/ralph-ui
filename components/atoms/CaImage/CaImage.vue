<template>
  <div class="ca-image" :class="modifiers">
    <div v-if="bannerImage && !isDesc" class="ca-image__img-wrapper">
      <div
        class="ca-image__img ca-image__img--background"
        :style="{
          'background-image': `url(${imgSrcHighQuality})`,
          'padding-bottom': `${100 * ratio}%`,
          'background-size': 'cover'
        }"
      ></div>
    </div>
    <div v-else>
      <CaSkeleton
        v-if="forceRatio"
        class="ca-image__skeleton"
        :ratio="ratio"
        :radius="false"
        :transparent="loaded"
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
        v-if="imgSrc"
        fetchpriority="high"
        class="ca-image__img"
        :src="imgSrc"
        :alt="alt"
        :loading="loading"
        :style="loadingStyles"
        :srcset="imgSrcset"
        :sizes="sizes"
        width="248"
        height="248"
        @load="loadedAction"
      />
    </div>
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
    },
    // Image will displayd in background
    bannerImage: {
      type: Boolean,
      default: false
    },
    // Set srcet for image
    srcset: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    bgSize() {
      return this.isDesc ? 'initial' : 'cover';
    },
    isDesc() {
      return this.$store.getters.viewport !== 'phone';
    },
    encodedFilename() {
      return encodeURIComponent(this.filename);
    },
    imgSrc() {
      return this.src !== '' ? this.src : this.getSrc(0);
    },
    imgSrcHighQuality() {
      const imgSrcsetArray = this.imgSrcset.split(',');
      let mostBiggestResolution = '0';
      let imgIndex = 0;

      imgSrcsetArray.forEach((item, index) => {
        const parsedValue = parseInt(item.split(' ')[1]);

        if (this.isDesc) {
          if (mostBiggestResolution < parsedValue) {
            mostBiggestResolution = parsedValue;
            imgIndex = index;
          }
        } else if (
          String(parsedValue).length === 3 &&
          ['5', '6'].includes(String(parsedValue)[0])
        ) {
          mostBiggestResolution = parsedValue;
          imgIndex = index;
        }
      });

      return imgSrcsetArray[imgIndex] && imgSrcsetArray[imgIndex].split(' ')[0];
    },
    imgSrcset() {
      if (this.sizeArray.length === 0 && this.src !== '') {
        return this.srcset ? this.srcset : this.src + ' 1x';
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
        style = 'visibility: hidden; height: 0; padding:0;';
      }
      return style;
    },
    modifiers() {
      return {
        'ca-image--loaded': this.loaded && !this.forceRatio,
        'ca-image--force-ratio': this.forceRatio,
        'ca-image--product': this.type === 'product'
      };
    }
  },
  watch: {},
  mounted() {
    this.loadedAction();
  },
  methods: {
    // @vuese
    // Action for when image is loaded
    loadedAction() {
      this.loaded = true;
      // When image is loaded
      this.$emit('loaded');
    },

    getSrc(qualityIndex) {
      return (
        this.$config.imageServer +
        '/' +
        this.type +
        '/' +
        (this.sizeArray?.[qualityIndex]?.folder ??
          this.$config.imageSizes?.[this.type]?.[qualityIndex]?.folder) +
        '/' +
        this.encodedFilename
      );
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-image';
</style>
