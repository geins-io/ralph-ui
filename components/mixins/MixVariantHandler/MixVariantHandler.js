// @group Mixins
// @vuese
// Handler of product variant data. Expects product object to work with<br><br>
// **Data:**<br>
// chosenSku: `{ id: null, value: '' }`<br>
export default {
  components: {},
  mixins: [],
  props: {},
  data: () => ({
    chosenSku: {
      id: null,
      value: ''
    }
  }),
  computed: {
    // @vuese
    // Quick ref to product variant group
    // @type Object
    variantGroups() {
      return this.product ? this.product.variantGroups[0] : null;
    },
    // @vuese
    // Does the has variants of type Color?
    // @type Boolean
    hasColorVariants() {
      return (
        this.variantGroups &&
        this.variantGroups.variantLevels.filter(i => i.name === 'Color')
          .length > 0
      );
    },
    // @vuese
    // Get group of color variants
    // @type Object
    colorVariants() {
      return this.hasColorVariants
        ? this.variantGroups.variantLevels.filter(i => i.name === 'Color')[0]
        : null;
    },
    // @vuese
    // Returns a list of aliases for the color variants
    // @type Array
    colorProductAliases() {
      return this.variantGroups.variants.map(i => {
        return i.level === this.colorVariants.level ? i.alias : '';
      });
    },
    // @vuese
    // Does sku variants exist for current product?
    // @type Boolean
    hasSkuVariants() {
      return this.product.currentProductVariant.variants.length > 1;
    },
    // @vuese
    // Returns a list of sku variant for current product
    // @type Array
    skuVariants() {
      return this.hasSkuVariants
        ? this.product.currentProductVariant.variants
        : null;
    },
    // @vuese
    // Return total stock quantity based on chosen sku variant
    // @type Number
    currentStock() {
      if (this.product && this.product.currentProductVariant) {
        const chosenItem = this.product.currentProductVariant.variants.filter(
          i => i.skuId === this.chosenSku.id
        )[0];
        if (chosenItem) {
          return chosenItem.stock.totalStock;
        } else {
          return this.product.currentProductVariant.stock.totalStock;
        }
      } else return 0;
    },
    // @vuese
    // Returns a stock status. Available statuses are: 'out-of-stock', 'in-stock', 'few-left'
    // @type String
    stockStatus() {
      if (this.currentStock === 0) {
        return 'out-of-stock';
      } else if (this.currentStock < this.$config.productStockFewLeftLimit) {
        return 'few-left';
      } else {
        return 'in-stock';
      }
    },
    // @vuese
    // Returns stock status text content bast on stock status
    // @type String
    stockStatusText() {
      switch (this.stockStatus) {
        case 'out-of-stock':
          return this.$t('STOCK_STATUS_OUT_OF_STOCK');
        case 'few-left':
          return this.$t('STOCK_STATUS_FEW_LEFT', {
            quantity: this.currentStock
          });
        default:
          return this.$t('STOCK_STATUS_IN_STOCK');
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Function to set default sku when no variants exists
    setDefaultSku() {
      const firstAvailable = this.product.currentProductVariant.variants.filter(
        i => i.stock.totalStock > 0
      )[0];
      if (firstAvailable) {
        this.setSku(firstAvailable.skuId, firstAvailable.value);
      }
    },
    // @vuese
    // Set chosenSku object values
    // @arg id (Number), value (String)
    setSku(id, value) {
      this.chosenSku.id = id;
      this.chosenSku.value = value;
    },
    // @vuese
    // Resets chosenSku
    resetSku() {
      this.setSku(null, '');
    }
  }
};
