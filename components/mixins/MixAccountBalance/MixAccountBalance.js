import getUserQuery from 'user/get.graphql';
// @group Mixins
// @vuese
// The functionality of the account balance page<br><br>
// **Data:**<br>
// user: `null`<br>
// loading: `false`
export default {
  name: 'MixAccountBalance',
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
  data: () => ({
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
