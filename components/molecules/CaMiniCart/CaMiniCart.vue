<template>
  <button
    class="ca-mini-cart"
    aria-label="Open cart"
    @click="
      $store.commit('contentpanel/open', {
        name: 'cart'
      })
    "
  >
    <div class="ca-mini-cart__wrap">
      <CaIcon :name="cartIcon" class="ca-mini-cart__icon" />
      <CaNotificationBadge
        v-if="$store.getters['cart/totalQuantity'] > 0"
        class="ca-minicart__qty"
        :number="$store.getters['cart/totalQuantity']"
      />
    </div>
    <div
      v-if="$store.getters['cart/totalQuantity'] > 0"
      class="ca-mini-cart__value only-computer"
    >
      {{ $store.getters.getSellingPrice($store.state.cart.data.total) }}
    </div>
  </button>
</template>
<script>
// @group Molecules
// The cart displayed in the header<br><br>
// **SASS-path:** _./styles/components/molecules/ca-mini-cart.scss_
export default {
  name: 'CaMiniCart',
  props: {
    // Name for the icon to be used. See documentation for [CaIcon](/components/CaIcon) to learn more.
    cartIcon: {
      type: String,
      default: 'shopping-bag'
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
@import 'molecules/ca-mini-cart';
</style>
