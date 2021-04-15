<template>
  <div
    class="ca-checkout-carismar"
    :class="{ 'ca-checkout-carismar--loading': loading }"
  >
    <section class="ca-checkout-carismar__section">
      <h3 class="ca-checkout-carismar__title">
        {{
          checkoutData.addShippingAddress
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
          ref="email"
          v-model="checkoutData.email"
          class="ca-checkout-carismar__input"
          validate="email"
          autocomplete="email"
          :error-message="$t('EMAIL_ERROR_NOT_VALID')"
          :label="$t('EMAIL')"
          @validation="checkValid"
        />
        <CaInputText
          id="phone"
          ref="phone"
          v-model="checkoutData.billingAddress.mobile"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="tel"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_PHONE_NUMBER')"
          @validation="checkValid"
        />
      </div>
      <div
        v-if="$config.checkout.identityNumber"
        class="ca-checkout-carismar__row"
      >
        <CaInputText
          id="identityNumber"
          ref="identityNumber"
          v-model="checkoutData.identityNumber"
          class="ca-checkout-carismar__input"
          validate="personalId"
          :error-message="$t('FEEDBACK_PERSONAL_ID_NOT_VALID')"
          :label="$t('LABEL_PERSONAL_ID')"
          @validation="checkValid"
        />
      </div>
      <div
        class="ca-checkout-carismar__row ca-checkout-carismar__row--splitted"
      >
        <CaInputText
          id="firstNameBilling"
          ref="firstNameBilling"
          v-model="checkoutData.billingAddress.firstName"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="given-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_FIRST_NAME')"
          @validation="checkValid"
        />
        <CaInputText
          id="lastNameBilling"
          ref="lastNameBilling"
          v-model="checkoutData.billingAddress.lastName"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="family-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_LAST_NAME')"
          @validation="checkValid"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="careOfBilling"
          v-model="checkoutData.billingAddress.careOf"
          class="ca-checkout-carismar__input"
          :required="false"
          :label="$t('LABEL_CARE_OF')"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="addressBilling"
          ref="addressBilling"
          v-model="checkoutData.billingAddress.addressLine1"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="street-address"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_ADDRESS')"
          @validation="checkValid"
        />
      </div>
      <div
        class="ca-checkout-carismar__row ca-checkout-carismar__row--splitted"
      >
        <CaInputText
          id="zipBilling"
          ref="zipBilling"
          v-model="checkoutData.billingAddress.zip"
          validate="empty"
          autocomplete="postal-code"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_ZIP')"
          @validation="checkValid"
        />
        <CaInputText
          id="cityBilling"
          ref="cityBilling"
          v-model="checkoutData.billingAddress.city"
          validate="empty"
          autocomplete="address-level2"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_CITY')"
          @validation="checkValid"
        />
      </div>
      <div v-if="$config.checkout.entryCode" class="ca-checkout-carismar__row">
        <CaInputText
          id="entryCodeBilling"
          v-model="checkoutData.billingAddress.entryCode"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_ENTRY_CODE')"
          :required="false"
        />
      </div>
      <div v-if="$config.checkout.message" class="ca-checkout-carismar__row">
        <CaInputTextarea
          id="message"
          v-model="checkoutData.message"
          class="ca-checkout-carismar__input"
          :description="$t('CHECKOUT_MESSAGE_FIELD_DESCRIPTION')"
          :label="$t('LABEL_ORDER_MESSAGE')"
          :required="false"
        />
      </div>
      <div
        v-if="$config.checkout.shippingAddress"
        class="ca-checkout-carismar__row"
      >
        <CaInputCheckbox
          id="addShipping"
          v-model="checkoutData.addShippingAddress"
          :label="$t('CHECKOUT_ADD_SHIPPING_ADDRESS')"
        />
      </div>
    </section>
    <SlideUpDown
      :active="checkoutData.addShippingAddress"
      :duration="200"
      class="ca-checkout-carismar__section ca-checkout-carismar__section--shipping"
      tag="section"
    >
      <h3 class="ca-checkout-carismar__title">
        {{ $t('SHIPPING_ADDRESS') }}
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
          id="firstNameShipping"
          ref="firstNameShipping"
          v-model="checkoutData.shippingAddress.firstName"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="given-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_FIRST_NAME')"
          @validation="checkValid"
        />
        <CaInputText
          id="lastNameShipping"
          ref="lastNameShipping"
          v-model="checkoutData.shippingAddress.lastName"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="family-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_LAST_NAME')"
          @validation="checkValid"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="careOfShipping"
          v-model="checkoutData.shippingAddress.careOf"
          class="ca-checkout-carismar__input"
          :required="false"
          :label="$t('LABEL_CARE_OF')"
        />
      </div>
      <div class="ca-checkout-carismar__row">
        <CaInputText
          id="addressShipping"
          ref="addressShipping"
          v-model="checkoutData.shippingAddress.addressLine1"
          class="ca-checkout-carismar__input"
          validate="empty"
          autocomplete="street-address"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_ADDRESS')"
          @validation="checkValid"
        />
      </div>
      <div
        class="ca-checkout-carismar__row ca-checkout-carismar__row--splitted"
      >
        <CaInputText
          id="zipShipping"
          ref="zipShipping"
          v-model="checkoutData.shippingAddress.zip"
          validate="empty"
          autocomplete="postal-code"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_ZIP')"
          @validation="checkValid"
        />
        <CaInputText
          id="cityShipping"
          ref="cityShipping"
          v-model="checkoutData.shippingAddress.city"
          validate="empty"
          autocomplete="address-level2"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-carismar__input"
          :label="$t('LABEL_CITY')"
          @validation="checkValid"
        />
      </div>
      <div v-if="$config.checkout.entryCode" class="ca-checkout-carismar__row">
        <CaInputText
          id="entryCodeShipping"
          v-model="checkoutData.shippingAddress.entryCode"
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
          >
            {{ $t('CHECKOUT_TERMS') }}
          </a>
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
        :message="feedbackMessage"
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
// The Carismar Checkout frame. Used for paying with manual invoice or external payment options<br><br>
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
    showSummary: false,
    loading: false,
    changeTimeout: null,
    feedbackMessage: '',
    checkoutData: {
      shippingAddress: {
        firstName: '',
        lastName: '',
        careOf: '',
        addressLine1: '',
        zip: '',
        city: '',
        entryCode: '',
        mobile: '',
        country: 'Sweden'
      },
      billingAddress: {
        firstName: '',
        lastName: '',
        careOf: '',
        addressLine1: '',
        zip: '',
        city: '',
        entryCode: '',
        mobile: '',
        country: 'Sweden'
      },
      email: '',
      identityNumber: '',
      message: '',
      addShippingAddress: false
    }
  }),
  computed: {
    // @vuese
    // Is the order consent checked?
    // @type Boolean
    orderConsentChecked() {
      return this.checkout.consents?.find(i => i.type === 'order').checked;
    }
  },
  watch: {
    checkout: {
      deep: true,
      handler(val) {
        this.updateCheckoutData(val);
      }
    },
    checkoutData: {
      deep: true,
      handler(val) {
        clearTimeout(this.changeTimeout);
        this.changeTimeout = setTimeout(() => {
          // Data has changed
          // @arg The checkout data (Object)
          this.$emit('update', val);
        }, 1000);
      }
    },
    orderConsentChecked(val) {
      if (val) {
        this.$refs.feedback.hide();
      }
    }
  },
  created() {},
  mounted() {
    this.updateCheckoutData(this.checkout);
  },
  methods: {
    // @vuese
    // Validate all fields and emit the place-order event if valid
    placeOrder() {
      const allFieldsValid = this.validateAllFields();
      if (!allFieldsValid || !this.orderConsentChecked) {
        this.feedbackMessage = !allFieldsValid
          ? this.$t('CHECKOUT_FEEDBACK_FIELDS_NOT_VALID')
          : this.$t('CHECKOUT_FEEDBACK_TERMS_NOT_ACCEPTED');
        this.$refs.feedback.show();
      } else {
        this.loading = true;
        // All fields are valid and the order can be placed
        this.$emit('place-order');
      }
    },
    // @vuese
    // Update the internal checkoutData object with data from the api
    // @arg data (Object)
    updateCheckoutData(data) {
      if (data.billingAddress) {
        this.checkoutData.billingAddress = data.billingAddress;
      }
      if (data.shippingAddress) {
        this.checkoutData.shippingAddress = data.shippingAddress;
      }
      if (data.email) {
        this.checkoutData.email = data.email;
      }
      if (data.identityNumber) {
        this.checkoutData.identityNumber = data.identityNumber;
      }
    },
    // @vuese
    // Used to hide feedback if field becomes valid after error
    // @arg valid (Boolean)
    checkValid(valid) {
      if (valid) {
        this.$refs.feedback.hide();
      }
    },
    // @vuese
    // Validating all input fields
    validateAllFields() {
      if (
        this.$refs.email.validateInput() &&
        this.$refs.phone.validateInput() &&
        this.$refs.identityNumber.validateInput() &&
        this.$refs.firstNameBilling.validateInput() &&
        this.$refs.lastNameBilling.validateInput() &&
        this.$refs.addressBilling.validateInput() &&
        this.$refs.zipBilling.validateInput() &&
        this.$refs.cityBilling.validateInput()
      ) {
        if (this.checkoutData.addShippingAddress) {
          if (
            this.$refs.firstNameShipping.validateInput() &&
            this.$refs.lastNameShipping.validateInput() &&
            this.$refs.addressShipping.validateInput() &&
            this.$refs.zipShipping.validateInput() &&
            this.$refs.cityShipping.validateInput()
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    // @vuese
    // Show generic error
    showErrorFeedback() {
      this.loading = false;
      this.feedbackMessage = this.$t('FEEDBACK_ERROR');
      this.$refs.feedback.show();
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-checkout-carismar';
</style>
