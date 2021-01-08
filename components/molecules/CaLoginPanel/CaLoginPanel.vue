<template>
  <CaContentPanel
    class="ca-login-panel"
    name="account"
    enter-from-mobile="bottom"
    :title="title"
  >
    <div class="ca-login-panel__inner">
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

      <div v-if="loginMode" class="ca-login-panel__actions">
        <label>
          <input v-model="rememberMe" type="checkbox" /> Kom ihåg mig
        </label>
        <button class="ca-login-panel__forgot" @click="setFrame('reset')">
          Glömt lösenord?
        </button>
      </div>
      <div
        v-else-if="createMode"
        class="ca-login-panel__actions ca-login-panel__actions--create"
      >
        <label>
          <input v-model="newsletterSubscribe" type="checkbox" /> Ja, jag vill
          anmäla mig till nyhetsbrev
        </label>
        <div class="ca-login-panel__disclaimer">
          Genom att klicka "Skapa konto" accepterar du våra
          <a href="#">allmänna villkor</a> samt vår
          <a href="#">integritetspolicy</a>
        </div>
      </div>
      <CaButton
        v-if="loginMode"
        class="ca-login-panel__button"
        type="full-width"
      >
        Logga in
      </CaButton>
      <CaButton
        v-if="!resetMode"
        class="ca-login-panel__button"
        type="full-width"
        :color="loginMode ? 'secondary' : 'default'"
        @clicked="createAccountHandler"
      >
        Skapa konto
      </CaButton>
      <CaButton
        v-else
        class="ca-login-panel__button ca-login-panel__button--reset"
        type="full-width"
      >
        Återställ lösenord
      </CaButton>
      <button
        v-if="!loginMode"
        class="ca-login-panel__back"
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
import CaButton from 'CaButton';
import { mapState } from 'vuex';
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-login-panel.scss_
export default {
  name: 'CaLoginPanel',
  components: { CaContentPanel, CaInputText, CaButton },
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
    title() {
      switch (this.currentFrame) {
        case 'create':
          return 'Skapa konto';
        case 'reset':
          return 'Återställ lösenord';
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
@import 'molecules/ca-login-panel';
</style>
