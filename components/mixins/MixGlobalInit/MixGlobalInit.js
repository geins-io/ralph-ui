import categoriesQuery from 'global/categories.graphql';
import eventbus from '@ralph/ralph-ui/plugins/eventbus.js';
import listPageInfo from 'global/list-page-info.graphql';
import getMarkets from 'global/markets.graphql';
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
        return this.$store.state.categoryTree.length || !process.client;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    },
    channel: {
      query: getMarkets,
      errorPolicy: 'all',
      result(result) {
        this.$store.commit('setMarkets', result?.data?.channel?.markets || []);
        if (!process.client) {
          return;
        }
        const markets = this.$store.state.markets.map(market => market.alias);
        if (!markets.includes(this.$store.state.marketId)) {
          const correctPath = this.$route.path.replace(
            this.$store.state.marketId,
            this.$config.fallbackMarketId
          );
          this.$store.dispatch('setMarketId', this.$config.fallbackMarketId);
          this.$nextTick(() => {
            this.$router.replace(correctPath);
          });
        }
      },
      error(error) {
        console.error(error);
      }
    },
    listPageInfo: {
      query: listPageInfo,
      errorPolicy: 'all',
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    }
  },
  props: {},
  head() {
    // TODO: Implement working multilang function for alternate links and canonical
    // const obj = this.$nuxtI18nHead({ addSeoAttributes: true });

    const obj = {};
    obj.title = this.listPageInfo?.meta?.title || '';
    obj.meta = [
      {
        hid: 'description',
        name: 'description',
        content: this.listPageInfo?.meta?.description || ''
      }
    ];
    return obj;
  },
  data: () => ({
    error: false,
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
