<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-if="frame" class="ca-checkout-klarna" v-html="frame"></div>
  <CaSpinner v-else class="ca-checkout-klarna__loading" />
</template>
<script>
import getKlarnaQuery from 'checkout/get-checkout.graphql';
// @group Atoms
// @vuese
// A component used to display the Klarna Checkout iFrame<br><br>
// **SASS-path:** _./styles/components/atoms/ca-checkout-klarna.scss_
export default {
  name: 'CaCheckoutKlarna',
  mixins: [],
  props: {
    // The response markup from Klarna
    data: {
      type: String,
      default: null
    },
    // Is it a new checkout session?
    newCheckoutSession: {
      type: Boolean,
      default: false
    },
    // Is this the confirm page?
    confirm: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    frame: null
  }),
  computed: {
    // @vuese
    // The Klarna order id
    // @type String
    klarnaOrderId() {
      return this.$route.query.kid || null;
    }
  },
  watch: {},
  mounted() {
    if (!this.confirm) {
      this.initialize();
    } else {
      this.fetchConfirm();
    }
  },
  created() {},
  methods: {
    // @vuese
    // Initializing the checkout frame
    initialize() {
      if (this.frame && this.newCheckoutSession) {
        this.frame = null;
      }
      this.frame = this.data;
      this.$nextTick(() => {
        this.initScript();
      });
    },
    // @vuese
    // Initializing all scripts
    initScript() {
      const checkoutContainer = document.getElementById(
        'klarna-checkout-container'
      );
      if (!checkoutContainer) {
        return false;
      }
      const scriptsTags = checkoutContainer.getElementsByTagName('script');
      for (let i = 0; i < scriptsTags.length; i++) {
        const parentNode = scriptsTags[i].parentNode;
        const newScriptTag = document.createElement('script');
        newScriptTag.type = 'text/javascript';
        newScriptTag.text = scriptsTags[i].text;
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
    },
    // @vuese
    // Suspend the checkout
    suspend() {
      if (this.frame) {
        window._klarnaCheckout(function(api) {
          api.suspend();
        });
      }
    },
    // @vuese
    // Resume the checkout
    resume() {
      if (this.frame) {
        if (window._klarnaCheckout) {
          window._klarnaCheckout(function(api) {
            api.resume();
          });
        } else {
          setTimeout(this.resume, 100);
        }
      }
    },
    // @vuese
    // Fetch the confirm frame
    fetchConfirm() {
      if (!this.klarnaOrderId) {
        return;
      }
      this.$apollo
        .query({
          query: getKlarnaQuery,
          variables: {
            orderId: this.klarnaOrderId
          }
        })
        .then(result => {
          if (this.frame) {
            this.frame = null;
          }
          this.frame = result.data.getCheckout;
          this.$nextTick(() => {
            this.initScript();
          });
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-checkout-klarna';
</style>
