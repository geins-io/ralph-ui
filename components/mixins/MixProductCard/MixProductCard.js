import nostoClick from 'product/nosto-click.graphql';
import MixAddToCart from 'MixAddToCart';
// @group Mixins
// @vuese
// All functionality for the product card<br><br>
// **Data:**<br>
// observer: `null`<br>
// trackCounter: `0`<br>
export default {
  name: 'MixProductCard',
  mixins: [MixAddToCart],
  props: {
    // Base elemetn tag
    baseTag: {
      type: String,
      default: 'li'
    },
    // Product data
    product: {
      type: Object,
      required: true
    },
    // Current page number
    pageNumber: {
      type: Number,
      default: 0
    }
  },
  data: () => ({ observer: null, trackCounter: 0 }),
  computed: {
    // @vuese
    // ResultId of nosto product list request
    // @type String
    nostoResultId() {
      return this.product.nostoResultId;
    },
    // @vuese
    // Is the product populated with data
    // @type Boolean
    productPopulated() {
      return Object.keys(this.product).length > 0;
    },
    // @vuese
    // The current skuId if only one, otherwise empty string
    // @type String
    skuId() {
      if (!this.productPopulated) {
        return '';
      }
      return this.product.skus.length > 1 ? '' : this.product.skus[0].skuId;
    },
    // @vuese
    // Returns the number of items with same skuId as the chosen one that you have in cart
    // @type Number
    chosenSkuCartQuantity() {
      if (this.skuId && this.$store.state.cart?.data?.items) {
        const inCart = this.$store.state.cart.data.items.find(
          i => i.skuId === this.skuId
        );
        return inCart ? inCart.quantity : 0;
      } else {
        return 0;
      }
    }
  },
  watch: {},
  created() {
    if (process.client) {
      const options = {
        rootMargin: '0px',
        threshold: 1.0
      };
      const callback = () => {
        if (this.trackCounter <= 1) {
          if (this.trackCounter === 1) {
            this.gtmViewEvent();
          }
          this.trackCounter = this.trackCounter + 1;
        } else {
          this.observer.disconnect();
        }
      };
      this.observer = new IntersectionObserver(callback, options);
    }
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  methods: {
    // @vuese
    // Handling product click
    productClickHandler() {
      this.gtmClickEvent();
      if (this.nostoResultId) {
        this.nostoClickEvent();
      }
      if (this.pageNumber > 0) {
        this.$store.commit('list/setRelocatePage', this.pageNumber);
        this.$store.commit('list/setRelocateAlias', this.product.alias);
      }
    },
    // @vuese
    // Add to cart if skuId is present, otherwise go to product
    addToCartClick() {
      if (this.skuId && this.product.totalStock.totalStock !== 0) {
        if (
          this.chosenSkuCartQuantity + 1 >
          this.product.totalStock.totalStock
        ) {
          this.$store.dispatch('snackbar/trigger', {
            message: this.$t('CART_ADD_TOO_MANY', {
              stock: this.product.totalStock.totalStock
            }),
            placement: 'bottom-center'
          });
        } else {
          this.addToCartLoading = true;
          this.addToCart(this.skuId, 1, this.product);
        }
      } else {
        this.$router.push(this.product.canonicalUrl);
      }
    },
    // @vuese
    // Pushing GTM Product Impression
    gtmViewEvent() {
      if (this.$gtm) {
        this.$gtm.push({
          event: 'Product Impression',
          eventInfo: {},
          ecommerce: {
            currencyCode: 'SEK',
            detail: {
              products: this.getGtmProductFormat()
            }
          },
          'gtm.uniqueEventId': 4
        });
      }
    },
    // @vuese
    // Pushing GTM Nosto click event
    nostoClickEvent() {
      if (this.$store.getters['nosto/isNostoActive']) {
        this.$apolloProvider.clients.nosto
          .mutate({
            mutation: nostoClick,
            variables: {
              sessionId: this.$store.getters['nosto/getSessionToken'],
              productId: this.product.productId,
              resultId: this.nostoResultId
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
    },
    // @vuese
    // Pushing GTM Product Click
    gtmClickEvent() {
      if (this.$gtm) {
        this.$gtm.push({
          event: 'Product Click',
          eventInfo: {
            context: 'Outlet'
          },
          ecommerce: {
            click: {
              actionField: {
                list: 'Outlet',
                action: 'click'
              },
              products: this.getGtmProductFormat()
            }
          },
          'gtm.uniqueEventId': 12
        });
      }
    },
    // @vuese
    // Getting gtm product format
    getGtmProductFormat() {
      return this.productPopulated
        ? [
            {
              id: this.product.productId,
              name: this.product.name,
              brand: this.product.brand?.name,
              category: this.product.primaryCategory?.name,
              price: this.product.unitPrice.sellingPriceExVat,
              tax: this.product.unitPrice.vat,
              inStock: Boolean(this.product?.totalStock?.inStock),
              urgencyLabelDisplayed: false,
              position: 1
            }
          ]
        : [];
    }
  }
};
