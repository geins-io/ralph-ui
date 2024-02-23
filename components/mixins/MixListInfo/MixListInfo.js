import MixMetaReplacement from 'MixMetaReplacement';
import listPageInfoQuery from 'productlist/list-page.graphql';

// @group Mixins
// @vuese
// **Data:**<br>
// exampleVariable: `1`<br>
export default {
  name: 'MixListInfo',
  mixins: [MixMetaReplacement],
  async asyncData({ app, store, error, req }) {
    try {
      const currentPath = decodeURI(store.state.currentPath);
      let listPageInfo = null;

      const variables = { url: currentPath };
      const callback = (result) => {
        listPageInfo = result?.data?.listPageInfo;
        if (!listPageInfo || listPageInfo.id === 0) {
          app.$error404(currentPath);
          return;
        }
        if (listPageInfo.canonicalUrl !== currentPath) {
          app.$redirectToCanonical(listPageInfo.canonicalUrl, req?.query);
        }
        store.dispatch('loading/end');
      };

      await app.$fetchData(listPageInfoQuery, callback, variables);

      return { listInfo: listPageInfo };
    } catch (err) {
      error({ statusCode: err.statusCode, message: err });
    }
  },
  props: {},
  head() {
    return {
      title: this.metaReplacement(this.listInfo?.meta?.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaReplacement(this.listInfo?.meta?.description),
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.metaReplacement(this.listInfo?.meta?.title),
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.metaReplacement(this.listInfo?.meta?.description),
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            this.listInfo?.primaryImage ||
            this.$config.baseUrl + '/meta-image-fallback.jpg',
        },
      ],
    };
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
