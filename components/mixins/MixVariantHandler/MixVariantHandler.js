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
    }
  },
  watch: {},
  mounted() {},
  methods: {
    setDefaultSku() {
      const firstAvailable = this.currentVariant.variants.filter(
        i => i.stockQuantity > 0
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
