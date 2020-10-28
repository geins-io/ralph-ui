// @group mixins
// Handler of product variant data. Expects product object
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
    variantGroups() {
      return this.product ? this.product.variantGroups[0] : null;
    },
    hasVariants() {
      return this.variantGroups && this.variantGroups.variants.length > 1;
    },
    currentVariant() {
      return this.variantGroups
        ? this.variantGroups.variants.filter(
            i => i.productId === this.product.productId
          )[0]
        : null;
    },
    hasColorVariants() {
      return (
        this.variantGroups &&
        this.variantGroups.variantLevels.filter(i => i.name === 'Color')
          .length > 0
      );
    },
    colorVariants() {
      return this.hasColorVariants
        ? this.variantGroups.variantLevels.filter(i => i.name === 'Color')[0]
        : null;
    },
    colorProductAliases() {
      return this.variantGroups.variants.map(i => {
        return i.level === this.colorVariants.level ? i.alias : '';
      });
    },
    hasSkuVariants() {
      return this.currentVariant.variants.length > 1;
    },
    skuVariants() {
      return this.hasSkuVariants ? this.currentVariant.variants : null;
    },
    currentStock() {
      if (this.currentVariant) {
        const chosenItem = this.currentVariant.variants.filter(
          i => i.skuId === this.chosenSku.id
        )[0];
        if (chosenItem) {
          return chosenItem.stock.totalStock;
        } else {
          return this.currentVariant.stock.totalStock;
        }
      } else return 0;
    },
    stockStatus() {
      if (this.currentStock === 0) {
        return 'outOfStock';
      } else if (this.currentStock < this.$config.productStockFewLeftLimit) {
        return 'fewLeft';
      } else {
        return 'inStock';
      }
    },
    stockStatusText() {
      switch (this.stockStatus) {
        case 'outOfStock':
          return 'Slut i lager';
        case 'fewLeft':
          return 'Bara ' + this.currentStock + ' kvar';
        case 'inStock':
          return 'I lager';
        default:
          return 'I lager';
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {
    setDefaultSku() {
      const firstAvailable = this.currentVariant.variants.filter(
        i => i.stock.totalStock > 0
      )[0];
      if (firstAvailable) {
        this.setSku(firstAvailable.skuId, firstAvailable.value);
      }
    },
    setSku(id, value) {
      this.chosenSku.id = id;
      this.chosenSku.value = value;
    },
    resetSku() {
      this.setSku(null, '');
    }
  }
};
