<template>
  <component
    :is="currentWidget"
    class="ca-widget"
    :configuration="confObj"
    :image-sizes="imageSizes"
    :image-ratios="imageRatios"
    :is-first="isFirst"
  />
</template>
<script>
import MixWidgetType from 'MixWidgetType';
// @group Molecules
// @vuese
// Shell for displaying widget component based on type<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget.scss_
export default {
  name: 'CaWidget',
  mixins: [MixWidgetType],
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
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    widgetAreaVariables: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    confObj() {
      const config = JSON.parse(this.configuration);
      return Object.assign(config, this.widgetAreaVariables);
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
