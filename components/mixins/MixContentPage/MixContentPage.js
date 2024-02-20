import MixMetaReplacement from 'MixMetaReplacement';
import widgetAreaQuery from 'global/widget-area.graphql';
// @group Mixins
// @vuese
// The functionality for the content page<br><br>
export default {
  name: 'MixContentPage',
  mixins: [MixMetaReplacement],
  async asyncData({ error, store, app, redirect, req, params }) {
    const currentPath = decodeURI(store.state.currentPath);
    const alias = decodeURI(params.alias?.split('/').pop()) || '';
    const displaySetting =
      store.getters.viewport === 'phone' ? 'mobile' : 'desktop';

    const variables = {
      widgetAlias: alias,
      displaySetting,
      customerType: store.state.customerType,
    };

    try {
      const client = app.apolloProvider.defaultClient;
      let widgetData = null;
      let hasMenu = false;
      let meta = null;

      await client
        .query({
          query: widgetAreaQuery,
          variables,
        })
        .then((result) => {
          widgetData = result?.data?.widgetArea;
          if (!widgetData) {
            error({
              statusCode: 404,
              message: 'Page not found',
              url: currentPath,
            });
            return;
          }
          hasMenu = widgetData.tags.includes('menu');
          meta = widgetData.meta;
          store.dispatch('loading/end');
        })
        .catch((err) => {
          error({ statusCode: err.statusCode, message: err });
        });

      return { widgetData, hasMenu, meta };
    } catch (err) {
      // Handle any errors, such as network issues or API failures
      error(err);
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
