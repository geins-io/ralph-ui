import MixMetaReplacement from 'MixMetaReplacement';
import listPageInfoQuery from 'productlist/list-page.graphql';

// @group Mixins
// @vuese
// **Data:**<br>
// exampleVariable: `1`<br>
export default {
  name: 'MixListInfo',
  mixins: [MixMetaReplacement],
  async asyncData({ error, store, app, redirect, req }) {
    const currentPath = decodeURI(store.state.currentPath);

    let currentAlias = null;
    let aliasName = '';

    // Support for old /c/ , /b/ and /dc/ routing
    if (
      req?.params?.category ||
      req?.params?.brand ||
      req?.params?.discountCampaign
    ) {
      currentAlias =
        req.params.category || req.params.brand || req.params.discountCampaign;
      let type = '';
      switch (req.params) {
        case req.params.category:
          type = 'category';
          break;
        case req.params.brand:
          type = 'brand';
          break;
        case req.params.discountCampaign:
          type = 'discountCampaign';
          break;
      }
      aliasName = type + 'Alias';
    }

    try {
      const client = app.apolloProvider.defaultClient;
      let listPageInfo = null;
      const variables = currentAlias
        ? { [aliasName]: currentAlias }
        : { url: currentPath };

      await client
        .query({
          query: listPageInfoQuery,
          variables,
          fetchPolicy: 'no-cache'
        })
        .then(result => {
          listPageInfo = result?.data?.listPageInfo;
          if (!listPageInfo || listPageInfo.id === 0) {
            error({
              statusCode: 404,
              message: 'Page not found',
              url: currentPath
            });
            return;
          }
          if (req && listPageInfo.canonicalUrl !== currentPath) {
            redirect({
              path: listPageInfo.canonicalUrl,
              query: req.query
            });
          }
          store.dispatch('loading/end');
        })
        .catch(err => {
          error({ statusCode: err.statusCode, message: err });
        });

      return { listInfo: listPageInfo };
    } catch (err) {
      // Handle any errors, such as network issues or API failures
      error(err);
    }
  },
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
  head() {
    return {
      title: this.metaReplacement(this.listInfo?.meta?.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaReplacement(this.listInfo?.meta?.description)
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.metaReplacement(this.listInfo?.meta?.title)
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.metaReplacement(this.listInfo?.meta?.description)
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            this.listInfo?.primaryImage ||
            this.$config.baseUrl + '/meta-image-fallback.jpg'
        }
      ]
    };
  }
};
