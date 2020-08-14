// @group Mixins
// @vuese
import gql from 'graphql-tag';

export default {
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    addToCart(prodAlias, prodQuantity) {
      const cartToAdd = {
        id: this.$store.state.cartId,
        items: [
          {
            alias: prodAlias,
            quantity: prodQuantity
          }
        ]
      };
      this.$apollo
        .query({
          query: gql`
            query cart($apiKey: String!, $cart: CartInputType!) {
              cart(apiKey: $apiKey, cart: $cart) {
                id
                total {
                  sellingPriceIncVatFormatted
                  sellingPriceExVatFormatted
                }
                items {
                  brandName
                  name
                  quantity
                  price {
                    isDiscounted
                    regularPriceIncVatFormatted
                    sellingPriceIncVatFormatted
                    regularPriceExVatFormatted
                    sellingPriceExVatFormatted
                  }
                  images
                  alias
                }
              }
            }
          `,
          variables: {
            apiKey: this.$store.getters.currentApiKey,
            cart: cartToAdd
          }
        })
        .then(result => {
          this.$store.commit('updateCart', result.data.cart);
        });
    }
  }
};
