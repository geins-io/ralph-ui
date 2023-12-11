export default {
  name: 'MixApolloRefetch',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {
    this.$ralphBus.$on('refetch-apollo-queries', () => {
      this.isInitialRequest = true;
      Object.values(this.$apollo.queries).forEach((query) => query.refetch());
    });
  },
  beforeDestroy() {
    this.$ralphBus.$off('refetch-apollo-queries');
  },
  methods: {},
};
