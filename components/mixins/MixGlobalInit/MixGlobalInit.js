import categoriesQuery from 'global/categories.graphql';
import listPageInfo from 'global/list-page-info.graphql';
import MixApolloRefetch from 'MixApolloRefetch';
// @group Mixins
// @vuese
// Global initiation for the site, used in layout files. Gets the cart from the server and sets the cart cookie and state. Also initiates scroll and resize listeners
export default {
  name: 'MixGlobalInit',
  mixins: [MixApolloRefetch],
  apollo: {
    categories: {
      query: categoriesQuery,
      errorPolicy: 'all',
      result(result) {
        if (result.data && result.data.categories) {
          this.$store.commit('setCategoryTree', result.data.categories);
        }
      },
      skip() {
        return this.$store.state.categoryTree.length;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      },
    },
    listPageInfo: {
      query: listPageInfo,
      errorPolicy: 'all',
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      },
    },
  },
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
          content: this.$config.baseUrl + '/meta-image-fallback.jpg',
        },
        ...i18nHead.meta,
      ],
      link: [canonical],
    };
    return head;
  },
  data: () => ({
    error: false,
    apolloLoading: false,
    loadingTimeout: undefined,
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
    this.$store.dispatch('initScrollListener');

    this.$store.commit('setViewportWidth');
    this.$store.dispatch('initResizeListener');

    window.addEventListener('popstate', () => {
      this.$nextTick(() => {
        this.$store.commit('list/setBackNavigated', true);
      });
    });

    window.addEventListener('beforeunload', () => {
      this.$store.dispatch('persistStates', this.$config.statesToPersist || []);
    });

    await this.$store.dispatch('auth/initClient');
    if (
      this.$store.getters['auth/authenticated'] &&
      this.$config.customerTypesToggle
    ) {
      this.$store.dispatch(
        'changeCustomerType',
        this.$cookies.get('ralph-user-type'),
      );
    }
    this.performActions();
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
  },
};
