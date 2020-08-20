<template>
  <div class="ca-cart-total">
    <div class="ca-cart-total__row ca-cart-total__row--total">
      <span class="ca-cart-total__label">{{ $t('CART_TOTAL') }}</span>
      <span class="ca-cart-total__value">{{ $store.getters.cartTotal }}</span>
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
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-cart-total {
  // width: 50%;
  // margin-left: auto;
  margin-top: $px20;
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
