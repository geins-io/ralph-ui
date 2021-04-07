<template>
  <div v-if="cartItems.length" class="ca-cart">
    <CaCartProduct
      v-for="(item, index) in cartItems"
      :key="index"
      class="ca-cart__product"
      :item="item"
      :mode="mode"
      @loading="toggleLoading"
    />
    <CaPromoCode
      v-if="mode !== 'display'"
      class="ca-cart__promo-code"
      :active-promo-code="cart.promoCode ? cart.promoCode : ''"
    />
    <div class="ca-cart__summary">
      <CaCampaigns
        v-if="cart.appliedCampaigns && cart.appliedCampaigns.length"
        class="ca-cart__campaigns"
        :campaigns="cart.appliedCampaigns"
        display="box"
      />
      <CaCartSummary class="ca-cart__total" :summary="cart.summary" />
    </div>
  </div>
  <div v-else class="ca-cart ca-cart--empty">
    {{ $t('CART_EMPTY') }}
  </div>
</template>
<script>
// @group Organisms
// @vuese
// Displaying the products in the cart, discount code field and cart summary<br><br>
// **SASS-path:** _./styles/components/organisms/ca-cart.scss_
export default {
  name: 'CaCart',
  mixins: [],
  props: {
    // Cart data object
    cart: {
      type: Object,
      required: true
    },
    // Set to display mode to show a non interactable cart
    mode: {
      // 'default', 'display'
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'display'].includes(value);
      }
    }
  },
  data: () => ({
    loading: false
  }),
  computed: {
    cartItems() {
      return this.cart.items ? this.cart.items : [];
    }
  },
  watch: {},
  mounted() {},
  methods: {
    toggleLoading(loading) {
      console.log(loading);
      this.loading = loading;
      this.$emit('loading', loading);
    }
  }
};
</script>
<style lang="scss">
@import 'organisms/ca-cart';
</style>
