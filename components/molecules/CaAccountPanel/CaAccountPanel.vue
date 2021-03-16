<template>
  <LazyCaContentPanel
    ref="contentpanel"
    class="ca-account-panel"
    name="account"
    enter-from="bottom"
    enter-from-tablet-up="right"
    :title="title"
  >
    <div class="ca-account-panel__inner">
      <LazyCaFeedback
        ref="feedback"
        class="ca-account-panel__feedback"
        :type="currentFeedback.type"
        :message="currentFeedback.message"
      />
      <CaInputText
        v-show="!changeMode"
        id="email"
        ref="inputEmail"
        v-model="email"
        :label="$t('EMAIL')"
        validate="email"
        :error-message="$t('EMAIL_ERROR_NOT_VALID')"
        @validation="checkValid"
        @keyup.enter="enterHandler"
      />
      <CaInputText
        v-show="changeMode"
        id="current-password"
        ref="inputCurrentPassword"
        v-model="currentPassword"
        type="password"
        :label="$t('CURRENT_PASSWORD')"
        :error-message="$t('PASSWORD_ERROR_EMPTY')"
        @validation="checkValid"
        @keyup.enter="enterHandler"
      />
      <CaInputText
        v-show="!resetMode"
        id="password"
        ref="inputPassword"
        v-model="password"
        type="password"
        :label="changeMode ? $t('NEW_PASSWORD') : $t('PASSWORD')"
        :validate="createMode || changeMode ? 'passwordStrength' : ''"
        :error-message="
          createMode || changeMode
            ? $t('PASSWORD_ERROR_WEAK')
            : $t('PASSWORD_ERROR_EMPTY')
        "
        @validation="checkValid"
        @keyup.enter="enterHandler"
      />
      <CaInputText
        v-if="createMode || changeMode"
        id="password-confirm"
        ref="inputPasswordConfirm"
        v-model="passwordConfirm"
        type="password"
        :label="
          changeMode ? $t('NEW_PASSWORD_CONFIRM') : $t('PASSWORD_CONFIRM')
        "
        validate="passwordMatch"
        :password-to-match="password"
        :error-message="$t('PASSWORD_ERROR_NO_MATCH')"
        @validation="checkValid"
        @keyup.enter="enterHandler"
      />

      <div v-if="loginMode" class="ca-account-panel__actions">
        <CaInputCheckbox
          id="remember"
          v-model="rememberMe"
          :label="$t('REMEMBER_ME')"
        />
        <button class="ca-account-panel__forgot" @click="setFrame('reset')">
          {{ $t('FORGOT_PASSWORD') }}
        </button>
      </div>
      <div
        v-else-if="createMode"
        class="ca-account-panel__actions ca-account-panel__actions--create"
      >
        <CaInputCheckbox
          id="newsletter"
          v-model="newsletterSubscribe"
          :label="$t('NEWSLETTER_SUBSCRIBE_CHOICE')"
        />
        <!-- TODO: Länka villkor + integritetspolicy -->
        <i18n
          path="ACCOUNT_DISCLAIMER"
          tag="div"
          class="ca-account-panel__disclaimer"
        >
          <a href="#">{{ $t('TERMS_AND_CONDITIONS') }}</a>
          <a href="#">{{ $t('PRIVACY_POLICY') }}</a>
        </i18n>
      </div>
      <CaButton
        v-if="loginMode"
        class="ca-account-panel__button"
        type="full-width"
        :loading="loading"
        @clicked="login"
      >
        {{ $t('LOG_IN') }}
      </CaButton>
      <CaButton
        v-if="loginMode || createMode"
        class="ca-account-panel__button"
        type="full-width"
        :loading="createMode && loading"
        :color="loginMode ? 'secondary' : 'primary'"
        @clicked="createAccountHandler()"
      >
        {{ $t('CREATE_ACCOUNT') }}
      </CaButton>
      <CaButton
        v-if="resetMode"
        class="ca-account-panel__button ca-account-panel__button--reset"
        type="full-width"
        :loading="loading"
        @clicked="resetPassword"
      >
        {{ $t('RESET_PASSWORD') }}
      </CaButton>
      <CaButton
        v-if="changeMode"
        class="ca-account-panel__button ca-account-panel__button--reset"
        type="full-width"
        :loading="loading"
        @clicked="changePassword"
      >
        {{ $t('CHANGE_PASSWORD') }}
      </CaButton>
      <button
        v-if="!loginMode && !changeMode"
        class="ca-account-panel__back"
        @click="setFrame('login')"
      >
        {{ $t('BACK_TO_LOGIN') }}
      </button>
    </div>
  </LazyCaContentPanel>
