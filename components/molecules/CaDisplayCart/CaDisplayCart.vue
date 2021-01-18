<template>
  <CaContentPanel
    class="ca-display-cart"
    name="cart"
    :title="$t('CART') + ' (' + $store.getters['cart/totalQuantity'] + ')'"
  >
    <div
      v-if="cart.items && cart.items.length"
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
    <template v-if="cart.items && cart.items.length" #footer>
      <div class="ca-display-cart__footer">
        <CaCartTotal class="ca-display-cart__total" :cart-total="cart.total" />
        <CaButton type="full-width" size="l" href="/checkout">
          {{ $t('CART_TO_CHECKOUT') }}
        </CaButton>
      </div>
    </template>
  </CaContentPanel>
</template>
<script>
import CaButton from 'CaButton';
import CaCartProduct from 'CaCartProduct';
import CaCartTotal from 'CaCartTotal';
import { mapState } from 'vuex';
const CaContentPanel = () => ({
  component: import('CaContentPanel')
});
// @group Molecules
// @vuese
// The cart panel. Displays the current cart content in a content panel<br><br>
// **SASS-path:** _./styles/components/molecules/ca-display-cart.scss_
export default {
  name: 'CaDisplayCart',
  components: { CaContentPanel, CaButton, CaCartProduct, CaCartTotal },
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
