<template>
  <div class="ca-stock-display" :class="stockClass">
    {{ stockStatusText }}
    <span
      v-if="showDeliveryTime && !outOfStock"
      class="ca-stock-display__delivery-time"
    >
      {{ stockStatusDeliveryTime }}
    </span>
  </div>
</template>
<script>
import MixStockHandler from 'MixStockHandler';
// @group Atoms
// @vuese
// Stock status display<br><br>
// **SASS-path:** _./styles/components/atoms/ca-stock-display.scss_
export default {
  name: 'CaStockDisplay',
  mixins: [MixStockHandler],
  props: {
    // Stock object
    stock: {
      type: Object,
      required: true,
    },
    // Product quantity
    productQuantity: {
      type: Number,
      default: 1,
    },
    // Show delivery time or not
    showDeliveryTime: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    quantity: 1,
  }),
  computed: {
    currentStock() {
      return this.stock;
    },
    stockClass() {
      const stockClass = this.getStockStatusClass();
      return stockClass ? 'ca-stock-display--' + stockClass : '';
    },
  },
  watch: {
    productQuantity(val) {
      this.quantity = val;
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-stock-display';
</style>
