<template>
  <ul class="ca-product-list">
    <CaProductCard
      v-for="(product, index) in allProducts"
      :key="index"
      :product="product"
      :page-number="getPageNumber(index)"
    />
    <li v-if="productsEmpty" class="ca-product-list__empty">
      {{ $t('NO_PRODUCTS_MATCH') }}
    </li>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
// A list of product cards<br><br>
// **SASS-path:** _./styles/components/molecules/ca-product-list.scss_
export default {
  name: 'CaProductList',
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
    },
    // Are any filters active for the products data?
    filtersActive: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    allProducts() {
      return this.products.length === 0 && !this.filtersActive
        ? this.skeletonProducts
        : this.products;
    },
    skeletonProducts() {
      const prodArray = [];
      for (let i = 0; i < this.pageSize; i++) {
        prodArray.push({});
      }
      return prodArray;
    },
    productsEmpty() {
      return this.products.length === 0 && this.filtersActive;
    }
  },
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
@import 'molecules/ca-product-list';
</style>
