import addToCartMutation from 'cart/add.graphql';
import MixFetch from 'MixFetch';

// @group Mixins
// @vuese
// A mixin for the add to cart function
export default {
  name: 'MixAddToCart',
  mixins: [MixFetch],
  props: {},
  data: () => ({
    addToCartLoading: false,
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Add a product to the cart on the server. Performs a graphql mutation
    // @arg sku id (Number), product quantity (Number), product (Object)
    async addToCart(prodSkuId, prodQuantity, product = null) {
      const itemToAdd = {
        skuId: prodSkuId,
        quantity: prodQuantity,
      };
      const variables = {
        id: this.$store.getters['cart/id'],
        item: itemToAdd,
        allowExternalShippingFee:
          this.$store.state.currentRouteName?.includes('checkout'),
      };

      const cart = await this.mutateData(
        addToCartMutation,
        variables,
        (result) => {
          this.addToCartLoading = false;
          return result?.data?.addToCart || null;
        },
      );

      if (cart) {
        this.$store.dispatch('cart/update', cart);

        this.$store.dispatch('events/push', {
          type: 'cart:add',
          data: { item: itemToAdd, product },
        });

        if (product) {
          this.$store.dispatch('cart/triggerAddedNotification', {
            item: itemToAdd,
            product,
          });
        }
        setTimeout(() => {
          this.$store.dispatch('cart/removeAddedNotification');
        }, 30000);
      }
    },
  },
};
