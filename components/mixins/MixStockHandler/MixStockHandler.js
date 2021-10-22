// @group Mixins
// @vuese
// Handling all stock methods and computed<br><br>
// **Data:**<br>
// stock: `0`<br>
export default {
  name: 'MixStockHandler',
  mixins: [],
  props: {},
  data: () => ({
    stock: 0
  }),
  computed: {
    // @vuese
    // Returns value of data variable 'stock'. Made to be overwritten by the context
    // @type Number
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
      if (this.chosenSku.id && this.$store.state.cart?.data?.items) {
        const inCart = this.$store.state.cart.data.items.find(
          i => i.skuId === this.chosenSku.id
        );
        return inCart ? inCart.quantity : 0;
      } else {
        return 0;
      }
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
    // @vuese
    // Get stock status. Argument **stock** defaults to this.currentStock. Available statuses are: 'out-of-stock', 'in-stock', 'few-left'
    // @arg stock (Number)
    getStockStatus(stock = this.currentStock) {
      if (stock === 0) {
        return 'out-of-stock';
      } else if (stock < this.$config.productStockFewLeftLimit) {
        return 'few-left';
      } else {
        return 'in-stock';
      }
    },
    // @vuese
    // Get stock status lang key. Argument **stock** defaults to this.currentStock
    // @arg stock (Number)
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
