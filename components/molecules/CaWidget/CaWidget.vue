<template>
  <component
    :is="currentWidget"
    class="ca-widget"
    :class="sizeClass"
    :configuration="confObj"
  >
  </component>
</template>
<script>
import CaWidgetText from 'CaWidgetText';
import CaWidgetImage from 'CaWidgetImage';
import CaWidgetProductList from 'CaWidgetProductList';
// @group Molecules
// @vuese
// Shell for displaying widget component based on type
export default {
  name: 'CaWidget',
  components: { CaWidgetImage, CaWidgetText, CaWidgetProductList },
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
    // Widget size
    size: {
      // 'full', 'half', 'third', 'fourth'
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    sizeClass() {
      return 'ca-widget--' + this.size;
    },
    confObj() {
      return JSON.parse(this.configuration);
    },
    currentWidget() {
      if (this.type === 'Image') {
        return CaWidgetImage;
      } else if (this.type === 'Text') {
        return CaWidgetText;
        // } else if (this.type === 'Product list') {
        //   return CaWidgetProductList;
      } else return '';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-widget {
  margin: $widget-spacing;
  width: 100%;
  @include bp(tablet) {
    margin: $widget-spacing-desktop;
    &--half {
      width: calc(100% / 2 - #{$widget-spacing-desktop * 2});
    }
    &--third {
      width: calc(100% / 3 - #{$widget-spacing-desktop * 2});
    }
    &--fourth {
      width: calc(100% / 4 - #{$widget-spacing-desktop * 2});
    }
  }
}
</style>
