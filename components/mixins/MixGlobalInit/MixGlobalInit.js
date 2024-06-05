import categoriesQuery from 'global/categories.graphql';
import listPageInfoQuery from 'global/list-page-info.graphql';
import MixFetch from 'MixFetch';
// @group Mixins
// @vuese
// Global initiation for the site, used in layout files. Gets the cart from the server and sets the cart cookie and state. Also initiates scroll and resize listeners
export default {
  name: 'MixGlobalInit',
  mixins: [MixFetch],
  props: {},
  head() {
    // TODO: Implement working multilang function for alternate links and canonical
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    const canonical = i18nHead.link.find((link) => link.rel === 'canonical');

    // Decode canonical url
    canonical.href = decodeURIComponent(canonical.href);

    if (this.$route?.query?.page) {
      canonical.href = canonical.href + '?page=' + this.$route.query.page;
    }

    const head = {
      title: this.listPageInfo?.meta?.title,
      htmlAttrs: i18nHead.htmlAttrs,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.listPageInfo?.meta?.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.listPageInfo?.meta?.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.listPageInfo?.meta?.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.$config.public.baseUrl + '/meta-image-fallback.jpg',
        },
        ...i18nHead.meta,
      ],
      link: [canonical],
    };
    return head;
  },
  async fetch() {
    if (!this.$store.state.categoryTree?.length) {
      const categories = await this.fetchData(categoriesQuery, (result) => {
        return result?.data?.categories || [];
      });

      this.$store.commit('setCategoryTree', categories);
    }

    this.listPageInfo = await this.fetchData(listPageInfoQuery, (result) => {
      return result?.data?.listPageInfo || null;
    });
  },
  data: () => ({
    apolloLoading: false,
    loadingTimeout: undefined,
    listPageInfo: null,
  }),
  computed: {
    globalLoading() {
      return this.apolloLoading || this.$store.state.loading.loading;
    },
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        if (!to.name.includes('list') && !to.name.includes('plp')) {
          this.$store.commit('list/setBackNavigated', false);
        }
      }
    },
    '$apollo.loading'(val) {
      if (process.server) {
        return;
      }
      // Show loading indicator only if loading takes longer than 1000ms
      if (val) {
        clearTimeout(this.loadingTimeout);
        this.loadingTimeout = setTimeout(() => {
          this.apolloLoading = true;
        }, 1000);
      } else {
        clearTimeout(this.loadingTimeout);
        this.apolloLoading = false;
      }
    },
  },
  async mounted() {
    this.$store.dispatch('cart/update');

    this.$store.dispatch('initScrollListener');

    this.$store.commit('setViewportWidth');
    this.$store.dispatch('initResizeListener');

    window.addEventListener('popstate', this.popStateHandler);
    window.addEventListener('beforeunload', this.beforeUnloadHandler);

    await this.$store.dispatch('auth/initClient');
    if (
      this.$store.getters['auth/authenticated'] &&
      this.$config.public.customerTypesToggle
    ) {
      this.$store.dispatch(
        'changeCustomerType',
        this.$cookies.get('ralph-user-type'),
      );
    }

    this.performActions();
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.popStateHandler);
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  },
  methods: {
    performActions() {
      if (this.$route.query.action) {
        switch (this.$route.query.action) {
          case 'login':
            this.$store.commit('contentpanel/open', {
              name: 'account',
              frame: 'login',
            });
            break;
          case 'cart':
            this.$store.dispatch('cart/get', this.$route.hash.replace('#', ''));
            this.$router.replace(this.$getPath('checkout'));
            break;
          default:
            return false;
        }
      }
    },
    popStateHandler() {
      this.$nextTick(() => {
        this.$store.commit('list/setBackNavigated', true);
      });
    },
    beforeUnloadHandler() {
      this.$store.dispatch(
        'persistStates',
        this.$config.public.statesToPersist || [],
      );
    },
  },
};
