import gql from 'graphql-tag';
// @group Mixins
// @vuese
// A mixin for the add to cart function
export default {
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Add a product to the cart on the server. Performs a graphql mutation
    // @arg product alias (String), product quantity (Number)
    addToCart(prodAlias, prodQuantity) {
      const itemToAdd = {
        alias: prodAlias,
        quantity: prodQuantity
      };
      this.$apollo
        .mutate({
          mutation: gql`
            mutation addToCart(
              $apiKey: String!
              $id: String!
              $item: CartItemInputType!
            ) {
              addToCart(apiKey: $apiKey, id: $id, item: $item) {
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
          variables: {
            apiKey: this.$store.getters.currentApiKey,
            id: this.$store.state.cartId,
            item: itemToAdd
          }
        })
        .then(result => {
          this.$store.commit('updateCart', result.data.addToCart);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
