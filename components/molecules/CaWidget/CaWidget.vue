<template>
  <LazyHydrate when-visible>
    <component
      :is="currentWidget"
      class="ca-widget"
      :configuration="confObj"
      :image-sizes="imageSizes"
      :image-ratios="imageRatios"
    >
    </component>
  </LazyHydrate>
</template>
<script>
import LazyHydrate from 'vue-lazy-hydration';
// @group Molecules
// @vuese
// Shell for displaying widget component based on type<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget.scss_
export default {
  name: 'CaWidget',
  components: {
    LazyHydrate
  },
  props: {
    // Configuration JSON object
    configuration: {
      type: String,
      required: true
    },
    // Type of widget
    type: {
      // 'Image', 'Text', 'Product list'
      type: String,
      required: true
    },
    // Sizes attribute for the widget image
    imageSizes: {
      type: String,
      required: true
    },
    imageRatios: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    confObj() {
      return JSON.parse(this.configuration);
    },
    currentWidget() {
      if (this.type === 'Image') {
        return 'CaWidgetImage';
      } else if (this.type === 'Text') {
        return 'CaWidgetText';
      } else if (this.type === 'Buttons') {
        return 'CaWidgetButtons';
      } else if (this.type === 'Product list') {
        return 'LazyCaWidgetProductList';
      } else if (this.type === 'Banner') {
        return 'CaWidgetBanner';
      } else if (this.type === 'Video') {
        return 'CaWidgetVideo';
      } else if (this.type === 'HTML') {
        return 'CaWidgetHtml';
      } else if (this.type === 'Rich text') {
        return 'CaWidgetRichText';
      } else if (
        this.type === 'Nosto feed' &&
        this.$store.getters['nosto/isNostoActive'] &&
        this.$config.nostoAccountId
      ) {
        return 'CaNostoSection';
      } else {
        return '';
      }
    }
  },
  watch: {},
  mounted() {
    this.$emit('widget-mounted');
  },
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-widget';
</style>
