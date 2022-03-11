<template>
  <ul class="ca-quick-add-products">
    <li
      v-for="(product, index) in products"
      :key="index"
      class="ca-quick-add-products__item"
    >
      <CaQuickAddProduct :product="product" />
    </li>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
// A list of quick add products<br><br>
// **SASS-path:** _./styles/components/molecules/ca-quick-add-products.scss_
export default {
  name: 'CaQuickAddProducts',
  mixins: [],
  props: {
    // A list of products
    products: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-quick-add-products';
</style>
