<template>
  <CaContainer class="ca-error404" width="slim">
    <h1 class="ca-error404__title">
      {{ $t('ERROR_PAGE_404_TITLE') }}
    </h1>

    <a class="ca-button ca-button--primary ca-error404__button" href="/">
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
      default: () => {}
    }
  },
  mounted() {
    this.logError();
  },
  methods: {
    // send the errors to the required service
    logError() {
      /* eslint-disable */
      console.log({
        statusCode: this.error.statusCode,
        url: this.$route.fullPath
      });
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-error404';
</style>
