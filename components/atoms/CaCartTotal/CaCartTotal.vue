<template>
  <div class="ca-cart-total">
    <div class="ca-cart-total__row ca-cart-total__row--total">
      <span class="ca-cart-total__label">{{ $t('CART_TOTAL') }}</span>
      <span class="ca-cart-total__value">
        {{ cartTotal.sellingPriceIncVatFormatted }}
      </span>
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Displays the summarized block of amounts in the bottom of the cart<br><br>
// **SASS-path:** _./styles/components/atoms/ca-cart-total.scss_
export default {
  name: 'CaCartTotal',
  mixins: [],
  props: {
    cartTotal: {
      type: Object,
      required: true
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
@import 'atoms/ca-cart-total';
</style>
