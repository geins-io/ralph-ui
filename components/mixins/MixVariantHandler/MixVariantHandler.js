// @group mixins
// Handler of product variant data. Expects product object
export default {
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    variantGroups() {
      return this.product.variantGroups[0];
    },
    hasVariants() {
      return this.variantGroups.variants.length > 1;
    },
    currentVariant() {
      return this.variantGroups.variants.filter(
        i => i.productId === this.product.productId
      )[0];
    },
    hasColorVariants() {
      return (
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
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
