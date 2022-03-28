export default {
  name: 'MixProductCard',
  mixins: [],
  props: {
    baseTag: {
      type: String,
      default: 'li'
    },
    product: {
      type: Object,
      required: true
    },
    pageNumber: {
      type: Number,
      default: 0
    }
  },
  data: () => ({ observer: null, trackCounter: 0 }),
  computed: {
    productPopulated() {
      return Object.keys(this.product).length > 0;
    }
  },
  watch: {},
  created() {
    if (process.client) {
      const options = {
        rootMargin: '0px',
        threshold: 1.0
      };
      const callback = () => {
        if (this.trackCounter <= 1) {
          if (this.trackCounter === 1) {
            this.gtmViewEvent();
          }
          this.trackCounter = this.trackCounter + 1;
        } else {
          this.observer.disconnect();
        }
      };
      this.observer = new IntersectionObserver(callback, options);
    }
  },
  mounted() {
    this.observer.observe(this.$el);
  },
  methods: {
    productClickHandler() {
      this.gtmClickEvent();
      if (this.pageNumber > 0) {
        this.$store.commit('list/setRelocatePage', this.pageNumber);
        this.$store.commit('list/setRelocateAlias', this.product.alias);
      }
    },

    gtmViewEvent() {
      if (this.$gtm) {
        this.$gtm.push({
          event: 'Product Impression',
          eventInfo: {},
          ecommerce: {
            currencyCode: 'SEK',
            detail: {
              products: this.getGtmProductFormat()
            }
          },
          'gtm.uniqueEventId': 4
        });
      }
    },

    gtmClickEvent() {
      if (this.$gtm) {
        this.$gtm.push({
          event: 'Product Click',
          eventInfo: {
            context: 'Outlet'
          },
          ecommerce: {
            click: {
              actionField: {
                list: 'Outlet',
                action: 'click'
              },
              products: this.getGtmProductFormat()
            }
          },
          'gtm.uniqueEventId': 12
        });
      }
    },

    getGtmProductFormat() {
      return [
        {
          id: this.product.productId,
          name: this.product.name,
          brand: this.product.brand?.name,
          category: this.product.primaryCategory?.name,
          price: this.product.unitPrice.sellingPriceExVat,
          tax: this.product.unitPrice.vat,
          inStock: Boolean(this.product?.totalStock?.inStock),
          urgencyLabelDisplayed: false,
          position: 1
        }
      ];
    }
  }
};
