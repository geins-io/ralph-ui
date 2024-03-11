// @group Mixins
// @vuese
// Override this mixin to extend the widget types with your own
export default {
  name: 'MixWidgetType',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    currentWidget() {
      // First check if the widget type is defined in the config
      if (
        this.$config.widgetRenderTypesComponents &&
        this.$config.widgetRenderTypesComponents[this.type]
      ) {
        return this.$config.widgetRenderTypesComponents[this.type];
      } else if (this.type === 'Image') {
        return 'LazyCaWidgetImage';
      } else if (this.type === 'Text') {
        return 'LazyCaWidgetText';
      } else if (this.type === 'Buttons') {
        return 'LazyCaWidgetButtons';
      } else if (this.type === 'Product list') {
        return 'LazyCaWidgetProductList';
      } else if (this.type === 'Banner') {
        return 'LazyCaWidgetBanner';
      } else if (this.type === 'Video') {
        return 'LazyCaWidgetVideo';
      } else if (this.type === 'HTML') {
        return 'LazyCaWidgetHtml';
      } else if (this.type === 'JSON') {
        return 'LazyCaWidgetJson';
      } else if (this.type === 'Rich text') {
        return 'LazyCaWidgetRichText';
      } else if (this.type === 'Flowbox') {
        return 'LazyCaWidgetFlowbox';
      } else {
        return '';
      }
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
