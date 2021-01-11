<template>
  <CaContentPanel
    class="ca-account-panel"
    name="account"
    enter-from-mobile="bottom"
    :title="title"
  >
    <div class="ca-account-panel__inner">
      <CaInputText id="email" v-model="email" label="Email" />
      <CaInputText
        v-if="!resetMode"
        id="password"
        v-model="password"
        type="password"
        label="Lösenord"
      />
      <CaInputText
        v-if="createMode"
        id="password-confirm"
        v-model="passwordConfirm"
        type="password"
        label="Bekräfta lösenord"
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
      >
        Logga in
      </CaButton>
      <CaButton
        v-if="!resetMode"
        class="ca-account-panel__button"
        type="full-width"
        :color="loginMode ? 'secondary' : 'default'"
        @clicked="createAccountHandler"
      >
        Skapa konto
      </CaButton>
      <CaButton
        v-else
        class="ca-account-panel__button ca-account-panel__button--reset"
        type="full-width"
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
import { mapState } from 'vuex';
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-account-panel.scss_
export default {
  name: 'CaAccountPanel',
  components: { CaContentPanel, CaInputText, CaButton, CaInputCheckbox },
  mixins: [],
  props: {},
  data: () => ({
    email: '',
    password: '',
    passwordConfirm: '',
    rememberMe: true,
    newsletterSubscribe: true
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
        // post create account
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-account-panel';
</style>
