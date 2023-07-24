// @group Mixins
// @vuese
export default {
  name: 'MixLinkHandler',
  mixins: [],
  props: {},
  data: () => ({
    noLinkElement: 'div'
  }),
  computed: {
    processedHref() {
      const href = decodeURIComponent(this.href);
      if (this.href && this.href.includes(this.$store.state.hostname)) {
        const url = new URL(encodeURI(href));
        return url.pathname;
      } else {
        return encodeURI(href);
      }
    },
    isExternal() {
      return this.processedHref
        ? this.processedHref.includes('http') ||
            this.processedHref.includes(':')
        : false;
    },
    linkBaseElem() {
      if (this.processedHref) {
        return this.isExternal ? 'a' : 'NuxtLink';
      } else {
        return this.noLinkElement;
      }
    },
    linkElemAttributes() {
      if (!this.processedHref) {
        return this.noLinkElement === 'button' ? { type: 'button' } : '';
      }

      if (this.processedHref.includes(':')) {
        return {
          href: this.processedHref
        };
      }

      if (this.isExternal) {
        return {
          href: this.processedHref,
          target: '_blank',
          rel: 'noopener'
        };
      }
      const href = this.processedHref.startsWith('/')
        ? this.processedHref
        : this.$getPath(this.processedHref);
      return { to: href };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
