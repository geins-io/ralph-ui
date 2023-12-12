import commitResetMutation from 'user/pw-reset-commit.graphql';
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
  mixins: [],
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
        this.$apollo
          .mutate({
            mutation: commitResetMutation,
            variables: {
              resetKey: this.resetKey,
              password,
            },
            errorPolicy: 'all',
            fetchPolicy: 'no-cache',
          })
          .then((result) => {
            this.loading = false;

            if (result.errors) {
              this.showFeedback(this.feedback.error);
              return;
            }

            if (result.data.commitReset) {
              this.resetFields();
              this.showFeedback(this.feedback.passwordChanged);
              setTimeout(() => {
                window.location.replace(this.$getPath('/?action=login'));
              }, 1000);
              return;
            }
            // wrong key uuid
            this.showFeedback(this.feedback.resetKeyNotValid);
          })
          .catch((error) => {
            // pass the error response to the error component
            this.$nuxt.error({ statusCode: 500, message: error });
          });
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
