<template>
  <CaContainer class="ca-error" width="slim">
    <h1 class="ca-error__title">
      {{ $t('ERROR_PAGE_TITLE') }}
    </h1>

    <a
      class="ca-button ca-button--primary ca-error__button"
      :href="$getPath('index')"
    >
      {{ $t('ERROR_PAGE_BUTTON') }}
    </a>
  </CaContainer>
</template>
<script>
// @group Molecules
// @vuese
// Component for logging all errors other then 404<br><br>
// **SASS-path:** _./styles/components/molecules/ca-error.scss_
export default {
  name: 'CaError',
  props: {
    // The error message object from the response
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
    // Send the errors to the required service
    logError() {
      this.$store.dispatch('events/push', {
        type: 'error:500',
        data: this.error,
      });
      this.$ralphLogError('ERROR:', this.error.message);
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-error';
</style>
