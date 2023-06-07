<template>
  <ul class="ca-product-package-selected-options-list">
    <li
      v-for="(option, index) in options"
      :key="index"
      class="ca-product-package-selected-options-list__item"
    >
      <p class="ca-product-package-selected-options-list__info">
        <span class="ca-product-package-selected-options-list__quantity">
          {{ option.quantity }}x
        </span>
        <span class="ca-product-package-selected-options-list__name">
          {{ option.product.name }}
        </span>
      </p>
    </li>
  </ul>
</template>
<script>
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-product-package-selected-options-list.scss_
export default {
  name: 'CaProductPackageSelectedOptionsList',
  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-product-package-selected-options-list';
</style>
