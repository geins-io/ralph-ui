// @group Mixins
// @vuese
// Handling all stock methods and computed<br><br>
// **Data:**<br>
// defaultStock: `{
//     totalStock: 0,
//      inStock: 0,
//      oversellable: 0,
//      static: 0,
//      incoming: null
//    }`<br>
// quantity: `1`<br>
export default {
  name: 'MixStockHandler',
  mixins: [],
  props: {},
  data: () => ({
    defaultStock: {
      totalStock: 0,
      inStock: 0,
      oversellable: 0,
      static: 0,
      incoming: null
    },
    quantity: 1
  }),
  computed: {
    // @vuese
    // Returns value of data variable 'stock'. Made to be overwritten by the context
    // @type Number
    currentStock() {
      return this.defaultStock;
    },
    // @vuese
    // Returns a stock status. Available statuses are: 'OUT_OF_STOCK', 'IN_STOCK', 'FEW_LEFT', 'OVERSELLABLE', 'STATIC'
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
    stockStatusDeliveryTime() {
      return this.getStockStatusDeliveryTime();
    },
    // @vuese
    // Returns the number of items with same skuId as the chosen one that you have in cart
    // @type Number
    chosenSkuCartQuantity() {
      if (this.chosenSku?.id && this.$store.state.cart?.data?.items) {
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
      return this.chosenSku?.id
        ? this.currentStock.totalStock - this.chosenSkuCartQuantity
        : -1;
    },
    // @vuese
    // Returns true if product is out of stock
    // @type Boolean
    outOfStock() {
      return this.stockStatus === 'OUT_OF_STOCK';
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Get stock status. Argument **stock** defaults to this.currentStock. Available statuses are: 'OUT_OF_STOCK', 'IN_STOCK', 'FEW_LEFT', 'OVERSELLABLE', 'STATIC'
    // @arg stock (Number)
    getStockStatus(stock = this.currentStock) {
      if (stock.totalStock === 0) {
        return 'OUT_OF_STOCK';
      } else if (stock.oversellable > 0 && this.quantity > stock.inStock) {
        return 'OVERSELLABLE';
      } else if (
        stock.static > 0 &&
        this.quantity > stock.inStock &&
        this.quantity > stock.oversellable
      ) {
        return 'STATIC';
      } else if (
        stock.inStock > 0 &&
        stock.inStock < this.$config.productStockFewLeftLimit
      ) {
        return 'FEW_LEFT';
      } else {
        return 'IN_STOCK';
      }
    },
    // @vuese
    // Get stock status lang key. Argument **stock** defaults to this.currentStock
    // @arg stock (Object)
    getStockStatusText(stock = this.currentStock) {
      return this.$t('STOCK_STATUS_' + this.getStockStatus(stock), {
        quantity: stock.inStock
      });
    },
    // @vuese
    // Get stock status lang key. Argument **stock** defaults to this.currentStock
    // @arg stock (Object)
    getStockStatusDeliveryTime(stock = this.currentStock) {
      return this.$t(
        'STOCK_STATUS_DELIVERY_TIME_' + this.getStockStatus(stock)
      );
    },
    // @vuese
    // Get stock status in kebab-case. Argument **stock** defaults to this.currentStock
    // @arg stock (Object)
    getStockStatusClass(stock = this.currentStock) {
      const status = this.getStockStatus(stock);
      return status
        ? status
            .toLowerCase()
            .split('_')
            .join('-')
        : '';
    }
  }
};
