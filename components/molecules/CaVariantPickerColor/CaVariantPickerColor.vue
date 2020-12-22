<template>
  <div class="ca-variant-picker-color">
    <button
      v-for="(variant, index) in variants"
      :key="index"
      :title="variant.label"
      class="ca-variant-picker-color__choice"
      :class="getModifiers(variant)"
      @click="chooseVariant(variant)"
    >
      <CaColorIcon
        class="ca-variant-picker-color__color"
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
// **SASS-path:** _./styles/components/molecules/ca-variant-picker-color.scss_
export default {
  name: 'CaVariantPickerColor',
  components: { CaColorIcon },
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
