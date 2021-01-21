<template>
  <div v-if="widgets" class="ca-widget-container" :class="layoutClass">
    <CaWidget
      v-for="(widget, index) in widgets"
      :key="index"
      :type="widget.name"
      :configuration="widget.configuration"
      :image-ratios="widget.images"
      :image-sizes="imageSizes"
    />
  </div>
</template>
<script>
// @group Molecules
// @vuese
// A container holding a set of widgets<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-container.scss_
export default {
  name: 'CaWidgetContainer',
  mixins: [],
  props: {
    // An array of widgets to be displayed in this container
    widgets: {
      type: Array,
      required: true
    },
    // The container layout
    layout: {
      type: String,
      required: true
    },
    // Sizes attribute for widget images. Set with widget size as key like so: `{full: '(min-width:1360px) 1320px, 96vw'}` etc. Defaults to $config.widgetImageSizes if not set
    widgetImageSizes: {
      type: Object,
      default: null
    }
  },
  data: () => ({}),
  computed: {
    layoutClass() {
      return 'ca-widget-container--' + this.layout;
    },
    imageSizes() {
      return this.widgetImageSizes
        ? this.widgetImageSizes[this.layout]
        : this.$config.widgetImageSizes[this.layout];
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-container';
</style>
