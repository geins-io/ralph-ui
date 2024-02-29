import MixMetaReplacement from 'MixMetaReplacement';
import widgetAreaQuery from 'global/widget-area.graphql';
// @group Mixins
// @vuese
// The functionality for the content page<br><br>
export default {
  name: 'MixContentPage',
  mixins: [MixMetaReplacement],
  async asyncData({ app, store, params, error }) {
    try {
      const currentPath = decodeURI(store.state.currentPath);
      const alias = decodeURI(params.alias?.split('/').pop()) || '';
      const displaySetting =
        store.getters.viewport === 'phone' ? 'mobile' : 'desktop';
      let widgetData = null;
      let hasMenu = false;
      let meta = null;

      const variables = {
        widgetAlias: alias,
        displaySetting,
        customerType: store.state.customerType,
      };
      const callback = (result) => {
        widgetData = result?.data?.widgetArea;
        if (!widgetData) {
          app.$error404(currentPath);
          return;
        }
        hasMenu = widgetData.tags.includes('menu');
        meta = widgetData.meta;
        store.dispatch('loading/end');
      };

      await app.$fetchData(widgetAreaQuery, callback, variables);

      return { widgetData, hasMenu, meta };
    } catch (err) {
      error({ statusCode: err.statusCode, message: err });
    }
  },
  props: {},
  data: () => ({}),
  head() {
    return {
      title: this.metaReplacement(this.meta?.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaReplacement(this.meta?.description),
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.metaReplacement(this.meta?.title),
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.metaReplacement(this.meta?.description),
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.$config.baseUrl + '/meta-image-fallback.jpg',
        },
      ],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
