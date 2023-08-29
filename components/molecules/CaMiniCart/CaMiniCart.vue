<template>
  <CaClickable
    class="ca-mini-cart"
    :aria-label="$t('CART')"
    @clicked="
      $store.commit('contentpanel/open', {
        name: 'cart',
      })
    "
  >
    <div class="ca-mini-cart__wrap">
      <CaIcon :name="cartIcon" class="ca-mini-cart__icon" />
      <client-only>
        <CaNotificationBadge
          v-if="$store.getters['cart/totalQuantity'] > 0"
          class="ca-mini-cart__qty"
          :number="$store.getters['cart/totalQuantity']"
        />
      </client-only>
    </div>
    <client-only>
      <div
        v-if="$store.getters['cart/totalQuantity'] > 0"
        class="ca-mini-cart__value only-computer"
      >
        {{
          $store.getters.getSellingPrice(
            $store.state.cart.data.summary.subTotal,
          )
        }}
      </div>
    </client-only>
  </CaClickable>
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
      default: 'shopping-bag',
    },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-mini-cart';
</style>
