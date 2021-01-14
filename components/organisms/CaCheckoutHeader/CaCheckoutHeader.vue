<template>
  <div class="ca-checkout-header">
    <CaIconButton
      v-if="!$store.getters.viewportComputer"
      class="ca-checkout-header__back"
      href="/"
      icon-name="chevron-left"
      aria-label="Back"
    />
    <NuxtLink to="/">
      <CaLogo class="ca-checkout-header__logo" alt="Logo" />
    </NuxtLink>
    <h1 class="ca-checkout-header__title">{{ title }}</h1>
    <CaButton
      v-if="$store.getters.viewportComputer"
      class="ca-checkout-header__button"
      color="secondary"
      href="/"
    >
      {{ $t('CONTINUE_SHOPPING') }}
    </CaButton>
  </div>
</template>
<script>
import CaLogo from 'CaLogo';
import CaButton from 'CaButton';
import CaIconButton from 'CaIconButton';

// @group Organisms
// @vuese
// The header of the checkout containing logo, title and a button to go back<br><br>
// **SASS-path:** _./styles/components/organisms/ca-checkout-header.scss_
export default {
  name: 'CaCheckoutHeader',
  components: { CaLogo, CaButton, CaIconButton },
  mixins: [],
  props: {
    // Title of the page
    title: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-checkout-header';
</style>
