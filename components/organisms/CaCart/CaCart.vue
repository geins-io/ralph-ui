<template>
  <div v-if="$store.getters.cartSum > 0" class="ca-cart">
    <CaCartProduct
      v-for="(product, index) in cartItems"
      :key="index"
      class="ca-cart__product"
      :product="product"
    />
    <CaCartTotal />
  </div>
  <div v-else class="ca-cart ca-cart--empty">
    {{ $t('CART_EMPTY') }}
  </div>
</template>
<script>
import CaCartProduct from 'CaCartProduct';
import CaCartTotal from 'CaCartTotal';
// @group Organisms
// @vuese
// Displaying the products in the cart, discount code field and cart summary
export default {
  name: 'CaCart',
  components: { CaCartProduct, CaCartTotal },
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    cartItems() {
      return this.$store.state.cart.items ? this.$store.state.cart.items : [];
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-cart {
  &__product {
    &:not(:last-child) {
      margin-bottom: $px16;
      padding-bottom: $px16;
      border-bottom: $border-light;
    }
  }
  &--empty {
    text-align: center;
    font-size: $font-size-l;
  }
}
</style>
