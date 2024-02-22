<template>
  <div class="ca-nshift">
    <div class="ca-nshift__form">
      <p class="ca-nshift__text">
        {{ $t('CHECKOUT_ENTER_ZIP') }}
      </p>
      <CaInputText
        id="ca-nshift-zip"
        v-model="currentZip"
        class="ca-nshift__input"
        :label="$t('CHECKOUT_ZIP_PLACEHOLDER')"
        :required="true"
        autocomplete="postal-code"
        @keyup.enter="init"
      />
      <CaButton
        class="ca-nshift__button"
        type="full-width"
        size="l"
        :loading="loading"
        @clicked="init"
      >
        {{ $t('CHECKOUT_SHOW_SHIPPING_OPTIONS') }}
      </CaButton>
      <LazyCaFeedback
        v-show="!parentLoading"
        ref="feedback"
        class="ca-nshift__feedback"
        type="error"
        :message="$t('CHECKOUT_NO_SHIPPING_OPTIONS')"
      />
    </div>

    <client-only>
      <div v-show="optionsAvailable" ref="widget" class="ca-nshift__widget" />
      <script
        type="text/javascript"
        src="https://api.unifaun.com/rs-extapi/v1/delivery-checkouts-widget/unifaun-checkout-all.min.js"
        async
      />
    </client-only>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// The Unifaun Delivery Checkout widget<br><br>
// **SASS-path:** _./styles/components/molecules/ca-nshift.scss_
export default {
  name: 'CaNshift',
  mixins: [],
  props: {
    // JSON string from the API
    shippingData: {
      type: [String, null],
      default: null,
    },
    // The current zip code / postal code
    zip: {
      type: String,
      required: true,
    },
    // If parent step is loading
    parentLoading: {
      type: Boolean,
      default: false,
    },
    // Pass true if Nshift data has been set in the checkout
    dataIsSet: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data: (vm) => ({
    data: '',
    currentZip: '',
    loading: false,
    widget: null,
    changeTimeout: null,
    config: {
      language: 'sv',
      useIcons: true,
      iconsBaseUrl:
        'https://api.unifaun.com/rs-extapi/v1/delivery-checkouts-widget/logos',
      resultCallback: vm.changed,
    },
    widgetLoadedInterval: null,
    widgetLoadedIntervalCount: 0,
    nshiftValid: false,
    optionsAvailable: false,
    resetData: false,
    searchWasPerformed: false,
  }),
  computed: {
    // @vuese
    // Is all input valid?
    // @type Boolean
    valid() {
      return this.currentZip !== '' && this.optionsAvailable;
    },
  },
  watch: {
    zip(val) {
      this.currentZip = val;
      this.init();
    },
    valid(newVal, oldVal) {
      if (newVal !== oldVal) {
        // Validation has been made
        // @arg valid (Boolean)
        this.$emit('validation', newVal);
      }
    },
  },
  mounted() {
    this.currentZip = this.$store.state.checkout.currentZip
      ? this.$store.state.checkout.currentZip
      : this.zip;
    this.data = this.shippingData;
    this.resetData = !!this.$store.state.checkout.nshiftData;
    this.widgetLoadedInterval = setInterval(() => {
      if (window.UnifaunCheckout) {
        clearInterval(this.widgetLoadedInterval);
        this.widget = window.UnifaunCheckout.createAt(
          this.$refs.widget,
          this.config,
        );
        if (this.shippingData) {
          this.update();
        } else if (this.currentZip) {
          this.init();
        }
      }
      this.widgetLoadedIntervalCount++;
      if (this.widgetLoadedIntervalCount > 40) {
        clearInterval(this.widgetLoadedInterval);
        console.error('nShift checkout widget script could not be loaded');
      }
    }, 500);
  },
  beforeDestroy() {
    clearInterval(this.widgetLoadedInterval);
  },
  methods: {
    // @vuese
    // Initiate the widget
    init() {
      this.$store.commit('checkout/setCurrentZip', this.currentZip);
      // Initiation is triggered
      // @arg Zip (String)
      this.$emit('init', this.currentZip);
      this.searchWasPerformed = true;
    },
    // @vuese
    // Updates the widget with new data
    update() {
      this.data = this.shippingData;
      this.widget.updateList(JSON.parse(this.data));
      if (this.resetData) {
        this.widget.setResult(
          JSON.parse(this.$store.state.checkout.nshiftData),
        );
        this.resetData = false;
      }
    },
    // @vuese
    // Disables the widget
    disable() {
      if (this.widget) {
        this.widget.disable();
      }
    },
    // @vuese
    // Enables the widget and handles feedback
    enable() {
      if (this.widget) {
        this.widget.enable();
      }
      if (this.shippingData && JSON.parse(this.shippingData).options?.length) {
        this.$refs.feedback.hide();
        this.optionsAvailable = true;
        if (this.shippingData !== this.data) {
          this.update();
        }
      } else if (this.currentZip !== '' && this.searchWasPerformed) {
        this.$refs.feedback.show();
        this.optionsAvailable = false;
      }
    },
    // @vuese
    // The callback function for when changes are made in the widget
    changed(data) {
      if (
        this.dataIsSet &&
        (JSON.stringify(data) === this.$store.state.checkout.nshiftData ||
          !data.valid)
      ) {
        return false;
      }
      const selected = document.getElementsByClassName(
        'unifaun-checkout-selected0',
      )[0];
      const hasTextInput = !!selected.querySelector(
        '.unifaun-checkout-text-input-input',
      );
      const debounce = hasTextInput ? 2000 : 150;
      clearTimeout(this.changeTimeout);
      this.changeTimeout = setTimeout(() => {
        this.nshiftValid = data.valid;
        const nshiftData = {
          selectedOptionId: data.selectedOptionId,
          pickupPoint: data.agent,
          deliveryData: data.fields.length ? JSON.stringify(data.fields) : '',
        };
        this.$store.commit('checkout/setNshiftData', JSON.stringify(data));
        // A change has been made
        // @arg Selected option ID, pickup point, delivery data (Object)
        this.$emit('changed', nshiftData);
      }, debounce);
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-nshift';
</style>
