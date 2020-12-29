// @group Mixins
// @vuese
export default {
  name: 'MixLinkHandler',
  components: {},
  mixins: [],
  props: {},
  data: () => ({
    noLinkElement: 'div'
  }),
  computed: {
    processedHref() {
      if (this.href && this.href.includes(this.$store.state.hostname)) {
        const url = new URL(this.href);
        return url.pathname;
      } else return this.href;
    },
    isExternal() {
      return this.processedHref ? this.processedHref.includes('http') : false;
    },
    linkBaseElem() {
      if (this.processedHref) {
        return this.isExternal ? 'a' : 'NuxtLink';
      } else return this.noLinkElement;
    },
    linkElemAttributes() {
      if (this.processedHref) {
        return this.isExternal
          ? { href: this.processedHref, target: '_blank', rel: 'noopener' }
          : { to: this.processedHref };
      } else return '';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
