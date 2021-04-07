<template>
  <div class="ca-cart-summary">
    <div
      v-if="summary.total.isDiscounted && !simple"
      class="ca-cart-summary__row"
    >
      <span class="ca-cart-summary__label">
        {{ $t('CART_SUMMARY_ORD_PRICE') }}
      </span>
      <span class="ca-cart-summary__value">
        {{ summary.subTotal.regularPriceIncVatFormatted }}
      </span>
    </div>
    <div
      v-if="summary.total.isDiscounted && !simple"
      class="ca-cart-summary__row ca-cart-summary__row--discounted"
    >
      <span class="ca-cart-summary__label">
        {{ $t('CART_SUMMARY_DISCOUNT') }}
      </span>
      <span class="ca-cart-summary__value">
        - {{ summary.total.discountIncVatFormatted }}
      </span>
    </div>
    <div class="ca-cart-summary__row">
      <span class="ca-cart-summary__label">
        {{ $t('CART_SUMMARY_SUBTOTAL') }}
      </span>
      <span class="ca-cart-summary__value">
        {{ summary.subTotal.sellingPriceIncVatFormatted }}
      </span>
    </div>
    <div class="ca-cart-summary__row">
      <span class="ca-cart-summary__label">{{
        $t('CART_SUMMARY_SHIPPING_FEE')
      }}</span>
      <span
        class="ca-cart-summary__value"
        :class="{
          'ca-cart-summary__value--free-shipping': freeShipping
        }"
      >
        {{
          freeShipping
            ? $t('FREE_SHIPPING')
            : summary.shipping.shippingFeeIncVatFormatted
        }}
      </span>
      <div v-if="!freeShipping" class="ca-cart-summary__amount-left">
        <span class="ca-cart-summary__amount-left-sum">
          {{ summary.shipping.amountLeftToFreeShippingFormatted }}
        </span>
        kvar till fri frakt
      </div>
    </div>
    <div class="ca-cart-summary__row ca-cart-summary__row--total">
      <span class="ca-cart-summary__label">{{ $t('CART_TOTAL') }}</span>
      <span class="ca-cart-summary__value">
        {{ summary.total.sellingPriceIncVatFormatted }}
      </span>
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Displays the summarized block of amounts in the bottom of the cart<br><br>
// **SASS-path:** _./styles/components/atoms/ca-cart-summary.scss_
export default {
  name: 'CaCartSummary',
  mixins: [],
  props: {
    // Cart summary data from the api
    summary: {
      type: Object,
      required: true
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    freeShipping() {
      return this.summary.shipping.shippingFeeIncVat === 0;
    },
    subTotal() {
      return this.simple
        ? this.summary.subTotal.sellingPriceIncVatFormatted
        : this.summary.subTotal.regularPriceIncVatFormatted;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-cart-summary';
</style>
