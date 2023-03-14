// @group Mixins
// @vuese
// Override this mixin to extend the widget types with your own
export default {
  name: 'CaWidgetType',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
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
      } else if (this.type === 'Flowbox') {
        return 'CaWidgetFlowbox';
      } else if (this.type === 'Category puffs') {
        return 'CaWidgetCategoryPuffs';
      } else if (this.type === 'Text on image') {
        return 'CaWidgetTextOnImage';
      } else if (this.type === 'Image map') {
        return 'CaWidgetImageMap';
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
