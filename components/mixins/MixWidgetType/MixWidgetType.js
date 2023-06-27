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
      if(this.$config.widgetRenderTypesComponents && this.$config.widgetRenderTypesComponents[this.type]) {
        return this.$config.widgetRenderTypesComponents[this.type];
      } else if (this.type === 'Image') {
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
      } else if (this.type === 'JSON') {
        return 'CaWidgetJson';
      } else if (this.type === 'Rich text') {
        return 'CaWidgetRichText';
      } else if (this.type === 'Flowbox') {
        return 'CaWidgetFlowbox';
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
  mounted() {},
  methods: {}
};
