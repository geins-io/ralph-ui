<template>
  <CaContainer
    v-if="container.widgets"
    class="ca-widget-container ca-widget-container--outer"
    :design="outerContainerDesign"
    :class="outerClasses"
  >
    <CaWidget
      v-for="(widget, index) in container.widgets"
      :key="index"
      :type="widget.name"
      :configuration="widget.configuration"
      :image-ratios="widget.images"
      :image-sizes="imageSizes"
      :is-first="isFirst"
      :widget-area-variables="widgetAreaVariables"
      :fetch-products-on-server="fetchProductsOnServer"
    />
  </CaContainer>
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
    // The container data object
    container: {
      type: Object,
      required: true,
    },
    // Sizes attribute for widget images. Set with widget size as key like so: `{full: '(min-width:1360px) 1320px, 96vw'}` etc. Defaults to $config.public.widgetImageSizes if not set
    widgetImageSizes: {
      type: Object,
      default: null,
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
    widgetAreaVariables: {
      type: Object,
      required: true,
    },
    fetchProductsOnServer: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    outerClasses() {
      const arr = [];
      arr.push('ca-widget-container--design-' + this.container.design);
      if (!this.contained) {
        arr.push('ca-widget-container--' + this.container.layout);
      }
      return arr;
    },
    innerClasses() {
      const arr = [];
      if (this.contained) {
        arr.push('ca-widget-container--' + this.container.layout);
      }
      return arr;
    },
    outerContainerDesign() {
      return this.contained ? 'full-width' : this.container.design;
    },
    innerContainerDesign() {
      return this.contained ? 'default' : this.container.design;
    },
    imageSizes() {
      if (this.widgetImageSizes) {
        return this.widgetImageSizes[this.container.layout];
      } else {
        return this.container.design === 'full-width'
          ? this.$config.public.widgetImageSizesFullWidth[this.container.layout]
          : this.$config.public.widgetImageSizes[this.container.layout];
      }
    },
    contained() {
      return this.container.design.includes('contained');
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-container';
</style>
