import productQuery from 'product/product.graphql';
// @group Mixins
// @vuese
export default {
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
      },
      error(error) {
        this.error = error.message;
      }
    }
  },
  data: () => ({
    quantity: 1,
    error: null,
    replaceAlias: null
  }),
  computed: {
    productImages() {
      return this.product && this.product.images && this.product.images.length
        ? this.product.images
        : [];
    },
    prodAlias() {
      return this.replaceAlias || this.$route.params.alias;
    }
  },
  watch: {
    currentStock() {
      if (this.quantity > this.currentStock) {
        this.quantity = this.currentStock;
      }
    }
  },
  mounted() {},
  methods: {
    onQuantityChange(value) {
      this.quantity = value;
    },
    addToCartClick() {
      this.addToCartLoading = true;
      this.addToCart(this.chosenSku.id, this.quantity);
    },
    replaceProduct(alias) {
      this.replaceAlias = alias;
      history.replaceState(null, null, alias);
    },
    sizeChangeHandler(data) {
      this.setSku(data.id, data.value);
    }
  }
};
