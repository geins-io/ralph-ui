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
        {{ $store.getters.getRegularPrice(summary.subTotal) }}
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
        -
        {{
          vatIncluded
            ? summary.total.discountIncVatFormatted
            : summary.total.discountExVatFormatted
        }}
      </span>
    </div>
    <div class="ca-cart-summary__row">
      <span class="ca-cart-summary__label">
        {{ $t('CART_SUMMARY_SUBTOTAL') }}
      </span>
      <span class="ca-cart-summary__value">
        {{ $store.getters.getSellingPrice(summary.subTotal) }}
      </span>
    </div>
    <div v-if="!vatIncluded" class="ca-cart-summary__row">
      <span class="ca-cart-summary__label">
        {{ $t('CART_SUMMARY_VAT') }}
      </span>
      <span class="ca-cart-summary__value">
        {{ summary.total.vatFormatted }}
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
            : vatIncluded
            ? summary.shipping.feeIncVatFormatted
            : summary.shipping.feeExVatFormatted
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
    <div v-if="summary.balance.pending > 0" class="ca-cart-summary__balance">
      <div class="ca-cart-summary__row ca-cart-summary__row--balance-total">
        <span class="ca-cart-summary__label">
          {{ $t('CART_SUMMARY_TOTAL_EX_BALANCE') }}
        </span>
        <span class="ca-cart-summary__value">
          {{ summary.balance.totalSellingPriceExBalanceIncVatFormatted }}
        </span>
      </div>
      <div class="ca-cart-summary__row">
        <span class="ca-cart-summary__label">
          {{ $t('CART_SUMMARY_BALANCE') }}
        </span>
        <span class="ca-cart-summary__value">
          - {{ summary.balance.pendingFormatted }}
        </span>
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
    },
    vatIncluded() {
      return this.$store.state.vatIncluded;
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
