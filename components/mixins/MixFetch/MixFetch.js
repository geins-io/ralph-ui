// @group Mixins
// @vuese
// The mixin to use for all fetch and mutate operations towards the api. To watch your variables and refetch on change, create a computed property called `variables` with all your variables for the query<br><br>
// **Data:**<br>
// fetchPolicy: `'cache-first'`<br>
// errorPolicy: `'all'`<br>
export default {
  name: 'MixFetch',
  mixins: [],
  props: {},
  data: () => ({
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  }),
  computed: {
    // @vuese
    // The variables to watch and refetch on change. By default it's an empty object, this is just a placeholder. Create your own computed property with your variables to override this
    // @type Object
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
    // @vuese
    // Fetches data from the api and returns the result to the callback function
    // @arg (query, callback, variables = `this.variables`, callbackError = `this.callbackError`)
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
            if (
              this.$config.public.ralphLog.all ||
              this.$config.public.ralphLog.api
            ) {
              this.$ralphLog('api query', result?.data);
            }
            return callback(result);
          });
      } catch (error) {
        this.logErrors([error]);
        return this.callbackError();
      }
    },
    // @vuese
    // Mutates data in the api and returns the result to the callback function
    // @arg (mutation, callback, variables = `{}`, callbackError = `this.callbackError`)
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
            if (
              this.$config.public.ralphLog.all ||
              this.$config.public.ralphLog.api
            ) {
              this.$ralphLog('api mutation', result?.data);
            }
            return callback(result);
          });
      } catch (error) {
        this.logErrors([error]);
        return this.callbackError();
      }
    },
    // @vuese
    // Refetches the data from the api if the variables have changed. Used to watch `this.variables`
    // @arg (newVal, oldVal) Object, Object
    refetchOnChange(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.refetch();
      }
    },
    // @vuese
    // Refetches the data from the api
    refetch() {
      if (this.$fetch) {
        this.$fetch();
      }
    },
    // @vuese
    // Logs the errors to the console and to events
    // @arg (errors) Array
    logErrors(errors) {
      errors.forEach((error) => {
        this.$store.dispatch('events/push', {
          type: 'error:api',
          data: error,
        });
        this.$ralphLogError('ERROR:', error.message);
      });
    },
    // @vuese
    // Default callback function for when an error occurs, shows the error snackbar
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
