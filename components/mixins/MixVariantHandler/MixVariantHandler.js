import MixStockHandler from 'MixStockHandler';
// @group Mixins
// @vuese
// Handler of product variant data. Expects product object to work with<br><br>
// **Data:**<br>
// chosenSku: `{ id: null, value: '' }`<br>
export default {
  components: {},
  mixins: [MixStockHandler],
  props: {},
  data: () => ({
    chosenSku: {
      id: null,
      value: ''
    }
  }),
  computed: {
    baseVariants() {
      return this.product ? this.product.variantGroup.variants : [];
    },
    hasVariants() {
      return this.baseVariants.length > 1;
    },
    currentBaseVariant() {
      return this.baseVariants.length
        ? this.getCurrentVariant(this.baseVariants)
        : null;
    },
    hasMultipleDimensions() {
      return this.baseVariants.length
        ? this.currentBaseVariant.level > 1
        : false;
    },
    secondDimensionVariants() {
      return this.hasMultipleDimensions ? this.currentBaseVariant.variants : [];
    },
    currentSecondDimensionVariant() {
      return this.secondDimensionVariants.length
        ? this.getCurrentVariant(this.secondDimensionVariants)
        : null;
    },
    currentProductVariant() {
      return this.baseVariants.length
        ? this.checkForProductVariant(this.baseVariants)
        : null;
    },
    skuVariants() {
      return this.currentProductVariant
        ? this.currentProductVariant.variants
        : [];
    },
    // @vuese
    // Does sku variants exist for current product?
    // @type Boolean
    hasSkuVariants() {
      return this.skuVariants.length > 1;
    },
    skuIsChosen() {
      return this.chosenSku.id !== null && this.chosenSku.value !== '';
    },
    chosenSkuVariant() {
      return this.skuIsChosen
        ? this.skuVariants.filter(i => i.value === this.chosenSku.value)[0]
        : null;
    },
    chosenSkuStock() {
      return this.chosenSkuVariant ? this.chosenSkuVariant.stock.totalStock : 0;
    },
    chosenSkuId() {
      return this.skuIsChosen && this.chosenSkuVariant
        ? this.chosenSkuVariant.skuId
        : null;
    },
    // @vuese
    // Return total stock quantity based on chosen sku variant. Overriding currentStock from MixStockHandler
    // @type Number
    currentStock() {
      if (this.skuVariants.length && this.product.totalStock) {
        if (this.chosenSkuVariant) {
          return this.chosenSkuVariant.stock.totalStock;
        } else {
          return this.product.totalStock.totalStock;
        }
      } else return 0;
    },
    variantPickerData() {
      const dataObj = {};
      dataObj.variantDimensions = this.product.variantDimensions;
      dataObj.chosenSku = this.chosenSku;
      dataObj.hasMultipleDimensions = this.hasMultipleDimensions;
      return dataObj;
    }
  },
  watch: {
    currentStock(val) {
      if (val === 0) {
        // The chosen size no longer has a stock quantity, chosenSku needs a reset
        this.resetSku();
      }
    },
    chosenSkuId(val) {
      if (val !== this.chosenSku.id && val !== null) {
        this.setSku(val, this.chosenSku.value);
      }
    }
  },
  mounted() {},
  methods: {
    // @vuese
    // Function to set default sku when no variants exists
    setDefaultSku() {
      const firstAvailable = this.skuVariants.filter(
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
    },
    checkForProductVariant(variants) {
      const currentVariant = this.getCurrentVariant(variants);
      if (currentVariant.level === 1) {
        return currentVariant;
      } else {
        return this.checkForProductVariant(currentVariant.variants);
      }
    },
    getCurrentVariant(variants) {
      return variants.filter(
        i =>
          i.value ===
          this.product.variantDimensions.filter(ii => ii.level === i.level)[0]
            .value
      )[0];
    }
  }
};
