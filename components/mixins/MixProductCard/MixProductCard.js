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
      default: 'li',
    },
    // Product data
    productData: {
      type: Object,
      required: true,
    },
    // Current page number
    pageNumber: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    observer: null,
    trackCounter: 0,
    currentProduct: {},
  }),
  computed: {
    // @vuese
    // The product data
    // @type Object
    product() {
      return Object.keys(this.currentProduct).length > 0
        ? this.currentProduct
        : this.productData;
    },
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
          (i) => i.skuId === this.skuId,
        );
        return inCart ? inCart.quantity : 0;
      } else {
        return 0;
      }
    },
    // @vuese
    // Returns the index of the product in the list
    // @type Number
    listIndex() {
      return Number(this.$vnode.key + 1);
    },
  },
  created() {
    if (process.client) {
      const options = {
        rootMargin: '0px',
        threshold: 1.0,
      };
      const callback = () => {
        if (this.trackCounter <= 1) {
          if (this.trackCounter === 1) {
            this.$store.dispatch('events/push', {
              type: 'product:impression',
              data: {
                product: this.product,
                page: this.pageNumber,
                index: this.listIndex,
                pageSize: this.$config.productListPageSize,
              },
            });
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
      if (this.nostoResultId) {
        this.nostoClickEvent();
      }

      this.$store.dispatch('events/push', {
        type: 'product:click',
        data: {
          product: this.product,
          page: this.pageNumber,
          index: this.listIndex,
          pageSize: this.$config.productListPageSize,
        },
      });

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
              stock: this.product.totalStock.totalStock,
            }),
            placement: 'bottom-center',
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
    // Pushing Nosto click event
    nostoClickEvent() {
      if (this.$store.getters['nosto/isNostoActive']) {
        this.$apolloProvider.clients.nosto
          .mutate({
            mutation: nostoClick,
            variables: {
              sessionId: this.$store.getters['nosto/getSessionToken'],
              productId: this.product.productId,
              resultId: this.nostoResultId,
            },
          })
          .catch((error) => {
            this.$nuxt.error({ statusCode: error.statusCode, message: error });
          });
      }
    },
    // @vuese
    // Setting product of the product card if other than productData)
    setProduct(product) {
      this.currentProduct = product;
    },
  },
};
