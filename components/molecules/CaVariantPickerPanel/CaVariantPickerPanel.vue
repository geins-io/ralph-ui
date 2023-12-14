<template>
  <div class="ca-variant-picker-panel">
    <button
      v-if="renderMode !== 'only-panel'"
      type="button"
      class="ca-variant-picker-panel__trigger"
      @click="
        $store.commit('contentpanel/open', {
          name: 'variant-picker-' + variantsLevel,
        })
      "
    >
      <CaColorIcon
        v-if="variantTypeColor && chosenHex"
        class="ca-variant-picker-panel__trigger-color"
        :hex-color="chosenHex"
      />
      <CaIconAndText
        class="ca-variant-picker-panel__trigger-text"
        icon-name="chevron-right"
        icon-position="right"
      >
        {{ chosenLabel }}
      </CaIconAndText>
    </button>
    <LazyCaContentPanel
      v-if="renderMode !== 'only-button'"
      :name="'variant-picker-' + variantsLevel"
      :title="title"
    >
      <div
        v-for="(variant, index) in variants"
        :key="index"
        class="ca-variant-picker-panel__opt"
      >
        <button
          type="button"
          class="ca-variant-picker-panel__choice"
          :class="getModifiers(variant)"
          @click="chooseVariant(variant)"
        >
          <CaColorIcon
            v-if="variantTypeColor && variant.attributes"
            class="ca-variant-picker-panel__color"
            :hex-color="variant.attributes[0].value"
          />
          <span class="ca-variant-picker-panel__label">
            {{ variant.label }}
          </span>
          <span class="ca-variant-picker-panel__stock">
            {{ getStock(variant) }}
          </span>
        </button>
        <button
          v-if="variant.stock.totalStock === 0 && variant.level === 0"
          type="button"
          class="ca-variant-picker-panel__notify"
          @click="$emit('notify', variant)"
        >
          {{ $t('NOTIFY_ME') }}
        </button>
      </div>
    </LazyCaContentPanel>
  </div>
</template>
<script>
import MixVariantPicker from 'MixVariantPicker';
// @group Molecules
// @vuese
// A variant picker in form of a content panel. Accepts any type of variant and is the default variant picker. See **MixVariantPicker** for further information about mathods, props etc.<br><br>
// **SASS-path:** _./styles/components/molecules/ca-variant-picker-panel.scss_
export default {
  name: 'CaVariantPickerPanel',
  mixins: [MixVariantPicker],
  props: {
    // Use if panel needs to be separated from button in layout
    renderMode: {
      type: String,
      default: 'both',
      validator: (value) =>
        ['both', 'only-panel', 'only-button'].includes(value),
    },
  },
  data: () => ({
    baseClass: 'ca-variant-picker-panel',
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-variant-picker-panel';
</style>
