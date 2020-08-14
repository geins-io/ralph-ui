<template>
  <div class="ca-checkout-header">
    <button
      v-if="!$store.getters.viewportLaptop"
      class="ca-checkout-header__back"
      @click="$router.back()"
    >
      <CaIcon name="chevron-left" />
    </button>
    <NuxtLink to="/">
      <CaLogo class="ca-checkout-header__logo" alt="Logo" />
    </NuxtLink>
    <h1 class="ca-checkout-header__title">{{ title }}</h1>
    <CaButton
      v-if="$store.getters.viewportLaptop"
      class="ca-checkout-header__button"
      color="secondary"
      @clicked="$router.back()"
    >
      {{ $t('CONTINUE_SHOPPING') }}
    </CaButton>
  </div>
</template>
<script>
import CaLogo from 'CaLogo';
import CaButton from 'CaButton';
import CaIcon from 'CaIcon';

// @group Organisms
// @vuese
export default {
  name: 'CaCheckoutHeader',
  components: { CaLogo, CaButton, CaIcon },
  mixins: [],
  props: {
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
.ca-checkout-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: $default-spacing;
  &__logo {
    width: $checkout-logo-width;
    @include bp(laptop) {
      width: $checkout-logo-width-desktop;
    }
  }
  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin: 0 auto 0 rem-calc(13px);
    padding-left: rem-calc(13px);
    border-left: 1px solid $c-darkest-gray;
  }
  &__back {
    font-size: 20px;
    margin-right: auto;
    line-height: 0;
  }
  &__button {
    padding: 0.9em;
  }
}
</style>
