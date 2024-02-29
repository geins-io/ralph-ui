<template>
  <div class="ca-newsletter">
    <LazyCaFeedback
      ref="feedback"
      class="ca-newsletter__feedback"
      :type="feedback.type"
      :message="feedback.message"
    />
    <div class="ca-newsletter__form">
      <CaInputText
        ref="inputEmail"
        v-model="email"
        :placeholder="$t('NEWSLETTER_PLACEHOLDER')"
        :label="$t('NEWSLETTER_LABEL')"
        class="ca-newsletter__input"
        validate="email"
        autocomplete="email"
        @keyup.enter="register"
        @validation="checkValid"
      />
      <CaButton
        class="ca-newsletter__button"
        :color="buttonColor"
        :loading="loading"
        @clicked="register"
      >
        {{ $t('NEWSLETTER_BUTTON') }}
      </CaButton>
    </div>
  </div>
</template>
<script>
import newsletterMutation from 'global/newsletter.graphql';
import MixFetch from 'MixFetch';
// @group Molecules
// @vuese
// The sign up for newsletter form<br><br>
// **SASS-path:** _./styles/components/molecules/ca-newsletter.scss_
export default {
  name: 'CaNewsletter',
  mixins: [MixFetch],
  props: {
    // Color prop for the button
    buttonColor: {
      type: String,
      default: 'primary',
    },
  },
  data: (vm) => ({
    email: '',
    loading: false,
    feedback: {
      type: 'info',
      message: '',
    },
    feedbacks: {
      success: {
        type: 'success',
        message: vm.$t('NEWSLETTER_FEEDBACK_SUCCESS'),
      },
      fail: {
        type: 'error',
        message: vm.$t('FEEDBACK_ERROR'),
      },
      notValid: {
        type: 'error',
        message: vm.$t('EMAIL_ERROR_NOT_VALID'),
      },
    },
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Show feedback
    // @arg Feedback (Object)
    showFeedback(feedback) {
      this.feedback = feedback;
      this.$refs.feedback.show();
    },
    // @vuese
    // Register for newsletter, performs apollo mutation
    async register() {
      if (this.$refs.inputEmail.validateInput()) {
        this.loading = true;
        const variables = {
          email: this.email,
        };
        const callback = (result) => {
          this.loading = false;
          if (result?.data?.subscribeToNewsletter) {
            this.showFeedback(this.feedbacks.success);
            this.$store.dispatch('events/push', {
              type: 'newsletter:subscribe',
              data: {
                email: this.email,
              },
            });
            this.email = '';
          } else {
            this.showFeedback(this.feedbacks.fail);
          }
        };
        const callbackError = () => {
          this.loading = false;
          this.showFeedback(this.feedbacks.fail);
        };
        await this.mutateData(
          newsletterMutation,
          callback,
          variables,
          callbackError,
        );
      } else {
        this.showFeedback(this.feedbacks.notValid);
      }
    },
    // Check if valid
    checkValid(valid) {
      if (valid) {
        this.$refs.feedback.hide();
      }
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-newsletter';
</style>
