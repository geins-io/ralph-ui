import eventbus from '@ralph/ralph-ui/plugins/eventbus.js';

export default {
  name: 'MixApolloRefetch',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {
    eventbus.$on('refetch-apollo-queries', () => {
      this.isInitialRequest = true;
      Object.values(this.$apollo.queries).forEach(query => query.refetch());
    });
  },
  beforeDestroy() {
    eventbus.$off('refetch-apollo-queries');
  },
  methods: {}
};
