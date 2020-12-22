<template>
  <div class="ca-variant-picker-display">
    <div
      v-for="(variant, index) in variants"
      :key="index"
      class="ca-variant-picker-display__holder"
    >
      <button
        class="ca-variant-picker-display__choice"
        :class="getModifiers(variant)"
        @click="chooseVariant(variant)"
      >
        {{ variant.label }}
      </button>
      <!-- <button v-if="!size.stock.totalStock" class="ca-variant-picker-display__notify">
        Bevaka
      </button> -->
    </div>
  </div>
</template>
<script>
import MixVariantPicker from 'MixVariantPicker';
// @group Molecules
// @vuese
// A variant picker in form of boxes displayed next to each other. Accepts any type of variant. See **MixVariantPicker** for further information about mathods, props etc.<br><br><br><br>
// **SASS-path:** _./styles/components/atoms/ca-variant-picker-display.scss_
export default {
  name: 'CaVariantPickerDisplay',
  components: {},
  mixins: [MixVariantPicker],
  props: {},
  data: () => ({
    baseClass: 'ca-variant-picker-display'
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-variant-picker-display';
</style>
