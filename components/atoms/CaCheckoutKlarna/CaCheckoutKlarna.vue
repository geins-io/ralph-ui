<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="klarnaResponse !== null"
    class="ca-checkout-klarna"
    v-html="klarnaResponse.htmlSnippet"
  ></div>
</template>
<script>
import getKlarnaQuery from 'checkout/get-klarna.graphql';
import initKlarnaMutation from 'checkout/init-klarna.graphql';
// @group Atoms
// @vuese
// A component used to display the Klarna Checkout iFrame<br><br>
// **SASS-path:** _./styles/components/atoms/ca-checkout-klarna.scss_
export default {
  name: 'CaCheckoutKlarna',
  components: {},
  mixins: [],
  props: {
    confirm: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    klarnaResponse: null,
    cartUpdateTimeout: null,
    unwatch: null
  }),
  computed: {
    klarnaOrderId() {
      return this.$route.query.kid || null;
    }
  },
  mounted() {
    if (!this.confirm) {
      this.fetchKlarnaData();
    } else {
      this.fetchKlarnaConfirm();
    }
  },
  created() {
    if (!this.confirm) {
      this.unwatch = this.$store.watch(
        state => state.cart.data,
        newVal => {
          if (this.cartUpdateTimeout) {
            clearTimeout(this.cartUpdateTimeout);
          }
          this.cartUpdateTimeout = setTimeout(() => {
            this.fetchKlarnaData();
          }, 100);
        }
      );
    }
  },
  beforeDestroy() {
    if (!this.confirm) {
      this.unwatch();
    }
  },
  methods: {
    fetchKlarnaData() {
      if (this.klarnaResponse) {
        this.suspendKlarna();
      }
      this.$apollo
        .mutate({
          mutation: initKlarnaMutation,
          variables: {
            apiKey: this.$config.apiKey.toString(),
            cartId: this.$store.getters['cart/id'],
            checkout: {
              shippingId: null,
              pickupPoint: null,
              desiredDeliveryDate: null,
              message: null
            }
          }
        })
        .then(result => {
          if (
            !this.klarnaResponse ||
            result.data.initializeKlarna.newCheckoutSession
          ) {
            if (
              this.klarnaResponse &&
              result.data.initializeKlarna.newCheckoutSession
            ) {
              this.klarnaResponse = null;
            }
            this.klarnaResponse = result.data.initializeKlarna;
            this.$nextTick(() => {
              this.initializeKlarnaScript();
            });
          } else {
            this.resumeKlarna();
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    initializeKlarnaScript() {
      const checkoutContainer = document.getElementById(
        'klarna-checkout-container'
      );
      if (!checkoutContainer) return false;
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
    suspendKlarna() {
      window._klarnaCheckout(function(api) {
        api.suspend();
      });
    },
    resumeKlarna() {
      window._klarnaCheckout(function(api) {
        api.resume();
      });
    },
    fetchKlarnaConfirm() {
      if (!this.klarnaOrderId) return;
      this.$apollo
        .query({
          query: getKlarnaQuery,
          variables: {
            apiKey: this.$config.apiKey.toString(),
            klarnaOrderId: this.klarnaOrderId
          }
        })
        .then(result => {
          if (this.klarnaResponse && result.data.getKlarna.newCheckoutSession) {
            this.klarnaResponse = null;
          }
          this.klarnaResponse = result.data.getKlarna;
          this.$nextTick(() => {
            this.initializeKlarnaScript();
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
