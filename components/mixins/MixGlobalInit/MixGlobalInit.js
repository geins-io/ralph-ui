import getCartQuery from 'cart/get.graphql';
import eventbus from '~/plugins/event-bus.js';

// @group Mixins
// @vuese
// Global initiation for the site, used in layout files. Gets the cart from the server and sets the cart cookie and state. Also initiates scroll and resize listeners
export default {
  apollo: {
    getCart: {
      query: getCartQuery,
      variables() {
        return {
          apiKey: this.$config.apiKey.toString(),
          id: this.cartId
        };
      },
      result(result) {
        if (result.data && result.data.getCart) {
          this.$store.commit('cart/update', result.data.getCart);
          if (
            this.$cookies.get('ralph-cart-id') !==
            this.$store.getters['cart/id']
          ) {
            this.$cookies.set('ralph-cart-id', this.$store.getters['cart/id'], {
              path: '/',
              expires: new Date(new Date().getTime() + 31536000000)
            });
          }
        }
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    cartId() {
      return this.$cookies.get('ralph-cart-id')
        ? this.$cookies.get('ralph-cart-id')
        : this.$store.getters['cart/id'];
    }
  },
  watch: {
    $route(to, from) {
      eventbus.$emit('route-change', { to, from });
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
        this.$route.name.includes('category') ||
        this.$route.name.includes('brand')
      ) {
        this.$store.commit('list/setBackNavigated', true);
      }
    });
  },
  methods: {
    refetchCart() {
      this.$apollo.queries.getCart.refetch();
    }
  }
};
