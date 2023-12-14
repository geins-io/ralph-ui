<template>
  <LazyCaContentPanel
    class="ca-notify-panel"
    name="notify"
    enter-from="bottom"
    enter-from-tablet-up="right"
  >
    <template #header>
      <h1 class="ca-content-panel__title">
        {{ $t('NOTIFY_PANEL_TITLE') }}
      </h1>
    </template>
    <div class="ca-notify-panel__inner">
      <h2 class="ca-notify-panel__prod-info">
        {{ product.name }}
        <span v-if="variant.label && variant.label !== '-'">
          - {{ variant.label }}
        </span>
      </h2>
      <p class="ca-notify-panel__description">
        {{ $t('NOTIFY_PANEL_DESCRIPTION') }}
      </p>
      <LazyCaFeedback
        ref="feedback"
        class="ca-notify-panel__feedback"
        :type="currentFeedback.type"
        :message="currentFeedback.message"
      />
      <CaInputText
        id="email"
        ref="inputEmail"
        v-model="email"
        :label="$t('EMAIL')"
        validate="email"
        @validation="validate"
        @keyup.enter="subscribe"
      />
      <CaButton
        class="ca-notify-panel__button"
        type="full-width"
        :loading="loading"
        @clicked="subscribe"
      >
        {{ $t('NOTIFY_PANEL_BUTTON') }}
      </CaButton>
    </div>
  </LazyCaContentPanel>
</template>
<script>
import monitorAvailabilityMutation from 'product/monitor-availability.graphql';
// @group Molecules
// @vuese
// A panel where you can submit your email to get a back in stock alert for the product.<br><br>
// **SASS-path:** _./styles/components/molecules/ca-notify-panel.scss_
export default {
  name: 'CaNotifyPanel',
  mixins: [],
  props: {
    // The current product
    product: {
      type: Object,
      required: true,
    },
    // The chosen sku variant to monitor
    variant: {
      type: Object,
      required: true,
    },
  },
  data: (vm) => ({
    email: '',
    emailValid: false,
    loading: false,
    currentFeedback: {
      type: 'info',
      message: '',
    },
    feedback: {
      success: {
        type: 'success',
        message: vm.$t('NOTIFY_PANEL_SUCCESS'),
      },
      notValid: {
        type: 'error',
        message: vm.$t('ACCOUNT_FEEDBACK_FIELDS_NOT_VALID'),
      },
      error: {
        type: 'error',
        message: vm.$t('FEEDBACK_ERROR'),
      },
    },
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Triggers mutation in API to sign up for back in stock alerts
    subscribe() {
      if (this.$refs.inputEmail.validateInput()) {
        this.loading = true;
        this.$apollo
          .mutate({
            mutation: monitorAvailabilityMutation,
            variables: {
              email: this.email,
              skuId: this.variant.skuId,
            },
            errorPolicy: 'all',
            fetchPolicy: 'no-cache',
          })
          .then((result) => {
            this.loading = false;
            if (result.data.monitorProductAvailability) {
              this.showFeedback(this.feedback.success);
            } else {
              this.showFeedback(this.feedback.error);
            }
          })
          .catch((error) => {
            this.$nuxt.error({ statusCode: error.statusCode, message: error });
          });
      } else {
        this.showFeedback(this.feedback.notValid);
      }
    },
    // @vuese
    // Show feedback
    // @arg Feedback (Object)
    showFeedback(feedback) {
      this.currentFeedback = feedback;
      this.$refs.feedback.show();
    },
    // @vuese
    // Show feedback
    // @arg Feedback (Object)
    validate(valid) {
      if (valid) {
        this.$refs.feedback.hide();
      }
      this.emailValid = valid;
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-notify-panel';
</style>
