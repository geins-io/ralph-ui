<template>
  <div class="ca-refund">
    <div class="ca-refund__date">{{ $d(new Date(refund.createdAt)) }}</div>
    <div v-if="cartItemName" class="ca-refund__product">
      {{ cartItemName }} / {{ skuValue }}
    </div>
    <div class="ca-refund__value">{{ formatCurrency(refund.total) }}</div>
  </div>
</template>
<script>
import MixNumberFormat from 'MixNumberFormat';
// @group Atoms
// @vuese
// A refund row<br><br>
// **SASS-path:** _./styles/components/atoms/ca-refund.scss_
export default {
  name: 'CaRefund',
  mixins: [MixNumberFormat],
  props: {
    // The refund object
    refund: {
      type: Object,
      required: true,
    },
    // The cart items
    cartItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({}),
  computed: {
    cartItem() {
      return this.cartItems.find((i) => i.skuId === this.refund.itemId);
    },
    cartItemName() {
      return this.cartItem ? this.cartItem.product.name : '';
    },
    skuValue() {
      return (
        this.cartItem?.product.skus.find((i) => i.skuId === this.refund.itemId)
          .name || ''
      );
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-refund';
</style>
