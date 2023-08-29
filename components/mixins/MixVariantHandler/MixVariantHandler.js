import MixStockHandler from 'MixStockHandler';
// @group Mixins
// @vuese
// Handling all product variant data. Expects product object to work with. Is using MixStockHandler<br><br>
// **Data:**<br>
// chosenSku: `{ id: null, value: '' }`<br>
export default {
  name: 'MixVariantHandler',
  mixins: [MixStockHandler],
  props: {},
  data: () => ({
    chosenSku: {
      id: null,
      value: '',
    },
  }),
  computed: {
    // @vuese
    // A list of variants on the base level of variants data
    // @type Array
    baseVariants() {
      return this.product ? this.product?.variantGroup?.variants || [] : [];
    },
    // @vuese
    // Does more than one base variant exist?
    // @type Boolean
    hasVariants() {
      return this.baseVariants?.length > 1;
    },
    // @vuese
    // Current variant on the base level
    // @type Object
    currentBaseVariant() {
      return this.baseVariants?.length
        ? this.getCurrentVariant(this.baseVariants)
        : null;
    },
    // @vuese
    // Type of the current base level variant
    // @type String
    baseVariantType() {
      return this.currentBaseVariant ? this.currentBaseVariant.dimension : null;
    },
    baseVariantLabel() {
      return this.currentBaseVariant ? this.currentBaseVariant.label : '';
    },
    // @vuese
    // Does more than one dimension of variants exist on this product?
    // @type Boolean
    hasMultipleDimensions() {
      return this.baseVariants?.length
        ? this.currentBaseVariant.level > 1
        : false;
    },
    // @vuese
    // List of the second dimension variants for the current variant
    // @type Array
    secondDimensionVariants() {
      return this.hasMultipleDimensions ? this.currentBaseVariant.variants : [];
    },
    // @vuese
    // The currently chosen variant on the second dimension level
    // @type Object
    currentSecondDimensionVariant() {
      return this.secondDimensionVariants.length
        ? this.getCurrentVariant(this.secondDimensionVariants)
        : null;
    },
    // @vuese
    // The type of the current second dimension variant
    // @type String
    secondDimensionVariantType() {
      return this.currentSecondDimensionVariant
        ? this.currentSecondDimensionVariant.dimension
        : null;
    },
    // @vuese
    // The variant object for the current product
    // @type Object
    currentProductVariant() {
      return this.baseVariants?.length
        ? this.checkForProductVariant(this.baseVariants)
        : null;
    },
    // @vuese
    // The list of sku variants for the current product
    // @type Array
    skuVariants() {
      return this.currentProductVariant
        ? this.currentProductVariant.variants
        : [];
    },
    // @vuese
    // Does more than one sku variants exist for current product?
    // @type Boolean
    hasSkuVariants() {
      return this.skuVariants.length > 1;
    },
    // @vuese
    // Is a sku chosen?
    // @type Boolean
    skuIsChosen() {
      return this.chosenSku.id !== null && this.chosenSku.value !== '';
    },
    // @vuese
    // The variant object for the chosen sku
    // @type Object
    chosenSkuVariant() {
      return this.skuIsChosen
        ? this.skuVariants.filter((i) => i.value === this.chosenSku.value)[0]
        : null;
    },
    // @vuese
    // The stock total for the chosen sku
    // @type Number
    chosenSkuStock() {
      return this.chosenSkuVariant ? this.chosenSkuVariant.stock.totalStock : 0;
    },
    // @vuese
    // Id for the chosen sku, used for watching
    // @type Number
    chosenSkuId() {
      return this.skuIsChosen && this.chosenSkuVariant
        ? this.chosenSkuVariant.skuId
        : this.chosenSku.id;
    },
    chosenSkuLabel() {
      return this.skuIsChosen && this.chosenSkuVariant
        ? this.chosenSkuVariant.label
        : '';
    },
    // @vuese
    // Return total stock quantity based on chosen sku variant or else product total stock. Overriding currentStock from MixStockHandler
    // @type Number
    currentStock() {
      if (this.skuVariants?.length && this.product.totalStock) {
        if (this.chosenSkuVariant) {
          return this.chosenSkuVariant.stock;
        } else {
          return this.product.totalStock;
        }
      } else {
        return this.defaultStock;
      }
    },
    // @vuese
    // The object of data needed by the variant pickers to work properly
    // @type Object
    variantPickerData() {
      const dataObj = {};
      dataObj.variantDimensions = this.product.variantDimensions;
      dataObj.chosenSku = this.chosenSku;
      dataObj.hasMultipleDimensions = this.hasMultipleDimensions;
      return dataObj;
    },
  },
  watch: {
    'currentStock.totalStock'(val) {
      if (val === 0) {
        // The chosen size no longer has a stock quantity, chosenSku needs a reset
        this.resetSku();
      }
    },
    chosenSkuId(val) {
      if (val !== this.chosenSku.id && val !== null) {
        this.setSku(val, this.chosenSku.value);
      }
    },
  },
  mounted() {},
  methods: {
    // @vuese
    // Function to set default sku when no variants exists
    setDefaultSku() {
      const firstAvailable = this.skuVariants.filter(
        (i) => i.stock.totalStock > 0,
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
    // @vuese
    // Looks for the product variant level until found and then returns the current Product variant
    // @arg variants (Array)
    checkForProductVariant(variants) {
      if (!variants[0]) {
        const currentVariant = this.getCurrentVariant(variants.slice(1));
        if (currentVariant?.level === 1) {
          return currentVariant;
        } else {
          return this.checkForProductVariant(currentVariant?.variants);
        }
      } else {
        const currentVariant = this.getCurrentVariant(variants);
        if (currentVariant?.level === 1) {
          return currentVariant;
        } else {
          return this.checkForProductVariant(currentVariant?.variants);
        }
      }
    },
    // @vuese
    // Get the current chosen variant for the passed in variants level
    // @arg variants (Array)
    getCurrentVariant(variants) {
      return (
        variants.filter(
          (i) =>
            i?.value ===
            this.product.variantDimensions.filter(
              (ii) => ii?.level === i?.level,
            )[0]?.value,
        )[0] || variants[0]
      );
    },
  },
};
