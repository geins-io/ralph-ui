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
        autocomplete="current-password"
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
        :autocomplete="changeMode ? 'new-password' : 'current-password'"
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
        autocomplete="new-password"
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
          v-model="rememberUser"
          :label="$t('REMEMBER_ME')"
        />
        <button
          type="button"
          class="ca-account-panel__forgot"
          @click="setFrame('reset')"
        >
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
        <!-- TODO: Länka villkor + integritetspolicy korrekt -->
        <i18n
          path="ACCOUNT_DISCLAIMER"
          tag="div"
          class="ca-account-panel__disclaimer"
        >
          <NuxtLink to="/kopvillkor">{{ $t('TERMS_AND_CONDITIONS') }}</NuxtLink>
          <NuxtLink to="/integritetspolicy">
            {{ $t('PRIVACY_POLICY') }}
          </NuxtLink>
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
        type="button"
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
import getUserQuery from 'user/get.graphql';
import requestPasswordResetMutation from 'user/pw-reset-request.graphql';

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
    rememberUser: true,
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
      },
      error: {
        type: 'error',
        message: vm.$t('FEEDBACK_ERROR')
      },
      passwordNotChanged: {
        message: vm.$t('ACCOUNT_CHANGE_PASSWORD_ERROR'),
        placement: 'bottom-center',
        mode: 'error'
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
        password: this.password,
        rememberUser: this.rememberUser
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
    // Closes panel after a delay of 1000 ms to let the user see the feedback
    closePanelAfterDelay(redirectPath = null) {
      setTimeout(() => {
        this.resetFields();
        this.$refs.contentpanel.close();
        if (!this.$route?.name?.includes('checkout') && redirectPath !== null) {
          this.$router.push({
            path: this.$getPath(redirectPath)
          });
        }
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
          this.$store.dispatch('events/push', {
            type: 'user:login'
          });
          if (this.$config.customerTypesToggle) {
            this.$apollo
              .query({
                query: getUserQuery,
                errorPolicy: 'all',
                fetchPolicy: 'no-cache'
              })
              .then(result => {
                if (!result.errors) {
                  const type = result.data?.getUser?.customerType;
                  this.$store.dispatch('changeCustomerType', type);
                  this.$store.dispatch('setCustomerTypeCookie', type);

                  this.loading = false;
                  this.closePanelAfterDelay();
                  this.showFeedback(this.feedback.loggedIn);
                } else {
                  this.showFeedback(this.feedback.error);
                }
              })
              .catch(error => {
                this.$nuxt.error({
                  statusCode: error.statusCode,
                  message: error
                });
              });
          } else {
            this.loading = false;
            this.closePanelAfterDelay();
            this.showFeedback(this.feedback.loggedIn);
          }
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
                user: {
                  newsletter: this.newsletterSubscribe,
                  customerType: this.$store.state.customerType
                }
              },
              errorPolicy: 'all',
              fetchPolicy: 'no-cache'
            })
            .then(result => {
              this.loading = false;
              if (!result.errors) {
                this.$store.dispatch('events/push', {
                  type: 'user:register'
                });
                this.closePanelAfterDelay('account-settings');
                this.showFeedback(this.feedback.accountCreated);
                if (this.$config.customerTypesToggle) {
                  this.$store.dispatch(
                    'setCustomerTypeCookie',
                    this.$store.state.customerType
                  );
                }
              } else {
                this.showFeedback(this.feedback.error);
              }
            })
            .catch(error => {
              this.$nuxt.error({
                statusCode: error.statusCode,
                message: error
              });
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
        this.$apollo
          .mutate({
            mutation: requestPasswordResetMutation,
            variables: {
              email: this.email
            },
            errorPolicy: 'all',
            fetchPolicy: 'no-cache'
          })
          .then(result => {
            this.loading = false;
            if (result?.data?.requestPasswordReset && !result.errors) {
              this.resetFields();
              this.showFeedback(this.feedback.passwordResetted);
              this.$store.dispatch('events/push', {
                type: 'user:password-reset',
                data: {
                  email: this.email,
                  resetKey: result.data.requestPasswordReset
                }
              });
            } else {
              this.showFeedback(this.feedback.error);
            }
          })
          .catch(error => {
            this.$nuxt.error({ statusCode: error.statusCode, message: error });
          });
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
          this.resetFields();
        } else {
          await this.$store.dispatch('auth/logout');
          this.$router.push({ path: this.$getPath('index') });
          this.$store.dispatch(
            'snackbar/trigger',
            this.feedback.passwordNotChanged
          );
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
    // @vuese
    // Reset all fields
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
