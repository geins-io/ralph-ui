import MixStockHandler from 'MixStockHandler';
// @group Mixins
// @vuese
export default {
  name: 'MixVariantPicker',
  mixins: [MixStockHandler],
  props: {
    // A list of variants (VariantType from the API)
    variants: {
      type: Array,
      required: true,
    },
    // Variants picker data. A object consisting of variantDimensions, chosenSku and hasMultipleDimensions passed from MixVariantHandler
    variantsData: {
      type: Object,
      required: true,
    },
    // The title for the picker
    title: {
      type: String,
      required: true,
    },
    // The product id, must be provided if multiple variants with same value exists, to show correct chosen-state
    productId: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    baseClass: '',
  }),
  computed: {
    // @vuese
    // Is variants of type color?
    // @type Boolean
    variantTypeColor() {
      return this.variants[0].dimension === 'Color';
    },
    // @vuese
    // Label of the chosen variant
    // @type String
    chosenLabel() {
      return this.chosenVariant
        ? this.chosenVariant.label
        : this.$t('SKU_NOT_CHOSEN');
    },
    // @vuese
    // Level of current variants
    // @type Number
    variantsLevel() {
      return this.variants[0].level;
    },
    // @vuese
    // Currently chosen variant
    // @type Object
    chosenVariant() {
      if (this.variantsLevel === 0) {
        return (
          this.variants.find(
            (i) => i.skuId === this.variantsData.chosenSku.id,
          ) || null
        );
      } else {
        return this.variants.filter(
          (i) =>
            i.value ===
            this.variantsData.variantDimensions.find(
              (ii) => ii.level === i.level,
            ).value,
        )[0];
      }
    },
    // @vuese
    // Currently chosen hex attribute if available
    // @type String
    chosenHex() {
      return this.variantTypeColor
        ? this.chosenVariant.attributes[0].value
        : '';
    },
    // @vuese
    // Chosen sku object
    // @type Object
    chosenSku() {
      return this.variantsData.chosenSku;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Get chosen value for specified level
    // @arg level (Number)
    getChosenValue(level) {
      return (
        this.variantsData.variantDimensions.find((i) => i.level === level)
          ?.value || ''
      );
    },
    // @vuese
    // Get stock status text for variant provided
    // @arg variant (Object)
    getStock(variant) {
      if (variant.level === 0) {
        return this.getStockStatusText(variant.stock);
      } else if (
        variant.level === 1 &&
        !this.variantsData.hasMultipleDimensions
      ) {
        const skuVariant = variant.variants.find(
          (i) => i.skuId === this.variantsData.chosenSku.id,
        );
        if (skuVariant) {
          return this.getStockStatusText(skuVariant.stock);
        } else {
          return this.getStockStatusText(variant.stock);
        }
      }
      // TODO? : Stöd för stock status för produkter med multipla varianter. Hitta stock på samma sätt som alias, em UX?
    },
    // @vuese
    // Choose variant. Emits relpaceProduct for non sku variants and changeSku for sku variants
    // @arg variant (Object)
    chooseVariant(variant) {
      this.$ralphBus.$emit('close-content-panel');
      if (variant.level === 0) {
        // @vuese
        // Sku variant is changed
        // @arg chosen sku data (Object)
        this.$emit('changeSku', { id: variant.skuId, value: variant.value });
      } else {
        // Level 1 & 2
        const productVariant =
          variant.level === 1
            ? variant
            : variant.variants.find((i) => i.value === this.getChosenValue(1));

        const alias = productVariant
          ? productVariant.alias
          : variant.variants[0].alias;

        this.$store.dispatch('loading/start');
        // @vuese
        // Non sku variant is changed
        // @arg prod alias (String)
        this.$emit('replaceProduct', alias);
      }
    },
    // @vuese
    // Get modifier classes for variant choice button
    // @arg variant (Object)
    getModifiers(variant) {
      const disabledClass = this.baseClass + '__choice--disabled';
      const chosenClass = this.baseClass + '__choice--chosen';
      const skuClass = this.baseClass + '__choice--sku';
      const classArray = [];
      const isSku = variant.level === 0;

      if (isSku) {
        classArray.push(skuClass);
      }

      if (!variant.stock.totalStock) {
        classArray.push(disabledClass);
        return classArray;
      }
      if (isSku && variant.skuId === this.variantsData.chosenSku.id) {
        classArray.push(chosenClass);
      } else if (!!this.productId && this.productId === variant.productId) {
        classArray.push(chosenClass);
      } else if (
        variant?.value === this.getChosenValue(variant?.level) &&
        !this.productId
      ) {
        classArray.push(chosenClass);
      }

      return classArray;
    },
  },
};
