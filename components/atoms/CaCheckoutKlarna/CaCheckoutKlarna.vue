<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="klarnaResponse !== {}"
    class="ca-checkout-klarna"
    v-html="klarnaResponse.html_snippet"
  ></div>
</template>
<script>
// @group Atoms
// @vuese
export default {
  name: 'CaCheckoutKlarna',
  components: {},
  mixins: [],
  props: {},

  data: () => ({
    klarnaResponse: {}
  }),
  mounted() {
    this.fetchKlarnaData();
  },
  methods: {
    fetchKlarnaData() {
      // replace `getPost` with your data fetching util / API wrapper
      fetch('/api/klarna-checkout-orders/')
        .then(response => response.json())
        .then(data => {
          this.klarnaResponse = data;
          setTimeout(() => {
            this.initializeKlarnaScript();
          }, 50);
        });
    },
    initializeKlarnaScript() {
      const checkoutContainer = document.getElementById(
        'klarna-checkout-container'
      );
      const scriptsTags = checkoutContainer.getElementsByTagName('script');
      for (let i = 0; i < scriptsTags.length; i++) {
        const parentNode = scriptsTags[i].parentNode;
        const newScriptTag = document.createElement('script');
        newScriptTag.type = 'text/javascript';
        newScriptTag.text = scriptsTags[i].text;
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
    }
  }
};
</script>
<style lang="scss">
.ca-checkout-klarna {
}
</style>
