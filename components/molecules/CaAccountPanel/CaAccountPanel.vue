<template>
  <CaContentPanel
    ref="contentpanel"
    class="ca-account-panel"
    name="account"
    enter-from-mobile="bottom"
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
        label="Email"
        validate="email"
        error-text="Du måste ange en giltig email"
      />
      <CaInputText
        v-if="!resetMode"
        id="password"
        ref="inputPassword"
        v-model="password"
        type="password"
        label="Lösenord"
        :validate="createMode ? 'passwordStrength' : ''"
        error-text="Ditt lösenord är för svagt"
      />
      <CaInputText
        v-if="createMode"
        id="password-confirm"
        ref="inputPasswordConfirm"
        v-model="passwordConfirm"
        type="password"
        label="Bekräfta lösenord"
        validate="passwordMatch"
        :password-to-match="password"
        error-text="Lösenorden matchar inte"
      />

      <div v-if="loginMode" class="ca-account-panel__actions">
        <CaInputCheckbox
          id="remember"
          v-model="rememberMe"
          label="Kom ihåg mig"
        />
        <button class="ca-account-panel__forgot" @click="setFrame('reset')">
          Glömt lösenord?
        </button>
      </div>
      <div
        v-else-if="createMode"
        class="ca-account-panel__actions ca-account-panel__actions--create"
      >
        <CaInputCheckbox
          id="newsletter"
          v-model="newsletterSubscribe"
          label="Ja, jag vill anmäla mig till nyhetsbrev"
        />
        <!-- TODO: Länka villkor + integritetspolicy -->
        <div class="ca-account-panel__disclaimer">
          Genom att klicka "Skapa konto" accepterar du våra
          <a href="#">allmänna villkor</a> samt vår
          <a href="#">integritetspolicy</a>
        </div>
      </div>
      <CaButton
        v-if="loginMode"
        class="ca-account-panel__button"
        type="full-width"
        @clicked="login"
      >
        Logga in
      </CaButton>
      <CaButton
        v-if="!resetMode"
        class="ca-account-panel__button"
        type="full-width"
        :color="loginMode ? 'secondary' : 'default'"
        @clicked="createAccountHandler()"
      >
        Skapa konto
      </CaButton>
      <CaButton
        v-else
        class="ca-account-panel__button ca-account-panel__button--reset"
        type="full-width"
        @clicked="resetPassword"
      >
        Återställ lösenord
      </CaButton>
      <button
        v-if="!loginMode"
        class="ca-account-panel__back"
        @click="setFrame('login')"
      >
        Tillbaka till inloggning
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
// (Description of component)<br><br>
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
  data: () => ({
    email: '',
    password: '',
    passwordConfirm: '',
    rememberMe: true,
    newsletterSubscribe: true,
    currentFeedback: {
      type: 'info',
      message: ''
    },
    feedback: {
      accountCreated: {
        type: 'success',
        message: 'Ditt konto har blivit skapat, du är nu inloggad'
      },
      wrongCredentials: {
        type: 'error',
        message: 'Fel email eller lösenord, försök gärna igen'
      },
      loggedIn: {
        type: 'success',
        message: 'Du har loggats in'
      },
      passwordResetted: {
        type: 'success',
        message: 'Ett mail för återställning av lösenord har skickats till dig'
      },
      passwordChanged: {
        type: 'success',
        message: 'Ditt lösenord har ändrats'
      },
      notValid: {
        type: 'error',
        message: 'Se till att alla fält är giltiga'
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
          return 'Skapa konto';
        case 'reset':
          return 'Återställ lösenord';
        case 'change':
          return 'Ändra lösenord';
        default:
          return 'Logga in';
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
    setFrame(frame) {
      this.$store.commit('contentpanel/setFrame', frame);
    },
    createAccountHandler() {
      if (this.loginMode) {
        this.setFrame('create');
      } else {
        this.createAccount();
      }
    },
    showFeedback(feedback) {
      this.currentFeedback = feedback;
      this.$refs.feedback.show();
    },
    closePanelAfterDelay() {
      setTimeout(() => {
        this.$refs.contentpanel.close();
      }, 2000);
    },
    login() {
      if (this.$refs.inputEmail.validateInput()) {
        // TODO: Login
        this.showFeedback(this.feedback.loggedIn);
        this.closePanelAfterDelay();
      } else {
        this.showFeedback(this.feedback.notValid);
      }
    },
    createAccount() {
      if (
        this.$refs.inputEmail.validateInput() &&
        this.$refs.inputPassword.validateInput() &&
        this.$refs.inputPasswordConfirm.validateInput()
      ) {
        // TODO: Create account
        this.showFeedback(this.feedback.accountCreated);
        this.closePanelAfterDelay();
      } else {
        this.showFeedback(this.feedback.notValid);
      }
    },
    resetPassword() {
      if (this.$refs.inputEmail.validateInput()) {
        // TODO: Password reset
        this.showFeedback(this.feedback.passwordResetted);
        this.$refs.feedback.show();
      } else {
        this.showFeedback(this.feedback.notValid);
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-account-panel';
</style>
