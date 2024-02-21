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
      fetchPolicy = this.fetchPolicy,
      errorPolicy = this.errorPolicy,
    ) {
      return await this.$apollo
        .query({
          query,
          variables,
          fetchPolicy,
          errorPolicy,
        })
        .then((result) => {
          if (this.$config.ralphLog.all || this.$config.ralphLog.api) {
            this.$ralphLog('api', result?.data);
          }
          return callback(result);
        })
        .catch((error) => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    },
    refetchOnChange(newVal, oldVal) {
      if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
        this.$fetch();
      }
    },
    refetch() {
      this.$fetch();
    },
  },
};
