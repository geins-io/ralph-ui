// @group Mixins
// @vuese
// **Data:**<br>
// exampleVariable: `1`<br>
export default {
  name: 'MixFetch',
  mixins: [],
  props: {},
  data: () => ({
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  }),
  computed: {
    variables() {
      return {};
    },
  },
  watch: {
    variables: {
      deep: true,
      handler: 'refetchOnChange',
    },
  },
  mounted() {
    this.$ralphBus.$on('refetch-queries', () => {
      this.refetch();
    });
  },
  beforeDestroy() {
    this.$ralphBus.$off('refetch-queries');
  },
  methods: {
    async fetchData(
      query,
      callback,
      variables = this.variables,
      callbackError = this.callbackError,
    ) {
      try {
        return await this.$apollo
          .query({
            query,
            variables,
            fetchPolicy: this.fetchPolicy,
            errorPolicy: this.errorPolicy,
          })
          .then((result) => {
            if (result.errors) {
              this.logErrors(result.errors);
              return callbackError(result.errors);
            }
            if (this.$config.ralphLog.all || this.$config.ralphLog.api) {
              this.$ralphLog('api query', result?.data);
            }
            return callback(result);
          });
      } catch (error) {
        this.logErrors([error]);
        return this.callbackError();
      }
    },
    async mutateData(
      mutation,
      callback,
      variables = {},
      callbackError = this.callbackError,
    ) {
      try {
        return await this.$apollo
          .mutate({
            mutation,
            variables,
            fetchPolicy: 'no-cache',
            errorPolicy: this.errorPolicy,
          })
          .then((result) => {
            if (result.errors) {
              this.logErrors(result.errors);
              return callbackError(result.errors);
            }
            if (this.$config.ralphLog.all || this.$config.ralphLog.api) {
              this.$ralphLog('api mutation', result?.data);
            }
            return callback(result);
          });
      } catch (error) {
        this.logErrors([error]);
        return this.callbackError();
      }
    },
    refetchOnChange(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.refetch();
      }
    },
    refetch() {
      if (this.$fetch) {
        this.$fetch();
      }
    },
    logErrors(errors) {
      errors.forEach((error) => {
        this.$store.dispatch('events/push', {
          type: 'error:api',
          data: error,
        });
        this.$ralphLogError('ERROR:', error.message);
      });
    },
    callbackError() {
      if (process.client) {
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('FEEDBACK_ERROR'),
          placement: 'bottom-center',
          mode: 'error',
        });
      }
    },
  },
};
