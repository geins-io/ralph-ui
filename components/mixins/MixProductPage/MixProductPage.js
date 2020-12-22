import productQuery from 'product/product.graphql';
// @group Mixins
// @vuese
// All functionality for the product page<br><br>
// **Data:**<br>
// quantity: `1`<br>
// replaceAlias: `null`<br>
// error: `null`
export default {
  name: 'MixProductPage',
  components: {},
  mixins: [],
  props: {},
  apollo: {
    product: {
      query: productQuery,
      variables() {
        return {
          alias: this.prodAlias,
          apiKey: this.$config.apiKey.toString()
        };
      },
      result() {
        if (!this.hasSkuVariants) {
          this.setDefaultSku();
        }
        this.$store.dispatch('loading/end');
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  data: () => ({
    quantity: 1,
    replaceAlias: null
  }),
  computed: {
    // @vuese
    // Quick ref to product images
    // @type Array
    productImages() {
      return this.product && this.product.images && this.product.images.length
        ? this.product.images
        : [];
    },
    // @vuese
    // Alias used to fetch product data, using replaceAlias if it has a value
    // @type String
    prodAlias() {
      return this.replaceAlias || this.$route.params.alias;
    }
  },
  watch: {
    // @vuese
    // Watching currentStock to change quantity if set higher than totalStock
    currentStock(val) {
      if (val === 0) return;
      if (this.quantity > val) {
        this.quantity = val;
      }
    }
  },
  mounted() {},
  methods: {
    // @vuese
    // Handler for changing quantity
    // @arg value (Number)
    onQuantityChange(value) {
      this.quantity = value;
    },
    // @vuese
    // Action for clicking the add to cart button
    addToCartClick() {
      if (!this.chosenSku.id) {
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('MUST_CHOOSE_SKU'),
          placement: 'bottom-center'
        });
      } else if (
        this.quantity + this.chosenSkuCartQuantity >
        this.currentStock
      ) {
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('CART_ADD_TOO_MANY', { stock: this.currentStock }),
          placement: 'bottom-center'
        });
      } else {
        this.addToCartLoading = true;
        this.addToCart(this.chosenSku.id, this.quantity);
      }
    },
    // @vuese
    // Replace product data without reloading the page. Used for changing between product variants
    // @arg alias (String)
    replaceProduct(alias) {
      this.replaceAlias = alias;
      history.replaceState(null, null, alias);
    },
    // @vuese
    // Handler for changing the sku
    // @arg data (Object)
    sizeChangeHandler(data) {
      this.setSku(data.id, data.value);
    },
    // @vuese
    // Handler for reaching quantity threshold
    quantityThresholdHandler() {
      this.$store.dispatch('snackbar/trigger', {
        message: this.$t('QUANTITY_THRESHOLD_REACHED', {
          quantity: this.chosenSkuCartQuantity
        }),
        placement: 'bottom-center'
      });
    }
  }
};
