import addToCartMutation from 'cart/add.graphql';
import addPackageToCartMutation from 'cart/add-package.graphql';
import * as GTMEvent from '../../../services/gtm';

// @group Mixins
// @vuese
// A mixin for the add to cart function
export default {
  name: 'MixAddToCart',
  props: {},
  data: () => ({
    addToCartLoading: false
  }),
  computed: {
    // @vuese
    // If is a product package
    isPackage() {
      return this.product?.type === 'package';
    },
    // @vuese
    // Mutation based on if is a package or not
    mutation() {
      return !this.isPackage ? addToCartMutation : addPackageToCartMutation;
    }
  },
  methods: {
    // @vuese
    // Add a product to the cart on the server. Performs a graphql mutation
    // @arg sku id (Number), product quantity (Number), product (Object)
    addToCart(prodSkuId, prodQuantity, product = null) {
      if (!product) {
        return;
      }
      const itemToAdd = {
        skuId: prodSkuId,
        quantity: prodQuantity
      };
      const variables = !this.isPackage
        ? {
            id: this.$store.getters['cart/id'],
            item: itemToAdd
          }
        : {
            id: this.$store.getters['cart/id'],
            packageId: product.productId,
            selections: this.packageSelection
          };

      this.$apollo
        .mutate({
          mutation: this.mutation,
          variables
        })
        .then(result => {
          const response = !this.isPackage
            ? result.data.addToCart
            : result.data.addPackageToCart;

          // Update cart
          this.$store.dispatch('cart/update', response);
          this.addToCartLoading = false;

          // Push event to event bus
          this.$store.dispatch('events/push', {
            type: 'cart:add',
            data: { item: itemToAdd, product }
          });

          // Show notification
          this.$store.dispatch('cart/triggerAddedNotification', {
            item: itemToAdd,
            product
          });

          // GTM add to cart event
          if (!this.isPackage) {
            // Get selected sku in case unit price data
            // differs between api and store because of discounts
            const selectedSku = response.items.find(
              ({ skuId }) => skuId === prodSkuId
            );

            this.gtmAddToCart(selectedSku, itemToAdd);
          } else {
            this.packageSelection.forEach(option => {
              const optionToAdd = {
                skuId: option.skuId,
                quantity: 1
              };

              // Get selected sku in case unit price data
              // differs between api and store because of discounts
              const selectedSku = response.items.find(
                ({ skuId }) => skuId === option.skuId
              );
              this.gtmAddToCart(selectedSku, optionToAdd);
            });
          }

          // Remove notification after 30 seconds
          setTimeout(() => {
            this.$store.dispatch('cart/removeAddedNotification');
          }, 30000);
        })
        .catch(error => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    },
    // @vuese
    // GTM add to cart event
    // @arg product (Object), selectedSku (Number), itemToAdd (Object)
    gtmAddToCart(selectedSku, itemToAdd) {
      const products = GTMEvent.transformProductForGTM([
        {
          ...itemToAdd,
          ...selectedSku.product,
          unitPrice: selectedSku.unitPrice
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
  }
};
