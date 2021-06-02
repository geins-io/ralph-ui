import getCartQuery from 'cart/get.graphql';
import eventbus from '~/plugins/event-bus.js';

// @group Mixins
// @vuese
// Global initiation for the site, used in layout files. Gets the cart from the server and sets the cart cookie and state. Also initiates scroll and resize listeners
export default {
  name: 'MixGlobalInit',
  apollo: {
    getCart: {
      query: getCartQuery,
      fetchPolicy: 'no-cache',
      variables() {
        return {
          id: this.$store.getters['cart/id']
        };
      },
      result(result) {
        if (result.data && result.data.getCart) {
          this.$store.dispatch('cart/update', result.data.getCart);
        }
      },
      skip() {
        return !!this.$route?.name?.includes('checkout');
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  mixins: [],
  props: {},
  head() {
    return this.$nuxtI18nSeo({ addSeoAttributes: true });
  },
  data: () => ({}),
  computed: {},
  watch: {
    $route(to, from) {
      eventbus.$emit('route-change', { to, from });
      if (to.path !== from.path) {
        this.$store.dispatch('loading/start');
      }
    }
  },
  mounted() {
    this.$store.dispatch('initScrollListener');

    this.$store.commit('setViewportWidth');
    this.$store.dispatch('initResizeListener');

    // Refetch cart on window/tab focus to keep state between windows/tabs
    window.addEventListener('focus', this.refetchCart);

    window.addEventListener('popstate', () => {
      if (
        this.$route.name?.includes('category') ||
        this.$route.name?.includes('brand')
      ) {
        this.$store.commit('list/setBackNavigated', true);
      }
    });

    this.$store.dispatch('auth/initClient');

    this.performActions();
  },
  methods: {
    refetchCart() {
      this.$apollo.queries.getCart.refetch();
    },
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
