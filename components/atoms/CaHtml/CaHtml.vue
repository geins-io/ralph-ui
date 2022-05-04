<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    :id="'ca-html-' + id"
    class="ca-html"
    :class="{ 'ca-html--styled': styled }"
    v-html="content"
  />
</template>
<script>
// @group Atoms
// @vuese
// Parsing HTML adding listeners to links so that internal links gets routed to. Also adds a basic style to user added HTML if needed.<br>
// Source: https://github.com/TYPO3-Initiatives/nuxt-typo3/blob/master/lib/templates/components/utilities/HtmlParser.vue<br><br>
// **SASS-path:** _./styles/components/atoms/ca-html.scss_
export default {
  name: 'CaHtml',
  mixins: [],
  props: {
    // HTML content to parse
    content: {
      type: String,
      required: true
    },
    // Give the HTML a basic style
    styled: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    id: 0
  }),
  watch: {
    content: 'contentUpdated'
  },
  mounted() {
    this.id = Math.random();
    this.$nextTick(this.init);
  },
  beforeDestroy() {
    this.removeListeners();
  },
  methods: {
    init() {
      this.addListeners();
      this.initScript();
    },
    initScript() {
      const container = document.getElementById('ca-html-' + this.id);
      if (!container) {
        return;
      }
      const scriptsTags = container.getElementsByTagName('script');
      for (let i = scriptsTags.length - 1; i > -1; i--) {
        const parentNode = scriptsTags[i].parentNode;
        const newScriptTag = document.createElement('script');
        newScriptTag.type = 'text/javascript';
        newScriptTag.text = scriptsTags[i].text;
        if (scriptsTags[i].src) {
          newScriptTag.src = scriptsTags[i].src;
        }
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
    },
    navigate(event) {
      let target = event.target;
      let i = 0;
      // Go throught 5 parents max to find a tag
      while (
        i < 5 &&
        !(target instanceof HTMLAnchorElement) &&
        target.parentNode
      ) {
        target = target.parentNode;
        i++;
      }
      // If target is still not a link, ignore
      if (!(target instanceof HTMLAnchorElement)) {
        return;
      }
      return this.redirect(target);
    },
    redirect(target) {
      const href = target.getAttribute('href');
      // Get link target, if local link, navigate with router link
      if (href && href[0] === '/') {
        event.preventDefault();
        this.$router.push(href);
      }
    },
    contentUpdated() {
      this.removeListeners();
      this.$nextTick(() => {
        this.addListeners();
      });
    },
    addListeners() {
      this._links = this.$el.getElementsByTagName('a');
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false);
      }
    },
    removeListeners() {
      if (this._links) {
        for (let i = 0; i < this._links.length; i++) {
          this._links[i].removeEventListener('click', this.navigate, false);
        }
        this._links = [];
      }
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-html';
</style>
