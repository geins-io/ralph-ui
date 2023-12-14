<template>
  <div class="ca-variant-picker-image">
    <button
      v-for="(variant, index) in variants"
      :key="index"
      type="button"
      :title="variant.label"
      :aria-label="variant.label"
      class="ca-variant-picker-image__choice"
      :class="getModifiers(variant)"
      @click="chooseVariant(variant)"
    >
      <CaImage
        v-if="variant.primaryImage"
        class="ca-variant-picker-image__image"
        type="product"
        :size-array="
          $config.imageSizes.product.filter(
            (item) => parseInt(item.descriptor) <= 180,
          )
        "
        :alt="variant.alias"
        :filename="variant.primaryImage"
        :ratio="$config.productImageRatio"
        sizes="(min-width: 768px) 90px, 60px"
      />
    </button>
  </div>
</template>
<script>
import MixVariantPicker from 'MixVariantPicker';
// @group Molecules
// @vuese
// A variant picker in the form of images displayed next to each other. Accepts any type of variant. See **MixVariantPicker** for further information about mathods, props etc.<br><br><br><br>
// **SASS-path:** _./styles/components/molecules/ca-variant-picker-image.scss
export default {
  name: 'CaVariantPickerImage',
  mixins: [MixVariantPicker],
  props: {},
  data: () => ({
    baseClass: 'ca-variant-picker-image',
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-variant-picker-image';
</style>
