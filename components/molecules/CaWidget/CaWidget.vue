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
import CaWidgetText from '../../molecules/CaWidgetText/CaWidgetText.vue';
import CaWidgetImage from '../../molecules/CaWidgetImage/CaWidgetImage.vue';
import CaWidgetProductList from '../../molecules/CaWidgetProductList/CaWidgetProductList.vue';
// @group Molecules
// @vuese
export default {
  name: 'CaWidget',
  components: { CaWidgetImage, CaWidgetText, CaWidgetProductList },
  mixins: [],
  props: {
    configuration: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    size: {
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
