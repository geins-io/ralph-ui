import MixMetaReplacement from 'MixMetaReplacement';
import listPageInfoQuery from 'productlist/list-page.graphql';

// @group Mixins
// @vuese
// **Data:**<br>
// exampleVariable: `1`<br>
export default {
  name: 'MixListInfo',
  mixins: [MixMetaReplacement],
  async asyncData(ctx) {
    const { app, store, error } = ctx;
    const currentPath = decodeURI(store.state.currentPath);

    try {
      let listPageInfo = null;
      const variables = { url: currentPath };

      await app.$fetchData(ctx, listPageInfoQuery, variables, (result) => {
        listPageInfo = result?.data?.listPageInfo;
        if (!listPageInfo || listPageInfo.id === 0) {
          app.$error404(ctx, currentPath);
          return;
        }
        if (listPageInfo.canonicalUrl !== currentPath) {
          app.$redirectToCanonical(ctx, listPageInfo.canonicalUrl);
        }
        store.dispatch('loading/end');
      });

      return { listInfo: listPageInfo };
    } catch (err) {
      // Handle any errors, such as network issues or API failures
      error(err);
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
