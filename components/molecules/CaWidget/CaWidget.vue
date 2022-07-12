<template>
  <component
    :is="currentWidget"
    class="ca-widget"
    :configuration="confObj"
    :image-sizes="imageSizes"
    :image-ratios="imageRatios"
  >
  </component>
</template>
<script>
// @group Molecules
// @vuese
// Shell for displaying widget component based on type<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget.scss_
export default {
  name: 'CaWidget',
  mixins: [],
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
      } else if (
        this.type === 'Nosto feed' &&
        this.$store.getters['nosto/isNostoActive'] &&
        this.$config.nostoAccountAppsKey
      ) {
        return 'CaNostoSection';
      } else if (this.type === 'HTML') {
        return 'CaWidgetHtml';
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
