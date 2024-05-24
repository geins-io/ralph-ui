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
      if (this.$store.getters['cart/id'] === '') {
        await this.$store.dispatch('cart/get');
      }

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
      const callback = (result) => {
        this.addToCartLoading = false;
        return result?.data?.addToCart || null;
      };

      const callbackError = () => {
        this.addToCartLoading = false;
      };

      let cart = await this.mutateData(
        addToCartMutation,
        callback,
        variables,
        callbackError,
      );

      // If no cart, try again after resetting cart
      if (!cart) {
        this.addToCartLoading = true;
        await this.$store.dispatch('cart/reset');
        variables.id = this.$store.getters['cart/id'];
        cart = await this.mutateData(
          addToCartMutation,
          callback,
          variables,
          callbackError,
        );
      }

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
      } else {
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('FEEDBACK_ERROR'),
          placement: 'bottom-center',
          mode: 'error',
        });
      }
    },
  },
};
