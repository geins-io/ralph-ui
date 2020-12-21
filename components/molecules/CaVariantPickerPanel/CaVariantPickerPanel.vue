<template>
  <div class="ca-variant-picker-panel">
    <button
      class="ca-variant-picker-panel__trigger"
      @click="
        $store.commit('contentpanel/open', 'variant-picker-' + variantsLevel)
      "
    >
      <CaColorIcon
        v-if="variantTypeColor"
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
    <CaContentPanel :name="'variant-picker-' + variantsLevel" :title="title">
      <button
        v-for="(variant, index) in variants"
        :key="index"
        class="ca-variant-picker-panel__choice"
        :class="getModifiers(variant)"
        @click="chooseVariant(variant)"
      >
        <CaColorIcon
          v-if="variantTypeColor"
          class="ca-variant-picker-panel__color"
          :hex-color="variant.attributes[0].value"
        />
        <span class="ca-variant-picker-panel__label">{{ variant.label }}</span>
        <span class="ca-variant-picker-panel__stock">
          {{ getStock(variant) }}
        </span>
      </button>
    </CaContentPanel>
  </div>
</template>
<script>
import CaContentPanel from 'CaContentPanel';
import CaIconAndText from 'CaIconAndText';
import CaColorIcon from 'CaColorIcon';
import MixVariantPicker from 'MixVariantPicker';
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-variant-picker-panel-panel.scss_
export default {
  name: 'CaVariantPickerPanel',
  components: { CaContentPanel, CaIconAndText, CaColorIcon },
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
          'ca-variant-picker-panel__choice--disabled': !variant.stock
            .totalStock,
          'ca-variant-picker-panel__choice--chosen':
            variant.value === this.variantsData.chosenSku.value
        };
      } else {
        return {
          'ca-variant-picker-panel__choice--disabled': !variant.stock
            .totalStock,
          'ca-variant-picker-panel__choice--chosen':
            variant.value === this.getChosenValue(variant.level)
        };
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-variant-picker-panel';
</style>
