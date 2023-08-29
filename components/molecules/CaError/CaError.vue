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
    // the error message object from the response
    error: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  mounted() {
    this.logError();
  },
  methods: {
    // send the errors to the required service
    logError() {
      /* eslint-disable */
      console.error({
        errorMessage: this.error,
        url: this.$route.fullPath
      });
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-error';
</style>
