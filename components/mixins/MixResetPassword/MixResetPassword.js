import commitResetMutation from 'user/pw-reset-commit.graphql';
import MixFetch from 'MixFetch';
// @group Mixins
// @vuese
// // The functionality of the reset password page<br><br>
// **Data:**<br>
// loading: `false`<br>
// password: `''`<br>
// passwordConfirm: `''`<br>
// resetKey: `''`<br>
// currentFeedback: `{ type: 'info', message: '' }`<br>
// feedback: `{ passwordChanged: { type: 'success', message: '' }, notValid: { type: 'error', message: '' }, error: { type: 'error', message: '' }, resetKeyNotValid: { type: 'error', message: '' } }`
export default {
  name: 'MixResetPassword',
  mixins: [MixFetch],
  props: {},
  data: (vm) => ({
    loading: false,
    password: '',
    passwordConfirm: '',
    resetKey: '',
    currentFeedback: {
      type: 'info',
      message: '',
    },
    feedback: {
      passwordChanged: {
        type: 'success',
        message: vm.$t('ACCOUNT_FEEDBACK_PASSWORD_CHANGED'),
      },
      notValid: {
        type: 'error',
        message: vm.$t('ACCOUNT_FEEDBACK_FIELDS_NOT_VALID'),
      },
      error: {
        type: 'error',
        message: vm.$t('FEEDBACK_ERROR'),
      },
      resetKeyNotValid: {
        type: 'error',
        message: vm.$t('ACCOUNT_FEEDBACK_RESET_KEY_NOT_VALID'),
      },
    },
  }),
  computed: {},
  created() {},
  mounted() {
    this.resetKey = this.$route.query.resetKey;
  },
  methods: {
    // @vuese
    // Commit reset
    async commitReset() {
      if (
        this.$refs.inputPassword.validateInput() &&
        this.$refs.inputPasswordConfirm.validateInput()
      ) {
        this.loading = true;
        const password = await this.$store.state.auth.client.digest(
          this.password,
        );
        const variables = {
          resetKey: this.resetKey,
          password,
        };
        const callback = (result) => {
          this.loading = false;
          if (result.data.commitReset) {
            this.resetFields();
            this.showFeedback(this.feedback.passwordChanged);
            setTimeout(() => {
              window.location.replace(this.$getPath('/?action=login'));
            }, 1000);
            return;
          }
          this.showFeedback(this.feedback.resetKeyNotValid);
        };
        const callbackError = () => {
          this.loading = false;
          this.showFeedback(this.feedback.error);
        };

        await this.mutateData(
          commitResetMutation,
          callback,
          variables,
          callbackError,
        );
      } else {
        this.showFeedback(this.feedback.notValid);
      }
    },
    // @vuese
    // Used to hide feedback if field becomes valid after error
    // @arg Valid (Boolean)
    checkValid(valid) {
      if (valid) {
        this.$refs.feedback.hide();
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
    // Reset all fields
    resetFields() {
      this.password = '';
      this.passwordConfirm = '';
    },
  },
};
