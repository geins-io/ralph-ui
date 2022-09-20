import categoriesQuery from 'global/categories.graphql';
import eventbus from '@ralph/ralph-ui/plugins/eventbus.js';

// @group Mixins
// @vuese
// Global initiation for the site, used in layout files. Gets the cart from the server and sets the cart cookie and state. Also initiates scroll and resize listeners
export default {
  name: 'MixGlobalInit',
  apollo: {
    categories: {
      query: categoriesQuery,
      result(result) {
        if (result.data && result.data.categories) {
          this.$store.commit('setCategoryTree', result.data.categories);
        }
      },
      skip() {
        return this.$store.state.categoryTree.length > 0;
      },
      error(error) {
        // pass the error response to the error component
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    }
  },
  mixins: [],
  props: {},
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true });
  },
  data: () => ({
    apolloLoading: false,
    loadingTimeout: undefined
  }),
  computed: {
    globalLoading() {
      return this.apolloLoading || this.$store.state.loading.loading;
    }
  },
  watch: {
    $route(to, from) {
      eventbus.$emit('route-change', { to, from });
      if (to.path !== from.path) {
        this.$store.dispatch('loading/start');
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
    }
  },
  async mounted() {
    this.$store.dispatch('initScrollListener');

    this.$store.commit('setViewportWidth');
    this.$store.dispatch('initResizeListener');

    // Refetch cart on window/tab focus to keep state between windows/tabs
    window.addEventListener('focus', this.refetchCart);

    window.addEventListener('popstate', () => {
      if (this.$route.name?.includes('plp')) {
        this.$store.commit('list/setBackNavigated', true);
      }
    });

    await this.$store.dispatch('auth/initClient');
    if (
      this.$store.getters['auth/authenticated'] &&
      this.$config.customerTypesToggle
    ) {
      this.$store.dispatch(
        'changeCustomerType',
        this.$cookies.get('ralph-user-type')
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
              frame: 'login'
            });
            break;
          default:
            return false;
        }
      }
    }
  }
};
