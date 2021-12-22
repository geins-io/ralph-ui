<template>
  <div class="ca-cart-summary">
    <div
      v-if="summary.total.isDiscounted && !simple"
      class="ca-cart-summary__row"
    >
      <span class="ca-cart-summary__label">
        {{ $t('CART_SUMMARY_REGULAR_PRICE') }}
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
      <span class="ca-cart-summary__label">
        {{
          summary.shipping.isDefault &&
          summary.shipping.amountLeftToFreeShipping !== 0
            ? $t('CART_SUMMARY_ESTIMATED_SHIPPING_FEE')
            : $t('CART_SUMMARY_SHIPPING_FEE')
        }}
      </span>
      <span
        class="ca-cart-summary__value"
        :class="{
          'ca-cart-summary__value--free-shipping': freeShipping
        }"
      >
        {{
          freeShipping
            ? $t('FREE_SHIPPING')
            : summary.shipping.feeIncVatFormatted
        }}
      </span>
      <div
        v-if="
          !freeShipping &&
            !display &&
            summary.shipping.amountLeftToFreeShipping !== -1
        "
        class="ca-cart-summary__amount-left"
      >
        <span class="ca-cart-summary__amount-left-sum">
          {{ summary.shipping.amountLeftToFreeShippingFormatted }}
        </span>
        {{ $t('CART_SUMMARY_LEFT_TO_FREE_SHIPPING') }}
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
    // A simpler version of the summary, only showing shipping and total
    simple: {
      type: Boolean,
      default: false
    },
    // Is this in a cart with display mode?
    display: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    freeShipping() {
      return this.summary.shipping.feeIncVat === 0;
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
