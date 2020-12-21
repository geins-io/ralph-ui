<template>
  <div class="ca-color-picker">
    <button
      v-for="(variant, index) in variants"
      :key="index"
      :title="variant.label"
      class="ca-color-picker__choice"
      :class="getModifiers(variant)"
      @click="chooseVariant(variant)"
    >
      <CaColorIcon
        class="ca-color-picker__color"
        size="big"
        :hex-color="variant.attributes[0].value"
      />
    </button>
  </div>
</template>
<script>
import CaColorIcon from 'CaColorIcon';
import MixVariantPicker from 'MixVariantPicker';
// @group Molecules
// @vuese
// Used to change a color variant of a product.<br><br>
// **SASS-path:** _./styles/components/molecules/ca-color-picker.scss_
export default {
  name: 'CaColorPicker',
  components: { CaColorIcon },
  mixins: [MixVariantPicker],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getModifiers(variant) {
      if (variant.level === 0) {
        return {
          'ca-color-picker__choice--disabled': !variant.stock.totalStock,
          'ca-color-picker__choice--chosen':
            variant.value === this.variantsData.chosenSku.value
        };
      } else {
        return {
          'ca-color-picker__choice--disabled': !variant.stock.totalStock,
          'ca-color-picker__choice--chosen':
            variant.value === this.getChosenValue(variant.level)
        };
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-color-picker';
</style>
