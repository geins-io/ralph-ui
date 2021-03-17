<template>
  <transition name="pop-from-bottom">
    <div v-if="!hidden" class="ca-cookie-consent">
      <p class="ca-cookie-consent__paragraph">
        {{ $t('COOKIE_CONSENT_TEXT') }}
        <NuxtLink class="ca-cookie-consent__link" :to="'/cookies'">
          {{ $t('COOKIE_CONSENT_LEARN_MORE') }}
        </NuxtLink>
      </p>
      <CaButton
        class="ca-cookie-consent__button ca-cookie-consent__button--decline"
        color="transparent"
        size="s"
        :type="buttonType"
        @clicked="setCookie(false)"
      >
        {{ $t('COOKIE_CONSENT_DECLINE') }}
      </CaButton>
      <CaButton
        class="ca-cookie-consent__button ca-cookie-consent__button--allow"
        size="s"
        :type="buttonType"
        @clicked="setCookie(true)"
      >
        {{ $t('COOKIE_CONSENT_ALLOW') }}
      </CaButton>
    </div>
  </transition>
</template>
<script>
// @group Molecules
// @vuese
// The cookie consent bar<br><br>
// **SASS-path:** _./styles/components/molecules/ca-cookie-consent.scss_
export default {
  name: 'CaCookieConsent',
  mixins: [],
  props: {},
  data: () => ({
    hidden: true
  }),
  computed: {
    buttonType() {
      return this.$store.getters.viewport === 'phone' ? 'full-width' : '';
    }
  },
  watch: {},
  mounted() {
    if (this.$cookies.get('ralph-cookie-consent') === undefined) {
      this.show();
    }
  },
  methods: {
    show() {
      this.hidden = false;
    },
    hide() {
      this.hidden = true;
    },
    setCookie(consent) {
      this.$cookies.set('ralph-cookie-consent', consent, {
        path: '/',
        expires: new Date(new Date().getTime() + 31536000000)
      });
      this.hide();
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-cookie-consent';
</style>
