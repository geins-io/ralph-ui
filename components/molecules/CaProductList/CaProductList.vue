<template>
  <ul v-if="products && products.length" class="ca-product-list">
    <CaProductCard
      v-for="(product, index) in products"
      :key="index"
      :product="product"
      :page-number="getPageNumber(index)"
    >
    </CaProductCard>
  </ul>
</template>
<script>
import CaProductCard from 'CaProductCard';
// @group Molecules
// @vuese
// A list of product cards
export default {
  name: 'CaProductList',
  components: { CaProductCard },
  mixins: [],
  props: {
    // Array of products
    products: {
      type: Array,
      required: true
    },
    // Current page size
    pageSize: {
      type: Number,
      required: true
    },
    // Current skip
    skip: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Calculates what page number each product card is associated with
    // @arg index of product (Number)
    getPageNumber(index) {
      index++;
      return Math.ceil((index + this.skip) / this.pageSize);
    }
  }
};
</script>
<style lang="scss">
.ca-product-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: -$list-spacing;
}
</style>
