import getUserQuery from 'user/get.graphql';
import MixFetch from 'MixFetch';
// @group Mixins
// @vuese
// The functionality of the account balance page<br><br>
// **Data:**<br>
// fetchPolicy: `'no-cache'`<br>
// user: `null`<br>
// loading: `false`
export default {
  name: 'MixAccountBalance',
  mixins: [MixFetch],
  middleware: 'ralph-authenticated',
  transition: 'no-transition',
  async fetch() {
    this.user = await this.fetchData(getUserQuery, (result) => {
      return result?.data?.getUser || null;
    });
  },
  data: () => ({
    fetchPolicy: 'no-cache',
    user: null,
    loading: false,
  }),
  computed: {
    // @vuese
    // Get the balance of the user
    // @type String
    balance() {
      return this.user ? this.user.balanceFormatted : '';
    },
  },
  methods: {},
};
