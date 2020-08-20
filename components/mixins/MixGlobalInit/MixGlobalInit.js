import gql from 'graphql-tag';
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
        if (this.$store.state.cartId !== result.data.getCart.id) {
          this.$store.commit('setCartId', this.$cookies.get('ralph-cart-id'));
        }
        this.$store.commit('updateCart', result.data.getCart);
      }
    }
  },
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    cartId() {
      return this.$store.state.cartId
        ? this.$store.state.cartId
        : this.cartCookieId;
    },
    cartCookieId() {
      return this.$cookies.get('ralph-cart-id')
        ? this.$cookies.get('ralph-cart-id')
        : '';
    }
  },
  watch: {},
  mounted() {
    this.$store.dispatch('initScrollListener');

    this.$store.commit('setViewportWidth');
    this.$store.dispatch('initResizeListener');

    // Refetch cart on window/tab focus to keep state between windows/tabs
    window.addEventListener('focus', this.refetchCart);
  },
  methods: {
    refetchCart() {
      this.$apollo.queries.getCart.refetch();
    }
  }
};