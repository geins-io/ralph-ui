<template>
  <div class="ca-price" :class="modifiers">
    <span class="ca-price__selling">{{ sellingPrice }}</span>
    <span v-if="price.isDiscounted" class="ca-price__regular">
      {{ regularPrice }}
    </span>
    <span v-if="!vatIncluded" class="ca-price__ex-vat">
      {{ $t('EX_VAT') }}
    </span>
  </div>
</template>
<script>
import MixPrice from 'MixPrice';
// @group Atoms
// @vuese
// The product price<br><br>
// **SASS-path:** _./styles/components/atoms/ca-price.scss_
export default {
  name: 'CaPrice',
  mixins: [MixPrice],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-price';
</style>
