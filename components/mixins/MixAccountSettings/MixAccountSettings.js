import getUserQuery from 'user/get.graphql';
import MixFetch from 'MixFetch';
// @group Mixins
// @vuese
// The functionality of the account settings page<br><br>
// **Data:**<br>
// fetchPolicy: `'no-cache'`<br>
// user: `null`<br>
// genders: `[...]`
export default {
  name: 'MixAccountSettings',
  mixins: [MixFetch],
  middleware: 'ralph-authenticated',
  transition: 'no-transition',
  async fetch() {
    this.user = await this.fetchData(getUserQuery, (result) => {
      return result?.data?.getUser || null;
    });
  },
  data: (vm) => ({
    fetchPolicy: 'no-cache',
    user: null,
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
