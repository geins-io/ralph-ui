<template>
  <LazyCaContentPanel
    class="ca-display-cart"
    name="cart"
    :title="$t('CART') + ' (' + $store.getters['cart/totalQuantity'] + ')'"
  >
    <div
      v-if="cart && cart.items && cart.items.length"
      class="ca-display-cart__products"
    >
      <CaCartProduct
        v-for="(item, index) in cart.items"
        :key="index"
        class="ca-display-cart__product"
        :item="item"
      />
    </div>
    <div v-else class="ca-display-cart__empty">{{ $t('CART_EMPTY') }}</div>
    <template v-if="cart && cart.items && cart.items.length" #footer>
      <div class="ca-display-cart__footer">
        <CaCartSummary
          class="ca-display-cart__summary"
          :summary="cart.summary"
        />
        <CaButton type="full-width" size="l" href="checkout">
          {{ $t('CART_TO_CHECKOUT') }}
        </CaButton>
      </div>
    </template>
  </LazyCaContentPanel>
</template>
<script>
import { mapState } from 'vuex';
// @group Molecules
// @vuese
// The cart panel. Displays the current cart content in a content panel<br><br>
// **SASS-path:** _./styles/components/molecules/ca-display-cart.scss_
export default {
  name: 'CaDisplayCart',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    ...mapState({
      cart: state => state.cart.data
    })
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-display-cart';
</style>
