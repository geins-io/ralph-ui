<template>
  <div>
    <div v-if="nostoId" :id="nostoId" class="nosto_element"></div>
    <ul class="ca-quick-add-products">
      <li
        v-for="(product, index) in productsData"
        :key="index"
        class="ca-quick-add-products__item"
      >
        <CaQuickAddProduct :product="product" />
      </li>
    </ul>
  </div>
</template>
<script>
import MixNostoSection from 'MixNostoSection';

// @group Molecules
// @vuese
// A list of quick add products<br><br>
// **SASS-path:** _./styles/components/molecules/ca-quick-add-products.scss_
export default {
  name: 'CaQuickAddProducts',
  mixins: [MixNostoSection],
  props: {
    // A list of products
    products: {
      type: Array,
      default: () => []
    },
    nostoId: {
      type: [String, null],
      default: null
    }
  },
  data: () => ({}),
  computed: {
    productsData() {
      return this.nostoId ? this.nostoProducts : this.products;
    },
    nostoProducts() {
      const nostoProducts = this.nostoData?.products;
      if (nostoProducts) {
        return this.formatNostoData(nostoProducts);
      }
      return [];
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-quick-add-products';
</style>
