<template>
  <div
    class="ca-checkout-invoice"
    :class="{ 'ca-checkout-invoice--loading': loading }"
  >
    <section class="ca-checkout-invoice__section">
      <h3 class="ca-checkout-invoice__title">
        {{
          checkoutData.addShippingAddress
            ? $t('BILLING_ADDRESS')
            : $t('CHECKOUT_YOUR_INFORMATION')
        }}
      </h3>
      <p class="ca-checkout-invoice__subtitle">
        {{ $t('CHECKOUT_SUBTITLE_COUNTRY_INFO') }}
        <CaFlag :country="currentCountry.code" shape="circle" />
        {{ currentCountry.name }}
      </p>
      <div class="ca-checkout-invoice__row ca-checkout-invoice__row--splitted">
        <CaInputText
          id="email"
          ref="email"
          v-model="checkoutData.email"
          type="email"
          class="ca-checkout-invoice__input"
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
          type="tel"
          class="ca-checkout-invoice__input"
          validate="empty"
          autocomplete="tel"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_PHONE_NUMBER')"
          @validation="checkValid"
        />
      </div>
      <div
        v-if="!isOrganization && $config.checkout.identityNumber"
        class="ca-checkout-invoice__row"
      >
        <CaInputText
          id="identityNumber"
          ref="identityNumber"
          v-model="checkoutData.identityNumber"
          class="ca-checkout-invoice__input"
          validate="personalId"
          :description="$t('CHECKOUT_PERSONAL_ID_DESCRIPTION')"
          :error-message="$t('FEEDBACK_PERSONAL_ID_NOT_VALID')"
          :label="$t('LABEL_PERSONAL_ID')"
          @validation="checkValid"
        />
      </div>
      <div
        v-else-if="$config.checkout.identityNumber"
        class="ca-checkout-invoice__row"
      >
        <CaInputText
          id="identityNumber"
          ref="identityNumber"
          v-model="checkoutData.identityNumber"
          class="ca-checkout-invoice__input"
          validate="empty"
          :description="$t('CHECKOUT_ORGANIZATION_ID_DESCRIPTION')"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_ORGANIZATION_ID')"
          @validation="checkValid"
        />
      </div>
      <div v-if="isOrganization" class="ca-checkout-invoice__row">
        <CaInputText
          id="companyBilling"
          ref="companyBilling"
          v-model="checkoutData.billingAddress.company"
          class="ca-checkout-invoice__input"
          validate="empty"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_COMPANY')"
          @validation="checkValid"
        />
      </div>
      <div class="ca-checkout-invoice__row ca-checkout-invoice__row--splitted">
        <CaInputText
          id="firstNameBilling"
          ref="firstNameBilling"
          v-model="checkoutData.billingAddress.firstName"
          class="ca-checkout-invoice__input"
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
          class="ca-checkout-invoice__input"
          validate="empty"
          autocomplete="family-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_LAST_NAME')"
          @validation="checkValid"
        />
      </div>
      <div class="ca-checkout-invoice__row">
        <CaInputText
          id="careOfBilling"
          v-model="checkoutData.billingAddress.careOf"
          class="ca-checkout-invoice__input"
          :required="false"
          :label="$t('LABEL_CARE_OF')"
        />
      </div>
      <div class="ca-checkout-invoice__row">
        <CaInputText
          id="addressBilling"
          ref="addressBilling"
          v-model="checkoutData.billingAddress.addressLine1"
          class="ca-checkout-invoice__input"
          validate="empty"
          autocomplete="street-address"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_ADDRESS')"
          @validation="checkValid"
        />
      </div>
      <div class="ca-checkout-invoice__row ca-checkout-invoice__row--splitted">
        <CaInputText
          id="zipBilling"
          ref="zipBilling"
          v-model="checkoutData.billingAddress.zip"
          validate="empty"
          autocomplete="postal-code"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-invoice__input"
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
          class="ca-checkout-invoice__input"
          :label="$t('LABEL_CITY')"
          @validation="checkValid"
        />
      </div>
      <div v-if="$config.checkout.entryCode" class="ca-checkout-invoice__row">
        <CaInputText
          id="entryCodeBilling"
          v-model="checkoutData.billingAddress.entryCode"
          class="ca-checkout-invoice__input"
          :label="$t('LABEL_ENTRY_CODE')"
          :required="false"
        />
      </div>
      <div v-if="$config.checkout.message" class="ca-checkout-invoice__row">
        <CaInputTextarea
          id="message"
          v-model="checkoutData.message"
          class="ca-checkout-invoice__input"
          :description="$t('CHECKOUT_MESSAGE_FIELD_DESCRIPTION')"
          :label="$t('LABEL_ORDER_MESSAGE')"
          :required="false"
        />
      </div>
      <div
        v-if="$config.checkout.shippingAddress"
        class="ca-checkout-invoice__row"
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
      class="ca-checkout-invoice__section ca-checkout-invoice__section--shipping"
      tag="section"
    >
      <h3 class="ca-checkout-invoice__title">
        {{ $t('SHIPPING_ADDRESS') }}
      </h3>
      <p class="ca-checkout-invoice__subtitle">
        {{ $t('CHECKOUT_SUBTITLE_COUNTRY_INFO') }}
        <CaFlag :country="currentCountry.code" shape="circle" />
        {{ currentCountry.name }}
      </p>
      <div v-if="isOrganization" class="ca-checkout-invoice__row">
        <CaInputText
          id="companyShipping"
          ref="companyShipping"
          v-model="checkoutData.shippingAddress.company"
          class="ca-checkout-invoice__input"
          validate="empty"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_COMPANY')"
          @validation="checkValid"
        />
      </div>
      <div class="ca-checkout-invoice__row ca-checkout-invoice__row--splitted">
        <CaInputText
          id="firstNameShipping"
          ref="firstNameShipping"
          v-model="checkoutData.shippingAddress.firstName"
          class="ca-checkout-invoice__input"
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
          class="ca-checkout-invoice__input"
          validate="empty"
          autocomplete="family-name"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_LAST_NAME')"
          @validation="checkValid"
        />
      </div>
      <div class="ca-checkout-invoice__row">
        <CaInputText
          id="careOfShipping"
          v-model="checkoutData.shippingAddress.careOf"
          class="ca-checkout-invoice__input"
          :required="false"
          :label="$t('LABEL_CARE_OF')"
        />
      </div>
      <div class="ca-checkout-invoice__row">
        <CaInputText
          id="addressShipping"
          ref="addressShipping"
          v-model="checkoutData.shippingAddress.addressLine1"
          class="ca-checkout-invoice__input"
          validate="empty"
          autocomplete="street-address"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          :label="$t('LABEL_ADDRESS')"
          @validation="checkValid"
        />
      </div>
      <div class="ca-checkout-invoice__row ca-checkout-invoice__row--splitted">
        <CaInputText
          id="zipShipping"
          ref="zipShipping"
          v-model="checkoutData.shippingAddress.zip"
          validate="empty"
          autocomplete="postal-code"
          :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
          class="ca-checkout-invoice__input"
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
          class="ca-checkout-invoice__input"
          :label="$t('LABEL_CITY')"
          @validation="checkValid"
        />
      </div>
      <div v-if="$config.checkout.entryCode" class="ca-checkout-invoice__row">
        <CaInputText
          id="entryCodeShipping"
          v-model="checkoutData.shippingAddress.entryCode"
          class="ca-checkout-invoice__input"
          :label="$t('LABEL_ENTRY_CODE')"
          :required="false"
        />
      </div>
    </SlideUpDown>
    <div
      v-if="
        $t('CHECKOUT_INVOICE_INFORMATION') !== '' ||
        $t('CHECKOUT_INVOICE_INFORMATION') !== 'CHECKOUT_INVOICE_INFORMATION'
      "
      class="ca-checkout-invoice__invoice-information"
    >
      {{ $t('CHECKOUT_INVOICE_INFORMATION') }}
    </div>
    <section
      v-if="checkout.consents && checkout.consents.length"
      class="ca-checkout-invoice__section"
    >
      <h3 class="ca-checkout-invoice__title">
        {{ $t('CHECKOUT_CONSENTS_TITLE') }}
      </h3>
      <p class="ca-checkout-invoice__subtitle">
        {{ $t('CHECKOUT_CONSENTS_TEXT') }}
      </p>
      <CaInputCheckbox
        v-for="(consent, index) in checkout.consents"
        :id="consent.type"
        :key="index"
        v-model="consent.checked"
        class="ca-checkout-invoice__consent"
      >
        <i18n
          v-if="consent.type === 'order'"
          path="CHECKOUT_CONSENT_ORDER"
          tag="span"
          class="ca-input-checkbox__label"
        >
          <a
            class="ca-checkout-invoice__consent-link"
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
      class="ca-checkout-invoice__section ca-checkout-invoice__section--confirm"
    >
      <LazyCaFeedback
        ref="feedback"
        class="ca-checkout-invoice__feedback"
        type="error"
        :message="feedbackMessage"
      />
      <div class="ca-checkout-invoice__total">
        {{ $t('CHECKOUT_TOTAL') }}:
        <span class="ca-checkout-invoice__total-sum">
          {{ $store.state.cart.data.summary.total.sellingPriceIncVatFormatted }}
        </span>
      </div>
      <button
        type="button"
        class="ca-checkout-invoice__show-summary"
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
        class="ca-checkout-invoice__summary-wrap"
      >
        <div class="ca-checkout-invoice__summary">
          <CaCartSummary :summary="$store.state.cart.data.summary" />
        </div>
      </SlideUpDown>
      <CaButton
        class="ca-checkout-invoice__place-order"
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
import SlideUpDown from 'vue-slide-up-down';
// @group Molecules
// @vuese
// The invoice checkout frame. Used for paying with manual invoice<br><br>
// **SASS-path:** _./styles/components/molecules/ca-checkout-invoice.scss_
export default {
  name: 'CaCheckoutInvoice',
  components: { SlideUpDown },
  mixins: [],
  props: {
    // The checkout data from the endpoint
    checkout: {
      type: Object,
      required: true,
    },
  },
  data: (vm) => ({
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
        company: '',
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
        company: '',
      },
      email: '',
      identityNumber: '',
      message: '',
      addShippingAddress: false,
    },
  }),
  computed: {
    // @vuese
    // Is the order consent checked?
    // @type Boolean
    orderConsentChecked() {
      return this.checkout.consents?.length
        ? this.checkout.consents?.find((i) => i.type === 'order').checked
        : true;
    },
    isOrganization() {
      return this.$store.state.customerType === 'ORGANIZATION';
    },
    currentCountry() {
      return this.$store.getters['channel/checkoutMarketObj'].country;
    },
  },
  watch: {
    checkout: {
      deep: true,
      handler(val) {
        this.updateCheckoutData(val);
      },
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
      },
    },
    orderConsentChecked(val) {
      if (val) {
        this.$refs.feedback.hide();
      }
    },
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
    showErrorFeedback(message = 'ERROR') {
      this.loading = false;
      this.feedbackMessage = this.$t(`FEEDBACK_${message}`);
      this.$refs.feedback.show();
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-checkout-invoice';
</style>
