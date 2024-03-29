import menuQuery from 'global/menu.graphql';
import MixFetch from 'MixFetch';
// @group Mixins
// @vuese
// Functionality and endpoint call for menus<br><br>
// **Data:**<br>
// menu: `null`<br>
// defaultElementTag: `'span'`<br>
export default {
  name: 'MixMenu',
  mixins: [MixFetch],
  props: {
    // The location id for the menu
    menuLocationId: {
      type: [String, null],
      default: null,
    },
    // If true, the menu will be fetched only on client side
    onlyClientSide: {
      type: Boolean,
      default: false,
    },
  },
  async fetch() {
    this.menu = await this.fetchData(menuQuery, (result) => {
      return result?.data?.getMenuAtLocation || [];
    });
  },
  data: () => ({
    menu: null,
    defaultElementTag: 'span',
  }),
  computed: {
    // @vuese
    // Variables for the menu query
    // @type Object
    variables() {
      return {
        menuLocationId: this.menuLocationId,
      };
    },
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Get attributes for link
    // @arg item (Object)
    getAttributes(item) {
      const path = this.processedUrl(item.canonicalUrl);

      if (this.isExternal(path)) {
        return {
          href: path,
          rel: 'noopener',
          ...(item.targetBlank ? { target: '_blank' } : {}),
        };
      }
      const href = path.startsWith('/') ? path : this.$getPath(path);
      return { to: href };
    },
    // @vuese
    // Get base element for link
    // @arg item (Object)
    getBaseElem(item) {
      const path = this.processedUrl(item.canonicalUrl);
      if (path) {
        return this.isExternal(path) ? 'a' : 'NuxtLink';
      }
      return this.defaultElementTag;
    },
    // @vuese
    // Convert to valid url - encodeURI
    // @arg item String
    processedUrl(pathUrl) {
      if (pathUrl?.includes(this.$store.state.hostname)) {
        const url = new URL(encodeURI(pathUrl));
        return url.pathname;
      }
      return encodeURI(pathUrl);
    },
    // @vuese
    // Get label for for link
    // @arg item (Object)
    getLabel(item) {
      return item.label || item.title;
    },
    // @vuese
    // Get items that have a label
    // @arg items (Array)
    getItemsWithLabel(items) {
      return items.filter((x) => this.getLabel(x));
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
    },
    // @vuese
    // Check if provided path is external (url) or internal
    // @arg path String
    isExternal(path) {
      return path.includes('http') || path.includes(':');
    },
    // @vuese
    // Pushing the menu:click event
    clickHandler(item) {
      this.$store.dispatch('events/push', {
        type: 'menu:click',
        data: {
          item,
        },
      });
    },
  },
};
