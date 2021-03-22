<template>
  <div class="ca-variant-picker-color">
    <button
      v-for="(variant, index) in variants"
      :key="index"
      type="button"
      :title="variant.label"
      :aria-label="variant.label"
      class="ca-variant-picker-color__choice"
      :class="getModifiers(variant)"
      @click="chooseVariant(variant)"
    >
      <CaColorIcon
        class="ca-variant-picker-color__color"
        size="big"
        :hex-color="variant.attributes[0].value || 'FFF'"
      />
    </button>
  </div>
</template>
<script>
import MixVariantPicker from 'MixVariantPicker';
// @group Molecules
// @vuese
// A variant picker in form of colors icons. Only works for variants with a HEX-attribute provided. See **MixVariantPicker** for further information about mathods, props etc.<br><br><br><br>
// **SASS-path:** _./styles/components/molecules/ca-variant-picker-color.scss_
export default {
  name: 'CaVariantPickerColor',
  mixins: [MixVariantPicker],
  props: {},
  data: () => ({
    baseClass: 'ca-variant-picker-color'
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-variant-picker-color';
</style>
