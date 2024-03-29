<template>
  <div class="ca-widget-flowbox__container">
    <client-only>
      <div :id="widgetSectionId" class="ca-widget-flowbox__widget" />
    </client-only>
  </div>
</template>
<!-- eslint-disable no-console -->
<script>
import MixProductPage from 'MixProductPage';
import MixVariantHandler from 'MixVariantHandler';
// @group Molecules
// @vuese
// Flowbox widget handler component<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-flowbox.scss_
export default {
  name: 'CaWidgetFlowbox',
  mixins: [MixProductPage, MixVariantHandler],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isFlowboxScriptLoaded: false,
    isFlowboxActive: false,
    widgetSectionId: '',
  }),
  head() {
    return {
      script: [
        {
          // unique id for script
          hid: 'flowbox-js-embed',
          src: 'https://connect.getflowbox.com/flowbox.js',
          defer: true,
          async: true,
          // Changed after script load
          callback: () => {
            if (!window?.flowbox) {
              const f = function () {
                f.q.push(arguments);
              };
              f.q = [];
              window.flowbox = f;
            }
            this.isFlowboxScriptLoaded = true;
          },
        },
      ],
    };
  },
  computed: {},
  watch: {
    isFlowboxScriptLoaded(newVal) {
      if (newVal) {
        this.initFlowbox();
      }
    },
  },
  created() {
    this.widgetSectionId = this.generatePseudoId();
  },
  mounted() {},
  methods: {
    // @vuese
    // method to initialize widget with configuration data
    initFlowbox() {
      const locale = this.$i18n.locale;

      try {
        const {
          active,
          flowkey,
          dynamicProductFlow,
          dynamicTagFlow,
          tags,
          tagOperator: tagsOperator,
        } = this.configuration;
        this.isFlowboxActive = active;

        if (!flowkey) {
          this.$ralphLogError(
            'Missing Flowbox key - please check MC if it is filled',
          );
          return;
        }

        if (!active) {
          return;
        }
        // there is no productID which disables option to display dynamic flow
        if (dynamicProductFlow && !this.product?.productId) {
          this.$ralphLogError('Missing product id for dynamic product flow');
        }

        if (dynamicProductFlow && this.product?.productId) {
          window?.flowbox('init', {
            // Init for dynamic product flow
            container: `#${this.widgetSectionId}`,
            key: flowkey,
            productId: this.product.productId,
            locale,
          });
        } else if (dynamicTagFlow) {
          // Init for dynamic tag flow
          window?.flowbox('init', {
            container: `#${this.widgetSectionId}`,
            key: flowkey,
            tags,
            tagsOperator,
            locale,
          });
        } else {
          window?.flowbox('init', {
            // Init for default flow
            container: `#${this.widgetSectionId}`,
            key: flowkey,
            locale,
          });
        }
      } catch (error) {
        this.$ralphLogError('Something went wrong with flowbox initialization');
      }
    },
    // @vuese
    // temporary method to generate id for widget (to identify more widgets on the same page)
    generatePseudoId() {
      return (
        'flowbox-widget-' +
        (Math.random().toString(36) + Date.now().toString(36)).substring(2, 20)
      );
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-flowbox';
</style>
