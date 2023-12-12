import MixMetaReplacement from 'MixMetaReplacement';
// @group Mixins
// @vuese
// The functionality for the content page<br><br>
// **Data:**<br>
// meta: `undefined`<br>
// hasMenu: `false`<br>
export default {
  name: 'MixContentPage',
  mixins: [MixMetaReplacement],
  props: {},
  data: () => ({
    meta: undefined,
    hasMenu: false,
  }),
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
  methods: {
    // @vuese
    // Callback for when CMS data is fetched
    // @arg data (Object)
    onDataFetched(data) {
      if (
        (data?.widgetArea === null || data?.widgetArea === undefined) &&
        !process.server
      ) {
        if (this.$nuxt.$route.path !== '/404') {
          this.$store.dispatch('redirect404');
        }
      }
      this.meta = data?.widgetArea?.meta;
      this.hasMenu = data?.widgetArea?.tags.includes('menu');
      this.$store.dispatch('loading/end');
    },
  },
};
