import gql from 'graphql-tag';
import eventbus from '~/plugins/event-bus.js';
// @group Mixins
// @vuese
// Global initiation for the site, used in layout files. Gets the cart from the server and sets the cart cookie and state. Also initiates scroll and resize listeners
export default {
  apollo: {
    getCart: {
      query: gql`
        query getCart($apiKey: String!, $id: String!) {
          getCart(apiKey: $apiKey, id: $id) {
            id
            total {
              sellingPriceIncVatFormatted
              sellingPriceExVatFormatted
            }
            items {
              brandName
              name
              quantity
              images
              alias
              price {
                isDiscounted
                regularPriceIncVatFormatted
                sellingPriceIncVatFormatted
                regularPriceExVatFormatted
                sellingPriceExVatFormatted
              }
              total {
                isDiscounted
                regularPriceIncVatFormatted
                sellingPriceIncVatFormatted
                regularPriceExVatFormatted
                sellingPriceExVatFormatted
              }
            }
          }
        }
      `,
      variables() {
        return {
          apiKey: this.$store.getters.currentApiKey,
          id: this.cartId
        };
      },
      result(result) {
        if (this.$cookies.get('ralph-cart-id') !== result.data.getCart.id) {
          this.$cookies.set('ralph-cart-id', result.data.getCart.id, {
            path: '/',
            expires: new Date(new Date().getTime() + 31536000000)
          });
        }
        if (this.$store.state.cart.id !== result.data.getCart.id) {
          this.$store.commit('cart/setId', this.$cookies.get('ralph-cart-id'));
        }
        this.$store.commit('cart/update', result.data.getCart);
      }
    }
  },
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    cartId() {
      return this.$store.state.cart.id
        ? this.$store.state.cart.id
        : this.cartCookieId;
    },
    cartCookieId() {
      return this.$cookies.get('ralph-cart-id')
        ? this.$cookies.get('ralph-cart-id')
        : '';
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
