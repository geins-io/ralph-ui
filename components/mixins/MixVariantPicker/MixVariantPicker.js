import MixStockHandler from 'MixStockHandler';
import eventbus from '~/plugins/event-bus.js';
// @group mixins
// @vuese
export default {
  components: {},
  mixins: [MixStockHandler],
  props: {
    variants: {
      type: Array,
      required: true
    },
    variantsData: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    variantTypeColor() {
      return this.variants[0].dimension === 'Color';
    },
    chosenLabel() {
      return this.chosenVariant
        ? this.chosenVariant.label
        : this.$t('SKU_NOT_CHOSEN');
    },
    variantsLevel() {
      return this.variants[0].level;
    },
    chosenVariant() {
      if (this.variantsLevel === 0) {
        return (
          this.variants.filter(
            i => i.skuId === this.variantsData.chosenSku.id
          )[0] || null
        );
      } else {
        return this.variants.filter(
          i =>
            i.value ===
            this.variantsData.variantDimensions.filter(
              ii => ii.level === i.level
            )[0].value
        )[0];
      }
    },
    chosenHex() {
      return this.variantTypeColor
        ? this.chosenVariant.attributes[0].value
        : '';
    },
    chosenSku() {
      return this.variantsData.chosenSku;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getChosenValue(level) {
      return this.variantsData.variantDimensions.filter(
        i => i.level === level
      )[0].value;
    },
    getStock(variant) {
      if (variant.level === 0) {
        return this.getStockStatusText(variant.stock.totalStock);
      } else if (
        variant.level === 1 &&
        !this.variantsData.hasMultipleDimensions
      ) {
        const skuVariant = variant.variants.filter(
          i => i.value === this.variantsData.chosenSku.value
        )[0];
        if (skuVariant) {
          return this.getStockStatusText(skuVariant.stock.totalStock);
        } else {
          return this.getStockStatusText(variant.stock.totalStock);
        }
      }
      // TODO? : Stöd för stock status för produkter med multipla varianter. Hitta stock på samma sätt som alias, em UX?
    },
    chooseVariant(variant) {
      eventbus.$emit('close-content-panel');
      if (variant.level === 0) {
        this.$emit('changeSku', { id: variant.skuId, value: variant.value });
      } else {
        // Level 1 & 2
        const alias =
          variant.level === 1
            ? variant.alias
            : variant.variants.filter(
                i => i.value === this.getChosenValue(1)
              )[0].alias;

        this.$store.dispatch('loading/start', 300);
        // @vuese
        // Variant is changed
        // @arg prod alias (String)
        this.$emit('replaceProduct', alias);
      }
    }
  }
};
