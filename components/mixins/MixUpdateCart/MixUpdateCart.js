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
            id: this.$store.state.cartId,
            item: updateItem
          }
        })
        .then(result => {
          this.$store.commit('updateCart', result.data.updateCartItem);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
