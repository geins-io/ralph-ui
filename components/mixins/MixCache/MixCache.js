import eventbus from '@ralph/ralph-ui/plugins/eventbus.js';

export default {
  name: 'MixCache',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {
    eventbus.$on('clear-cache', () => {
      this.isInitialRequest = true;
      Object.values(this.$apollo.queries).forEach(query => query.refetch());
    });
  },
  beforeDestroy() {
    eventbus.$off('clear-cache');
  },
  methods: {}
};
