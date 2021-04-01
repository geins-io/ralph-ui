<template>
  <div
    class="ca-checkout-carismar"
    :class="{ 'ca-checkout-carismar--loading': loading }"
  >
    <section class="ca-checkout-carismar__section">
      <h3 class="ca-checkout-carismar__title">
        {{
          addShippingAddress
            ? $t('BILLING_ADDRESS')
            : $t('CHECKOUT_YOUR_INFORMATION')
        }}
      </h3>
      <p class="ca-checkout-carismar__subtitle">
        {{ $t('CHECKOUT_SUBTITLE_COUNTRY_INFO') }}
        <CaFlag country="se" shape="circle" />
        {{ $t('SWEDEN') }}
      </p>
      <div
        class="ca-checkout-carismar__row ca-checkout-carismar__row--splitted"
      >
        <CaInputText
          id="email"
          v-model="checkout.email"
          class="ca-checkout-carismar__input"
          validate="email"
          autocomplete="email"
          :error-message="$t('EMAIL_ERROR_NOT_VALID')"
          :label="$t('EMAIL')"
        />
        <CaInputText
          id="phone"
          v-model="checkout.billingAddress.mobile"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="tel"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_PHONE_NUMBER')"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="identityNumber"
          v-model="checkout.identityNumber"
          class="ca-checkout-carismar__input"
          validate="personalId"
          error-message="Ange ett giltigt personnummer"
          :label="$t('LABEL_PERSONAL_ID')"
        />
      </div>
      <div
        class="ca-checkout-carismar__row ca-checkout-carismar__row--splitted"
      >
        <CaInputText
          id="firstNameBilling"
          v-model="checkout.billingAddress.firstName"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="given-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_FIRST_NAME')"
        />
        <CaInputText
          id="lastNameBilling"
          v-model="checkout.billingAddress.lastName"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="family-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_LAST_NAME')"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="careOfBilling"
          v-model="checkout.billingAddress.careOf"
          class="ca-checkout-carismar__input"
          :required="false"
          :label="$t('LABEL_CARE_OF')"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="addressBilling"
          v-model="checkout.billingAddress.addressLine1"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="street-address"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_ADDRESS')"
        />
      </div>
      <div
        class="ca-checkout-carismar__row ca-checkout-carismar__row--splitted"
      >
        <CaInputText
          id="zipBilling"
          v-model="checkout.billingAddress.zip"
          validate="empty"
          autocomplete="postal-code"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_ZIP')"
        />
        <CaInputText
          id="cityBilling"
          v-model="checkout.billingAddress.city"
          validate="empty"
          autocomplete="address-level2"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_CITY')"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="entryCodeBilling"
          v-model="checkout.billingAddress.entryCode"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_ENTRY_CODE')"
          :required="false"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputTextarea
          id="message"
          v-model="checkout.message"
          class="ca-checkout-carismar__input"
          :description="$t('CHECKOUT_MESSAGE_FIELD_DESCRIPTION')"
          :label="$t('LABEL_ORDER_MESSAGE')"
          :required="false"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputCheckbox
          id="addShipping"
          v-model="addShippingAddress"
          :label="$t('CHECKOUT_ADD_SHIPPING_ADDRESS')"
        />
      </div>
    </section>
    <SlideUpDown
      :active="addShippingAddress"
      :duration="200"
      class="ca-checkout-carismar__section ca-checkout-carismar__section--shipping"
      tag="section"
    >
      <h3 class="ca-checkout-carismar__title">{{ $t('SHIPPING_ADDRESS') }}</h3>
      <p class="ca-checkout-carismar__subtitle">
        {{ $t('CHECKOUT_SUBTITLE_COUNTRY_INFO') }}
        <CaFlag country="se" shape="circle" />
        {{ $t('SWEDEN') }}
      </p>
      <div
        class="ca-checkout-carismar__row ca-checkout-carismar__row--splitted"
      >
        <CaInputText
          id="firstNameShipping"
          v-model="checkout.shippingAddress.firstName"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="given-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_FIRST_NAME')"
        />
        <CaInputText
          id="lastNameShipping"
          v-model="checkout.shippingAddress.lastName"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="family-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_LAST_NAME')"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="careOfShipping"
          v-model="checkout.shippingAddress.careOf"
          class="ca-checkout-carismar__input"
          :required="false"
          :label="$t('LABEL_CARE_OF')"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="addressShipping"
          v-model="checkout.shippingAddress.addressLine1"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="street-address"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_ADDRESS')"
        />
      </div>
      <div
        class="ca-checkout-carismar__row ca-checkout-carismar__row--splitted"
      >
        <CaInputText
          id="zipShipping"
          v-model="checkout.shippingAddress.zip"
          validate="empty"
          autocomplete="postal-code"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_ZIP')"
        />
        <CaInputText
          id="cityShipping"
          v-model="checkout.shippingAddress.city"
          validate="empty"
          autocomplete="address-level2"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_CITY')"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="entryCodeShipping"
          v-model="checkout.shippingAddress.entryCode"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_ENTRY_CODE')"
          :required="false"
        />
      </div>
    </SlideUpDown>
    <section class="ca-checkout-carismar__section">
      <h3 class="ca-checkout-carismar__title">
        {{ $t('CHECKOUT_CONSENTS_TITLE') }}
      </h3>
      <p class="ca-checkout-carismar__subtitle">
        {{ $t('CHECKOUT_CONSENTS_TEXT') }}
      </p>
      <CaInputCheckbox
        v-for="(consent, index) in checkout.consents"
        :id="consent.type"
        :key="index"
        v-model="consent.checked"
        class="ca-checkout-carismar__consent"
      >
        <i18n
          v-if="consent.type === 'order'"
          path="CHECKOUT_CONSENT_ORDER"
          tag="span"
          class="ca-input-checkbox__label"
        >
          <a
            class="ca-checkout-carismar__consent-link"
            href="/kopvillkor"
            target="_blank"
            >{{ $t('CHECKOUT_TERMS') }}</a
          >
        </i18n>
        <span v-else class="ca-input-checkbox__label">
          {{ $t('CHECKOUT_CONSENT_' + consent.type.toUpperCase()) }}
        </span>
      </CaInputCheckbox>
    </section>
    <section
      class="ca-checkout-carismar__section ca-checkout-carismar__section--confirm"
    >
      <LazyCaFeedback
        ref="feedback"
        class="ca-checkout-carismar__feedback"
        type="error"
        message="Du måste godkänna köpvillkoren innan du slutför ditt köp"
      />
      <div class="ca-checkout-carismar__total">
        {{ $t('CHECKOUT_TOTAL') }}:
        <span class="ca-checkout-carismar__total-sum">
          {{ $store.state.cart.data.summary.total.sellingPriceIncVatFormatted }}
        </span>
      </div>
      <button
        type="button"
        class="ca-checkout-carismar__show-summary"
        @click="showSummary = !showSummary"
      >
        {{
          showSummary
            ? $t('CHECKOUT_HIDE_SUMMARY')
            : $t('CHECKOUT_SHOW_SUMMARY')
        }}
      </button>
      <SlideUpDown
        :active="showSummary"
        :duration="200"
        class="ca-checkout-carismar__summary-wrap"
      >
        <div class="ca-checkout-carismar__summary">
          <CaCartSummary :summary="$store.state.cart.data.summary" />
        </div>
      </SlideUpDown>
      <CaButton
        class="ca-checkout-carismar__place-order"
        size="l"
        :loading="loading"
        @clicked="placeOrder"
      >
        {{ $t('COMPLETE_ORDER') }}
      </CaButton>
    </section>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// The Carismar checkout frame. Used for paying with manual invoice or external payment options<br><br>
// **SASS-path:** _./styles/components/molecules/ca-checkout-carismar.scss_
import SlideUpDown from 'vue-slide-up-down';
export default {
  name: 'CaCheckoutCarismar',
  components: { SlideUpDown },
  mixins: [],
  props: {
    // The checkout data from the endpoint
    checkout: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    addShippingAddress: false,
    showSummary: false,
    loading: false
  }),
  computed: {
    orderConsentChecked() {
      return this.checkout.consents.find(i => i.type === 'order').checked;
    }
  },
  watch: {
    orderConsentChecked(val) {
      if (val) {
        this.$refs.feedback.hide();
      }
    }
  },
  mounted() {},
  methods: {
    placeOrder() {
      this.loading = true;
      if (!this.orderConsentChecked) {
        this.loading = false;
        this.$refs.feedback.show();
      } else {
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-checkout-carismar';
</style>
