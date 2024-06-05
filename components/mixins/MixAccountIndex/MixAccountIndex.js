import { mapState } from 'vuex';
import getUserQuery from 'user/get.graphql';
import MixFetch from 'MixFetch';
// @group Mixins
// @vuese
// The functionality of the account index page<br><br>
export default {
  name: 'MixAccountIndex',
  middleware: 'ralph-authenticated',
  mixins: [MixFetch],
  data: () => ({
    fetchPolicy: 'no-cache',
  }),
  computed: {
    // @vuese
    // The title of the account page
    // @type String
    title() {
      return this.$route.query.loginToken
        ? this.$t('ACCOUNT_LOGGING_IN_AS_USER')
        : this.$t('ACCOUNT_TITLE');
    },
    ...mapState(['auth']),
  },
  watch: {
    async 'auth.client'(val) {
      if (val && this.$route.query.loginToken) {
        if (this.$store.getters['auth/authenticated']) {
          await this.$store.dispatch('auth/logout');
        }
        // Remove cart for new spoofed user
        this.$store.dispatch('cart/reset');
        this.auth.client.setTokenData({
          token: this.$route.query.loginToken,
          maxAge: 3600,
        });
        this.$store.dispatch('auth/update', {
          credentials: {
            username: 'spoofed-user@geins.io',
            rememberUser: false,
          },
          refetchQueries: true,
        });
        if (this.$config.public.customerTypesToggle) {
          const type = await this.fetchData(getUserQuery, (result) => {
            return result?.data?.getUser?.customerType || null;
          });
          this.$store.dispatch('changeCustomerType', type);
          this.$store.dispatch('setCustomerTypeCookie', type);
        }
        this.routeToAccount();
      }
    },
  },
  created() {},
  mounted() {
    if (!this.$route.query.loginToken) {
      this.routeToAccount();
    }
  },
  methods: {
    // @vuese
    // Routes to the account page
    routeToAccount() {
      this.$router.replace(this.$getPath('account-orders'));
    },
  },
};
