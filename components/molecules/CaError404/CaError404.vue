<template>
  <CaContainer class="ca-error404" width="slim">
    <h1 class="ca-error404__title">
      {{ $t('ERROR_PAGE_404_TITLE') }}
    </h1>

    <a
      class="ca-button ca-button--primary ca-error404__button"
      :href="$getPath('index')"
    >
      {{ $t('ERROR_PAGE_BUTTON') }}
    </a>
  </CaContainer>
</template>
<script>
// @group Molecules
// @vuese
// Handle 404 errors<br><br>
// **SASS-path:** _./styles/components/molecules/ca-error404.scss_
export default {
  name: 'CaError404',
  props: {
    error: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  mounted() {
    this.logError();
    this.$store.dispatch('loading/end');
  },
  methods: {
    // @vuese
    // Log error to events and console
    logError() {
      this.$store.dispatch('events/push', {
        type: 'error:404',
        data: this.error,
      });
      this.$ralphLogError('ERROR:', this.error.message);
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-error404';
</style>
