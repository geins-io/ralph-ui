<template>
  <CaContentPanel
    ref="contentpanel"
    class="ca-account-panel"
    name="account"
    enter-from="bottom"
    enter-from-tablet-up="right"
    :title="title"
  >
    <div class="ca-account-panel__inner">
      <CaFeedback
        ref="feedback"
        class="ca-account-panel__feedback"
        :type="currentFeedback.type"
        :message="currentFeedback.message"
      />
      <CaInputText
        id="email"
        ref="inputEmail"
        v-model="email"
        :label="$t('EMAIL')"
        validate="email"
        :error-text="$t('EMAIL_ERROR_NOT_VALID')"
        @validation="checkValid"
        @keyup.enter="enterHandler"
      />
      <CaInputText
        v-show="!resetMode"
        id="password"
        ref="inputPassword"
        v-model="password"
        type="password"
        :label="$t('PASSWORD')"
        :validate="createMode ? 'passwordStrength' : ''"
        :error-text="
          createMode ? $t('PASSWORD_ERROR_WEAK') : $t('PASSWORD_ERROR_EMPTY')
        "
        @validation="checkValid"
        @keyup.enter="enterHandler"
      />
      <CaInputText
        v-if="createMode"
        id="password-confirm"
        ref="inputPasswordConfirm"
        v-model="passwordConfirm"
        type="password"
        :label="$t('PASSWORD_CONFIRM')"
        validate="passwordMatch"
        :password-to-match="password"
        :error-text="$t('PASSWORD_ERROR_NO_MATCH')"
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
        v-if="!resetMode"
        class="ca-account-panel__button"
        type="full-width"
        :loading="createMode && loading"
        :color="loginMode ? 'secondary' : 'default'"
        @clicked="createAccountHandler()"
      >
        {{ $t('CREATE_ACCOUNT') }}
      </CaButton>
      <CaButton
        v-else
        class="ca-account-panel__button ca-account-panel__button--reset"
        type="full-width"
        :loading="loading"
        @clicked="resetPassword"
      >
        {{ $t('RESET_PASSWORD') }}
      </CaButton>
      <button
        v-if="!loginMode"
        class="ca-account-panel__back"
        @click="setFrame('login')"
      >
        {{ $t('BACK_TO_LOGIN') }}
      </button>
    </div>
  </CaContentPanel>
</template>
<script>
import CaContentPanel from 'CaContentPanel';
import CaInputText from 'CaInputText';
import CaInputCheckbox from 'CaInputCheckbox';
import CaButton from 'CaButton';
import CaFeedback from 'CaFeedback';
import { mapState } from 'vuex';
// @group Molecules
// @vuese
// The account panel. Includes content panel frames 'login', 'create', 'reset' and 'change'<br><br>
// **SASS-path:** _./styles/components/molecules/ca-account-panel.scss_
export default {
  name: 'CaAccountPanel',
  components: {
    CaContentPanel,
    CaInputText,
    CaButton,
    CaInputCheckbox,
    CaFeedback
  },
  mixins: [],
  props: {},
  data: vm => ({
    email: '',
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
        message: vm.$t('ACCOUNT_FEEDBACK_PASSWORD_CHANGE')
      },
      notValid: {
        type: 'error',
        message: vm.$t('ACCOUNT_FEEDBACK_FIELDS_NOT_VALID')
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
    // Closes panel after a delay of 2000 ms
    closePanelAfterDelay() {
      setTimeout(() => {
        this.$refs.contentpanel.close();
      }, 2000);
    },
    // @vuese
    // Log in action
    login() {
      this.loading = true;
      if (
        this.$refs.inputEmail.validateInput() &&
        this.$refs.inputPassword.validateInput()
      ) {
        // TODO: Login
        this.showFeedback(this.feedback.loggedIn);
        this.closePanelAfterDelay();
        this.loading = false;
      } else {
        this.showFeedback(this.feedback.notValid);
        this.loading = false;
      }
    },
    // @vuese
    // Create account action
    createAccount() {
      this.loading = true;
      if (
        this.$refs.inputEmail.validateInput() &&
        this.$refs.inputPassword.validateInput() &&
        this.$refs.inputPasswordConfirm.validateInput()
      ) {
        // TODO: Create account
        this.showFeedback(this.feedback.accountCreated);
        this.closePanelAfterDelay();
        this.loading = false;
      } else {
        this.showFeedback(this.feedback.notValid);
        this.loading = false;
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
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-account-panel';
</style>