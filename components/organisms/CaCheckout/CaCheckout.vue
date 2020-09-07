<template>
  <div class="ca-checkout">
    <CaCheckoutHeader :title="$t('CHECKOUT')" />
    <CaCheckoutSection>
      <template v-slot:title>
        {{ $t('SHOP_AS') }}
      </template>
      <CaVatToggle class="ca-checkout__vat-toggle" />
    </CaCheckoutSection>
    <CaCheckoutSection :bottom-arrow="$store.getters['cart/totalQuantity'] > 0">
      <template v-slot:title>
        {{ $t('CART') }} ({{ $store.getters['cart/totalQuantity'] }})
      </template>
      <CaCart :cart="$store.state.cart.data" />
    </CaCheckoutSection>
    <CaCheckoutSection
      v-if="$store.getters['cart/totalQuantity'] > 0"
      :bottom-arrow="false"
    >
      <template v-slot:title>
        {{ $t('COMPLETE_ORDER') }}
      </template>
      <CaCheckoutKlarna />
    </CaCheckoutSection>
  </div>
</template>
<script>
import CaCheckoutHeader from 'CaCheckoutHeader';
import CaCheckoutSection from 'CaCheckoutSection';
import CaCart from 'CaCart';
import CaCheckoutKlarna from 'CaCheckoutKlarna';
import CaVatToggle from 'CaVatToggle';
// @group Organisms
// @vuese
// Holds the different sections of the checkout
export default {
  name: 'CaCheckout',
  components: {
    CaCheckoutHeader,
    CaCheckoutSection,
    CaCart,
    CaCheckoutKlarna,
    CaVatToggle
  },
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
.ca-checkout {
  max-width: $checkout-width;
  margin: 0 auto;
  padding-bottom: $px32;
  &__vat-toggle {
    justify-content: center;
    .ca-vat-toggle__link {
      display: flex;
      align-items: center;
      font-size: $font-size-xs;
      @include bp(tablet) {
        font-size: $font-size-s;
      }
      &:first-child {
        margin-right: $px16;
        @include bp(tablet) {
          margin-right: $px24;
        }
      }
      &:before {
        content: '';
        width: 20px;
        height: 20px;
        box-shadow: 0 0 0 1px $c-medium-gray;
        border: 5px solid $c-white;
        background: $c-white;
        border-radius: 50%;
        margin-right: $px8;
      }
      &--active {
        &:before {
          background: $c-darkest-gray;
        }
      }
    }
  }
}
</style>
