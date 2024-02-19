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
      Object.values(this.$apollo.queries).forEach((query) => query.refetch());
      this.refetch();
    });
  },
  beforeDestroy() {
    this.$ralphBus.$off('refetch-queries');
  },
  methods: {
    async fetchData(query, variables, callback) {
      return await this.$apollo
        .query({
          query,
          variables,
          errorPolicy: 'all',
          fetchPolicy: this.fetchPolicy,
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
