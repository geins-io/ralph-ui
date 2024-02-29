import { mapState } from 'vuex';
// @group Mixins
// @vuese
// The functionality of the widget preview page<br><br>
// **Data:**<br>
// isAuthenticated: `false`
export default {
  name: 'MixWidgetPreview',
  middleware: 'ralph-authenticated',
  data: () => ({
    isAuthenticated: false,
  }),
  computed: {
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
          credentials: {
            username: 'preview-user@geins.io',
            rememberUser: false,
          },
          refetchQueries: true,
        });
        if (this.$route.query.redirect) {
          this.$router.push(this.$getPath('index'));
        } else {
          this.isAuthenticated = true;
        }
      }
    },
  },
  methods: {},
};
