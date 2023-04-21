import addToCartMutation from 'cart/add.graphql';
import * as GTMEvent from '../../../services/gtm';

// @group Mixins
// @vuese
// A mixin for the add to cart function
export default {
  name: 'MixAddToCart',
  mixins: [],
  props: {},
  data: () => ({
    addToCartLoading: false
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Add a product to the cart on the server. Performs a graphql mutation
    // @arg sku id (Number), product quantity (Number), product (Object)
    addToCart(prodSkuId, prodQuantity, product = null) {
      const itemToAdd = {
        skuId: prodSkuId,
        quantity: prodQuantity
      };
      this.$apollo
        .mutate({
          mutation: addToCartMutation,
          variables: {
            id: this.$store.getters['cart/id'],
            item: itemToAdd
          }
        })
        .then(result => {
          this.$store.dispatch('cart/update', result.data.addToCart);
          this.addToCartLoading = false;

          this.$store.dispatch('events/push', {
            type: 'cart:add',
            data: { item: itemToAdd, product }
          });

          if (product) {
            this.$store.dispatch('cart/triggerAddedNotification', {
              item: itemToAdd,
              product
            });
            // unit price data differs between api and store because of discounts
            const unitPriceWithDiscounts = result.data.addToCart.items.find(
              ({ skuId }) => skuId === prodSkuId
            );
            const products = GTMEvent.transformProductForGTM([
              {
                ...itemToAdd,
                ...product,
                unitPrice: unitPriceWithDiscounts?.unitPrice
              }
            ]);

            GTMEvent.addToCart({
              gtmInputs: {
                gtm: this.$gtm,
                currency: this.$store.getters['channel/currentCurrency'],
                key: this.$store.getters.getGtmProductsKey
              },
              products
            });
          }
          setTimeout(() => {
            this.$store.dispatch('cart/removeAddedNotification');
          }, 30000);
        })
        .catch(error => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    }
  }
};
