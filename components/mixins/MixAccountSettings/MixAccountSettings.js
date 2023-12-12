import getUserQuery from 'user/get.graphql';
// @group Mixins
// @vuese
// The functionality of the account settings page<br><br>
// **Data:**<br>
// user: `null`<br>
// loading: `false`<br>
// genders: `[...]`
export default {
  name: 'MixAccountSettings',
  middleware: 'authenticated',
  transition: 'no-transition',
  apollo: {
    getUser: {
      query: getUserQuery,
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
      result(result) {
        if (result.data) {
          this.user = result.data.getUser;
        }
      },
      error(error) {
        this.$nuxt.error({ statusCode: 500, message: error });
      },
    },
  },
  data: (vm) => ({
    user: null,
    loading: false,
    genders: [
      {
        value: 'UNSPECIFIED',
        label: vm.$t('ACCOUNT_GENDER_UNSPECIFIED'),
      },
      {
        value: 'WOMAN',
        label: vm.$t('ACCOUNT_GENDER_WOMAN'),
      },
      {
        value: 'MAN',
        label: vm.$t('ACCOUNT_GENDER_MAN'),
      },
    ],
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
