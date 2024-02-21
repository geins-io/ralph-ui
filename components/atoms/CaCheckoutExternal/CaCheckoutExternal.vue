<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="frame"
    id="checkout-external"
    class="ca-checkout-external"
    :class="modifiers"
    v-html="frame"
  />
  <CaSpinner v-else class="ca-checkout-external__loading" />
</template>
<script>
// @group Atoms
// @vuese
// Renders the external checkout frame from a snippet given by the API. Has built in support for Klarna, SVEA and Walley Checkout<br><br>
// **SASS-path:** _./styles/components/atoms/ca-checkout-external.scss_
export default {
  name: 'CaCheckoutExternal',
  mixins: [],
  props: {
    // The external checkout snippet received from the api
    data: {
      type: String,
      default: null,
    },
    // Is it a new checkout session?
    newCheckoutSession: {
      type: Boolean,
      default: false,
    },
    // What type of payment?
    type: {
      // `KLARNA`, `SVEA`, `WALLEY`, `AVARDA`
      type: String,
      required: true,
      validator: (value) =>
        ['KLARNA', 'SVEA', 'WALLEY', 'AVARDA'].includes(value),
    },
  },
  data: () => ({
    frame: null,
    suspended: false,
  }),
  computed: {
    // @vuese
    // The external order id
    // @type String
    orderId() {
      switch (this.type) {
        case 'KLARNA':
          return this.$route.query.kid;
        case 'SVEA':
          return this.$route.query.sid;
        case 'WALLEY':
          return this.$route.query.wid;
        case 'AVARDA':
          return this.$route.query.aid;
        default:
          return null;
      }
    },
    // @vuese
    // Modifier for checkout. Add suspended class if avarda since avard doesn't have a suspended state
    // @type Object
    modifiers() {
      return {
        'ca-checkout-external--suspended':
          this.suspended && this.type === 'AVARDA',
      };
    },
  },
  watch: {
    type(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initialize(true);
      }
    },
  },
  mounted() {
    this.initialize();
  },
  methods: {
    // @vuese
    // Initializing the checkout frame
    initialize(reset = false) {
      this.suspended = false;
      if ((this.frame && this.newCheckoutSession) || reset) {
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
      const checkoutWrapper = document.getElementById('checkout-external');

      const scriptsTags = checkoutWrapper?.getElementsByTagName('script') || [];
      for (let i = scriptsTags.length - 1; i > -1; i--) {
        const parentNode = scriptsTags[i].parentNode;
        const newScriptTag = document.createElement('script');
        newScriptTag.type = 'text/javascript';
        newScriptTag.text = scriptsTags[i].text;

        if (scriptsTags[i].dataset) {
          Object.assign(newScriptTag.dataset, scriptsTags[i].dataset);
        }

        if (scriptsTags[i].src) {
          newScriptTag.src = scriptsTags[i].src;
        }
        parentNode.removeChild(scriptsTags[i]);
        parentNode.appendChild(newScriptTag);
      }
    },
    // @vuese
    // Suspend the checkout
    suspend() {
      if (this.frame) {
        switch (this.type) {
          case 'KLARNA':
            if (window._klarnaCheckout) {
              window._klarnaCheckout(function (api) {
                api.suspend();
              });
            }
            return;
          case 'SVEA':
            if (window.scoApi) {
              window.scoApi.setCheckoutEnabled(false);
            }
            return;
          case 'WALLEY':
            if (window.collector) {
              window.collector.checkout.api.suspend();
            }
            return;
        }
        this.suspended = true;
      }
    },
    // @vuese
    // Resume the checkout
    resume() {
      if (this.frame && this.suspended) {
        switch (this.type) {
          case 'KLARNA':
            if (window._klarnaCheckout) {
              window._klarnaCheckout(function (api) {
                api.resume();
              });
            } else {
              setTimeout(this.resume, 100);
            }
            return;
          case 'SVEA':
            if (window.scoApi) {
              window.scoApi.setCheckoutEnabled(true);
            }
            return;
          case 'WALLEY':
            if (window.collector) {
              window.collector.checkout.api.resume();
            }
            return;
          case 'AVARDA':
            if (window.avardaCheckout) {
              window.avardaCheckout.refreshForm();
            }
        }
        this.suspended = false;
      } else {
        this.initialize(true);
      }
    },
  },
};
</script>
<style lang="scss">
@import 'atoms/ca-checkout-external';
</style>
