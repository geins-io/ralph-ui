import { mapState } from 'vuex';
import getUserQuery from 'user/get.graphql';
// @group Mixins
// @vuese
// The functionality of the account index page<br><br>
export default {
  name: 'MixAccountIndex',
  middleware: 'authenticated',
  data: () => ({}),
  computed: {
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
        // remove cart for new spoofed user
        this.$store.dispatch('cart/reset');
        this.auth.client.setTokenData({
          token: this.$route.query.loginToken,
          maxAge: 3600,
        });
        this.$store.dispatch('auth/update', {
          username: 'spoofed-user@geins.io',
          rememberUser: false,
        });
        if (this.$config.customerTypesToggle) {
          this.$apollo
            .query({
              query: getUserQuery,
              errorPolicy: 'all',
              fetchPolicy: 'no-cache',
            })
            .then((result) => {
              if (!result.errors) {
                const type = result.data?.getUser?.customerType;
                this.$store.dispatch('changeCustomerType', type);
                this.$store.dispatch('setCustomerTypeCookie', type);
                this.routeToAccount();
              }
            })
            .catch((error) => {
              // pass the error response to the error component
              this.$nuxt.error({ statusCode: 500, message: error });
            });
        } else {
          this.routeToAccount();
        }
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
    routeToAccount() {
      this.$router.replace(this.$getPath('account-orders'));
    },
  },
};
