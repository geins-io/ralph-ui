<template>
  <div class="ca-cart-total">
    <div class="ca-cart-total__row ca-cart-total__row--total">
      <span class="ca-cart-total__label">{{ $t('CART_TOTAL') }}</span>
      <span class="ca-cart-total__value">
        {{ $store.getters.getSellingPrice(cartTotal) }}
      </span>
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Displays the summarized block of amounts in the bottom of the cart
export default {
  name: 'CaCartTotal',
  components: {},
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
.ca-cart-total {
  &__row {
    display: flex;
    justify-content: space-between;
    &--total {
      font-size: $font-size-l;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
