<template>
  <div v-if="cartItems.length" class="ca-cart">
    <CaFeedback
      v-if="hasOversellable"
      class="ca-cart__feedback"
      :message="$t('OVERSELLABLE_CART_MESSAGE')"
      :constant="true"
    />
    <CaCartProduct
      v-for="(item, index) in cartItems"
      :key="index"
      class="ca-cart__product"
      :item="item"
      :mode="mode"
      :refunded="isRefunded(item.skuId)"
      @loading="toggleLoading"
      @stock-status-change="handleStockStatus"
      @remove="removeHandler"
    />
    <CaPromoCode
      v-if="mode !== 'display' && $config.checkout.promoCodes"
      class="ca-cart__promo-code"
      :active-promo-code="cart.promoCode ? cart.promoCode : ''"
    />
    <div class="ca-cart__summary">
      <CaCampaigns
        v-if="showCampaigns"
        class="ca-cart__campaigns"
        :campaigns="cart.appliedCampaigns"
        display="box"
      />
      <CaCartSummary
        class="ca-cart__total"
        :summary="cart.summary"
        :display="mode === 'display'"
      />
    </div>
  </div>
  <div v-else-if="cart.items" class="ca-cart ca-cart--empty">
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
    },
    // Refunded item id's, for displaying refunded cart items
    refundedItems: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    loading: false,
    stockStatuses: []
  }),
  computed: {
    cartItems() {
      return this.cart?.items ? this.cart.items : [];
    },
    showCampaigns() {
      const campaigns = this.cart.appliedCampaigns
        ? this.cart.appliedCampaigns.filter(i => !i.hideTitle)
        : [];
      return campaigns.length > 0;
    },
    hasOversellable() {
      const oversellable = this.stockStatuses.filter(
        i => i.stockStatus === 'OVERSELLABLE'
      );
      return oversellable.length > 0;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    toggleLoading(loading) {
      this.loading = loading;
      // Emits true when loading starts and false when loading ends
      this.$emit('loading', loading);
    },
    handleStockStatus(data) {
      const prod = this.stockStatuses.find(i => i.skuId === data.skuId);
      if (prod) {
        this.stockStatuses.map(i => {
          if (i.skuId === data.skuId) {
            i.stockStatus = data.stockStatus;
          }
          return i;
        });
      } else {
        this.stockStatuses.push(data);
      }
    },
    removeHandler(skuId) {
      this.stockStatuses = this.stockStatuses.filter(i => i.skuId !== skuId);
    },
    isRefunded(id) {
      return this.refundedItems?.length
        ? this.refundedItems.includes(id)
        : false;
    }
  }
};
</script>
<style lang="scss">
@import 'organisms/ca-cart';
</style>
