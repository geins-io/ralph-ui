<template>
  <CaAccordionItem class="ca-order-summary">
    <template #toggle-content="{open}">
      <div class="ca-order-summary__header">
        <div class="ca-order-summary__info">
          <span class="ca-order-summary__date">{{
            $d(new Date(order.createdAt))
          }}</span>
          <span class="ca-order-summary__count">
            {{ itemsCount }}
            {{ $tc('PRODUCT_LOWERCASE', itemsCount) }}
          </span>
          <span class="ca-order-summary__status">
            <CaStatusLabel
              :text="$t('ACCOUNT_ORDER_STATUS_' + order.status.toUpperCase())"
              :type="order.status"
            />
          </span>
          <span class="ca-order-summary__id">#{{ order.id }}</span>
          <span class="ca-order-summary__total">
            {{ $store.getters.getSellingPrice(order.cart.total) }}
          </span>
        </div>
        <CaButton
          v-if="$store.getters.viewport !== 'phone'"
          class="ca-order-summary__toggle"
          size="s"
          :color="open ? 'secondary' : 'primary'"
          :no-function="true"
        >
          <CaIconAndText
            :icon-name="open ? 'arrow-up' : 'arrow-down'"
            icon-position="right"
          >
            {{ $t('ACCOUNT_VIEW_DETAILS') }}
          </CaIconAndText>
        </CaButton>
        <CaIcon
          v-else
          class="ca-order-summary__toggle-icon"
          :name="open ? 'chevron-up' : 'chevron-down'"
        />
      </div>
    </template>
    <div class="ca-order-summary__details">
      <div class="ca-order-detail">
        <div class="ca-order-detail__methods">
          <div class="ca-order-detail__method">
            <h3 class="ca-order-detail__subtitle">
              {{ $t('SHIPPING_METHOD') }}
            </h3>
            {{ order.shippingDetails[0].name }}
          </div>
          <div class="ca-order-detail__method">
            <h3 class="ca-order-detail__subtitle">
              {{ $t('PAYMENT_METHOD') }}
            </h3>
            {{ order.paymentDetails[0].displayName }}
          </div>
        </div>
        <CaButton
          v-if="order.shippingDetails && order.shippingDetails[0].trackingLink"
          :href="order.shippingDetails[0].trackingLink"
          class="ca-order-detail__track"
          type="full-width"
        >
          {{ $t('TRACK_ORDER') }}
        </CaButton>
        <CaCart
          class="ca-order-detail__cart"
          mode="display"
          :cart="order.cart"
        />
        <div class="ca-order-detail__addresses">
          <div class="ca-order-detail__address">
            <h3 class="ca-order-detail__subtitle">
              {{ $t('BILLING_ADDRESS') }}
            </h3>
            <CaAddress :address="order.billingAddress" />
          </div>
          <div class="ca-order-detail__address">
            <h3 class="ca-order-detail__subtitle">
              {{ $t('SHIPPING_ADDRESS') }}
            </h3>
            <CaAddress :address="order.shippingAddress" />
          </div>
        </div>
      </div>
    </div>
  </CaAccordionItem>
</template>
<script>
// @group Molecules
// @vuese
// Order summary<br><br>
// **SASS-path:** _./styles/components/molecules/ca-order-summary.scss_
export default {
  name: 'CaOrderSummary',
  mixins: [],
  props: {
    // The order object obtained from the api
    order: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    itemsCount() {
      let count = 0;
      this.order.cart.items.forEach(i => (count += i.quantity));
      return count;
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-order-summary';
</style>
