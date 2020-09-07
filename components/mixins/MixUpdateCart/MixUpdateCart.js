import gql from 'graphql-tag';
// @group Mixins
// @vuese
// Function to update the current cart
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
    // Update the cart. Will perform a graphql mutation
    // @arg product alias (String), product quantity (Number)
    updateCart(prodAlias, prodQuantity) {
      const updateItem = {
        alias: prodAlias,
        quantity: prodQuantity
      };
      this.$apollo
        .mutate({
          mutation: gql`
            mutation updateCartItem(
              $apiKey: String!
              $id: String!
              $item: CartItemInputType!
            ) {
              updateCartItem(apiKey: $apiKey, id: $id, item: $item) {
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
            id: this.$store.state.cart.id,
            item: updateItem
          }
        })
        .then(result => {
          this.$store.commit('cart/update', result.data.updateCartItem);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
