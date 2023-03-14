<template>
  <div class="ca-variant-picker">
    <slot name="title">
      <p
        v-if="title && panelRenderMode !== 'only-panel'"
        class="ca-variant-picker__title"
      >
        {{ title }}
      </p>
    </slot>
    <component
      :is="picker"
      :variants="variants"
      :variants-data="variantsData"
      :title="title"
      :render-mode="panelRenderMode"
      @replaceProduct="$emit('replaceProduct', $event)"
      @changeSku="$emit('changeSku', $event)"
      @notify="$emit('notify', $event)"
    />
  </div>
</template>
<script>
// @group Molecules
// @vuese
// The shell for all variant pickers. displays the title above and the picker chosen by type below<br><br>
// **SASS-path:** _./styles/components/molecules/ca-variant-picker.scss_
export default {
  name: 'CaVariantPicker',
  mixins: [],
  props: {
    // A list of variants (VariantType from the API)
    variants: {
      type: Array,
      required: true
    },
    // Variants picker data. A object consisting of variantDimensions, chosenSku and hasMultipleDimensions passed from MixVariantHandler
    variantsData: {
      type: Object,
      required: true
    },
    // The title for the picker
    title: {
      type: String,
      default: ''
    },
    // The type of picker to use. Accepts `color`, `display`, `panel` & `image`
    type: {
      // `color`, `display`, `panel`, `image`
      type: String,
      // `panel`
      default: 'panel',
      validator(value) {
        return ['color', 'display', 'panel', 'image'].includes(value);
      }
    },
    // Use if using type panel and the panel needs to be separated from button in layout)
    panelRenderMode: {
      // `both`, `only-panel`, `only-button`
      type: String,
      default: 'both',
      validator(value) {
        return ['both', 'only-panel', 'only-button'].includes(value);
      }
    }
  },
  data: () => ({}),
  computed: {
    picker() {
      switch (this.type) {
        case 'color':
          return 'CaVariantPickerColor';
        case 'display':
          return 'CaVariantPickerDisplay';
        case 'image':
          return 'CaVariantPickerImage';
        default:
          return 'CaVariantPickerPanel';
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