</template>
<script>
import { mapState } from 'vuex';
import registerMutation from 'user/register.graphql';

// @group Molecules
// @vuese
// The account panel. Includes content panel frames 'login', 'create', 'reset' and 'change'<br><br>
// **SASS-path:** _./styles/components/molecules/ca-account-panel.scss_
export default {
  name: 'CaAccountPanel',
  mixins: [],
  props: {},
  data: vm => ({
    email: '',
    currentPassword: '',
    password: '',
    passwordConfirm: '',
    rememberMe: true,
    newsletterSubscribe: true,
    loading: false,
    currentFeedback: {
      type: 'info',
      message: ''
    },
    feedback: {
      accountCreated: {
        type: 'success',
        message: vm.$t('ACCOUNT_FEEDBACK_CREATED')
      },
      wrongCredentials: {
        type: 'error',
        message: vm.$t('ACCOUNT_FEEDBACK_CREDENTIALS')
      },
      loggedIn: {
        type: 'success',
        message: vm.$t('ACCOUNT_FEEDBACK_LOGGED_IN')
      },
      passwordResetted: {
        type: 'success',
        message: vm.$t('ACCOUNT_FEEDBACK_PASSWORD_RESET')
      },
      passwordChanged: {
        type: 'success',
        message: vm.$t('ACCOUNT_FEEDBACK_PASSWORD_CHANGED')
      },
      notValid: {
        type: 'error',
        message: vm.$t('ACCOUNT_FEEDBACK_FIELDS_NOT_VALID')
      },
      alreadyExists: {
        type: 'error',
        message: vm.$t('ACCOUNT_FEEDBACK_ALREADY_EXISTS')
      }
    }
  }),
  computed: {
    loginMode() {
      return this.currentFrame === 'login';
    },
    createMode() {
      return this.currentFrame === 'create';
    },
    resetMode() {
      return this.currentFrame === 'reset';
    },
    changeMode() {
      return this.currentFrame === 'change';
    },
    title() {
      switch (this.currentFrame) {
        case 'create':
          return this.$t('CREATE_ACCOUNT');
        case 'reset':
          return this.$t('RESET_PASSWORD');
        case 'change':
          return this.$t('CHANGE_PASSWORD');
        default:
          return this.$t('LOG_IN');
      }
    },
    currentFrame() {
      return this.contentpanel.frame;
    },
    credentials() {
      const credentials = {
        username: this.email,
        password: this.password
      };
      if (this.changeMode) {
        credentials.username = this.$store.state.auth.user;
        credentials.password = this.currentPassword;
        credentials.newPassword = this.password;
      }
      return credentials;
    },
    ...mapState(['contentpanel'])
  },
  watch: {},
  mounted() {},
  created() {},
  beforeDestroy() {},
  methods: {
    // @vuese
    // Set frame for content panel
    // @arg Content panel frame (String)
    setFrame(frame) {
      this.$store.commit('contentpanel/setFrame', frame);
      this.$refs.feedback.hide();
    },
    // @vuese
    // Decides what action the create account button should have (different in different frames)
    createAccountHandler() {
      if (this.loginMode) {
        this.setFrame('create');
      } else {
        this.createAccount();
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
    // Closes panel after a delay of 1000 ms
    closePanelAfterDelay(redirectPath) {
      setTimeout(() => {
        this.resetFields();
        this.$refs.contentpanel.close();
        this.$router.push({ path: this.localePath(redirectPath) });
      }, 1000);
    },
    // @vuese
    // Log in action
    async login() {
      this.loading = true;
      if (
        this.$refs.inputEmail.validateInput() &&
        this.$refs.inputPassword.validateInput()
      ) {
        await this.$store.dispatch('auth/login', this.credentials);
        if (this.$store.getters['auth/authenticated']) {
          this.loading = false;
          this.closePanelAfterDelay('account-orders');
          this.showFeedback(this.feedback.loggedIn);
        } else {
          this.loading = false;
          this.showFeedback(this.feedback.wrongCredentials);
        }
      } else {
        this.loading = false;
        this.showFeedback(this.feedback.notValid);
      }
    },
    // @vuese
    // Create account action
    async createAccount() {
      this.loading = true;
      if (
        this.$refs.inputEmail.validateInput() &&
        this.$refs.inputPassword.validateInput() &&
        this.$refs.inputPasswordConfirm.validateInput()
      ) {
        await this.$store.dispatch('auth/register', this.credentials);
        if (this.$store.getters['auth/authenticated']) {
          this.$apollo
            .mutate({
              mutation: registerMutation,
              variables: {
                apiKey: this.$config.apiKey.toString(),
                user: {
                  newsletter: this.newsletterSubscribe
                }
              },
              errorPolicy: 'all',
              fetchPolicy: 'no-cache'
            })
            .then(result => {
              this.loading = false;
              if (!result.errors) {
                this.closePanelAfterDelay('account-settings');
                this.showFeedback(this.feedback.accountCreated);
              } else {
                this.showFeedback({
                  type: 'error',
                  message: 'Något gick fel, försök igen senare'
                });
              }
            })
            .catch(error => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
        } else {
          this.loading = false;
          this.showFeedback(this.feedback.alreadyExists);
        }
      } else {
        this.loading = false;
        this.showFeedback(this.feedback.notValid);
      }
    },
    // @vuese
    // Reset password action
    resetPassword() {
      this.loading = true;
      if (this.$refs.inputEmail.validateInput()) {
        // TODO: Password reset
        this.showFeedback(this.feedback.passwordResetted);
        this.$refs.feedback.show();
        this.loading = false;
      } else {
        this.showFeedback(this.feedback.notValid);
        this.loading = false;
      }
    },
    // @vuese
    // Reset password action
    async changePassword() {
      this.loading = true;
      if (
        this.$refs.inputCurrentPassword.validateInput() &&
        this.$refs.inputPassword.validateInput() &&
        this.$refs.inputPasswordConfirm.validateInput()
      ) {
        await this.$store.dispatch('auth/changePassword', this.credentials);
        this.loading = false;
        if (this.$store.getters['auth/authenticated']) {
          this.showFeedback(this.feedback.passwordChanged);
          this.$refs.feedback.show();
          this.resetFields();
        } else {
          this.$store.dispatch('auth/logout');
          this.$router.push({ path: '/' });
          this.$store.dispatch('snackbar/trigger', {
            message:
              'Du angav fel nuvarande lösenord och har loggats ut av säkerhetsskäl',
            placement: 'bottom-center',
            mode: 'error'
          });
        }
      } else {
        this.loading = false;
        this.showFeedback(this.feedback.notValid);
      }
    },
    // @vuese
    // Used to hide feedback if field becomes valid after error
    checkValid(valid) {
      if (valid) {
        this.$refs.feedback.hide();
      }
    },
    // @vuese
    // Decides what action Enter key should trigger (different for different frames)
    enterHandler() {
      if (this.loginMode) {
        this.login();
      } else if (this.createMode) {
        this.createAccount();
      } else if (this.resetMode) {
        this.resetPassword();
      } else if (this.changeMode) {
        this.changePassword();
      }
    },
    resetFields() {
      this.email = '';
      this.currentPassword = '';
      this.password = '';
      this.passwordConfirm = '';
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-account-panel';
</style>
