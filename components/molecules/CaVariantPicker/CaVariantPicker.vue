<template>
  <div class="ca-variant-picker">
    <slot name="title">
      <p class="ca-variant-picker__title">
        {{ title }}
      </p>
    </slot>
    <component
      :is="picker"
      :variants="variants"
      :variants-data="variantsData"
      :title="title"
      @replaceProduct="$emit('replaceProduct', $event)"
      @changeSku="$emit('changeSku', $event)"
    />
  </div>
</template>
<script>
import CaVariantPickerColor from 'CaVariantPickerColor';
import CaVariantPickerDisplay from 'CaVariantPickerDisplay';
import CaVariantPickerPanel from 'CaVariantPickerPanel';
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-variant-picker.scss_
export default {
  name: 'CaVariantPicker',
  components: {
    CaVariantPickerColor,
    CaVariantPickerDisplay,
    CaVariantPickerPanel
  },
  mixins: [],
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
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['color', 'display', 'panel'].includes(value);
      }
    }
  },
  data: () => ({}),
  computed: {
    picker() {
      switch (this.type) {
        case 'color':
          return CaVariantPickerColor;
        case 'display':
          return CaVariantPickerDisplay;
        default:
          return CaVariantPickerPanel;
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-variant-picker';
</style>
