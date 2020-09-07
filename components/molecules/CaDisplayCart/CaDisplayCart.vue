<template>
  <CaContentPanel
    v-if="cart"
    class="ca-display-cart"
    name="cart"
    enter-from-mobile="right"
    :title="$t('CART') + ' (' + $store.getters['cart/totalQuantity'] + ')'"
  >
    <div v-if="cart.items.length" class="ca-display-cart__products">
      <CaCartProduct
        v-for="(product, index) in cart.items"
        :key="index"
        class="ca-display-cart__product"
        :product="product"
      />
    </div>
    <div v-else class="ca-display-cart__empty">{{ $t('CART_EMPTY') }}</div>
    <template v-if="cart.items.length" v-slot:footer>
      <div class="ca-display-cart__footer">
        <CaCartTotal class="ca-display-cart__total" :cart-total="cart.total" />
        <CaButton type="full-width" size="l" href="/checkout">
          Gå till kassan
        </CaButton>
      </div>
    </template>
  </CaContentPanel>
</template>
<script>
import CaContentPanel from 'CaContentPanel';
import CaButton from 'CaButton';
import CaCartProduct from 'CaCartProduct';
import CaCartTotal from 'CaCartTotal';
import { mapState } from 'vuex';

// @group Molecules
// @vuese
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
.ca-display-cart {
  &__products {
    padding: 0 $px12;
  }

  &__product {
    padding: $px12 0;
    &:not(:last-child) {
      border-bottom: $border-light;
    }
  }
  &__empty {
    font-weight: $font-weight-bold;
    font-size: $font-size-xl;
    @include calign;
  }
  &__footer {
    background: $c-lightest-gray;
    padding: $px16 $px12;
  }
  &__total {
    margin-bottom: $px16;
  }
}
</style>
