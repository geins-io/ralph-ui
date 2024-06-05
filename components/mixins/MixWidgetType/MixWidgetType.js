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
        this.$config.public.widgetRenderTypesComponents &&
        this.$config.public.widgetRenderTypesComponents[this.type]
      ) {
        return this.$config.public.widgetRenderTypesComponents[this.type];
      } else if (this.type === 'Image') {
        return 'CaWidgetImage';
      } else if (this.type === 'Text') {
        return 'CaWidgetText';
      } else if (this.type === 'Buttons') {
        return 'CaWidgetButtons';
      } else if (this.type === 'Product list') {
        return 'CaWidgetProductList';
      } else if (this.type === 'Banner') {
        return 'CaWidgetBanner';
      } else if (this.type === 'Video') {
        return 'CaWidgetVideo';
      } else if (this.type === 'HTML') {
        return 'CaWidgetHtml';
      } else if (this.type === 'JSON') {
        return 'CaWidgetJson';
      } else if (this.type === 'Rich text') {
        return 'CaWidgetRichText';
      } else if (this.type === 'Flowbox') {
        return 'CaWidgetFlowbox';
      } else {
        return '';
      }
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
