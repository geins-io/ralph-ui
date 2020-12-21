// @group Mixins
// @vuese
export default {
  components: {},
  mixins: [],
  props: {},
  data: () => ({
    stock: 0
  }),
  computed: {
    currentStock() {
      return this.stock;
    },
    // @vuese
    // Returns a stock status. Available statuses are: 'out-of-stock', 'in-stock', 'few-left'
    // @type String
    stockStatus() {
      return this.getStockStatus();
    },
    // @vuese
    // Returns stock status text content based on stock status
    // @type String
    stockStatusText() {
      return this.getStockStatusText();
    },
    // @vuese
    // Returns the number of items with same skuId as the chosen one that you have in cart
    // @type Number
    chosenSkuCartQuantity() {
      if (this.chosenSku.id) {
        const inCart = this.$store.state.cart.data.items.filter(
          i => i.skuId === this.chosenSku.id
        )[0];
        return inCart ? inCart.quantity : 0;
      } else return 0;
    },
    // @vuese
    // Returns the quantity left in stock subtracting items in cart
    // @type Number
    stockThreshold() {
      return this.chosenSku.id
        ? this.currentStock - this.chosenSkuCartQuantity
        : -1;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getStockStatus(stock = this.currentStock) {
      if (stock === 0) {
        return 'out-of-stock';
      } else if (stock < this.$config.productStockFewLeftLimit) {
        return 'few-left';
      } else {
        return 'in-stock';
      }
    },
    getStockStatusText(stock = this.currentStock) {
      switch (this.getStockStatus(stock)) {
        case 'out-of-stock':
          return this.$t('STOCK_STATUS_OUT_OF_STOCK');
        case 'few-left':
          return this.$t('STOCK_STATUS_FEW_LEFT', {
            quantity: stock
          });
        default:
          return this.$t('STOCK_STATUS_IN_STOCK');
      }
    }
  }
};
