<template>
  <ul class="ca-product-list" :class="{ 'ca-product-list--empty': isEmpty }">
    <CaProductCard
      v-for="(product, index) in allProducts"
      :key="index"
      :product="product"
      :page-number="getPageNumber(index)"
      :product-card-type="productCardType"
    />
    <li v-if="isEmpty" class="ca-product-list__empty">
      {{ $t('SEARCH_NO_RESULTS') }}
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
      default: 0
    },
    // Type of product card, to be able to display slightly different product cards in different product lists
    productCardType: {
      type: String,
      default: 'default'
    }
  },
  data: () => ({}),
  computed: {
    allProducts() {
      return this.products.length === 0 ? this.skeletonProducts : this.products;
    },
    skeletonProducts() {
      const prodArray = [];
      if (!this.isEmpty) {
        for (let i = 0; i < this.pageSize; i++) {
          prodArray.push({});
        }
      }
      return prodArray;
    },
    isEmpty() {
      return (
        this.$route?.name?.includes('search') && this.products.length === 0
      );
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
