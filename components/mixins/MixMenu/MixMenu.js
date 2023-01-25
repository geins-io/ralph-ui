import menuQuery from 'global/menu.graphql';
import MixApolloRefetch from 'MixApolloRefetch';
// @group Mixins
// @vuese
// Functionality and endpoint call for menus
// **Data:**<br>
// menu: `null`<br>
export default {
  name: 'MixMenu',
  mixins: [MixApolloRefetch],
  apollo: {
    getMenuAtLocation: {
      query: menuQuery,
      variables() {
        return {
          menuLocationId: this.menuLocationId
        };
      },
      errorPolicy: 'all',
      result(result) {
        this.menu = result?.data?.getMenuAtLocation || [];
        this.$store.dispatch('cart/get');
      },
      skip() {
        return !this.menuLocationId || !process.client;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    }
  },
  props: {
    // The location id for the menu
    menuLocationId: {
      type: [String, null],
      default: null
    }
  },
  data: () => ({
    menu: null
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Get attributes for link
    // @arg item (Object)
    getAttributes(item) {
      if (item.targetBlank) {
        return {
          href: item.canonicalUrl,
          target: '_blank',
          rel: 'noopener'
        };
      } else {
        return {
          to: item.canonicalUrl
        };
      }
    },
    // @vuese
    // Get base element for link
    // @arg item (Object)
    getBaseElem(item) {
      return item.targetBlank ? 'a' : 'NuxtLink';
    },
    // @vuese
    // Get label for for link
    // @arg item (Object)
    getLabel(item) {
      return item.label || item.title;
    },
    // @vuese
    // Get parent label for link
    // @arg item (Object)
    getParentLinkLabel(item) {
      const text =
        item.type === 'custom' || item.type === 'page'
          ? this.$t('NAVIGATION_GO_TO')
          : this.$t('NAVIGATION_ALL_IN');
      return text + ' ' + this.getLabel(item);
    }
  }
};
