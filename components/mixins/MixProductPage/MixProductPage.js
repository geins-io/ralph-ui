import MixMetaReplacement from 'MixMetaReplacement';
import productQuery from 'product/product.graphql';
import widgetAreaQuery from 'global/widget-area.graphql';
import combineQuery from 'graphql-combine-query';
// @group Mixins
// @vuese
// All functionality for the product page<br><br>
// **Data:**<br>
// quantity: `1`<br>
// replaceAlias: `null`<br>
export default {
  name: 'MixProductPage',
  mixins: [MixMetaReplacement],
  props: {},
  head() {
    return {
      title: this.metaReplacement(this.product?.meta.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaReplacement(this.product?.meta.description)
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.metaReplacement(this.product?.meta.title)
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.metaReplacement(this.product?.meta.description)
        }
      ]
    };
  },
  apollo: {
    product: {
      query() {
        let finishQuery = {
          document: productQuery,
          variables: {
            alias: this.prodAlias
          }
        };

        if (this.widgetAreaVars) {
          finishQuery = combineQuery('withAreaCombined')
            .add(finishQuery.document, finishQuery.variables)
            .addN(
              widgetAreaQuery,
              this.widgetAreaVars.map(item => ({
                ...item,
                filters: this.widgetAreaFilters
              }))
            );
        }

        this.initVariables = finishQuery.variables;
        return finishQuery.document;
      },
      variables() {
        return this.initVariables;
      },
      result(result) {
        if (!this.product && !process.server) {
          this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
          this.$store.dispatch('redirect404');
        }

        if (!this.hasSkuVariants) {
          this.setDefaultSku();
        } else if (this.skuIsChosen && !this.chosenSkuVariant) {
          this.resetSku();
        }

        const { product, ...widgetAreaInfo } = result.data;

        if (this.widgetAreaVars) {
          this.widgetData = widgetAreaInfo;
          this.isInitialRequest = false;
        }
        this.$store.dispatch('loading/end');
      },
      skip() {
        return !this.isInitialRequest;
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  data: () => ({
    quantity: 1,
    replaceAlias: null,
    currentNotifyVariant: {},
    initVariables: {},
    widgetData: {},
    isInitialRequest: true
  }),
  computed: {
    // @vuese
    // Quick ref to product images
    // @type Array
    productImages() {
      return this.product?.images && this.product.images.length
        ? this.product.images
        : [];
    },
    // @vuese
    // Alias used to fetch product data, using replaceAlias if it has a value
    // @type String
    prodAlias() {
      const routeParam = this.$route.params.alias.split('/').pop();
      return this.replaceAlias || routeParam;
    },
    // @vuese
    // Returns array of widget filters
    // @type Array
    widgetAreaFilters() {
      const filtersArray = [];

      if (this.product) {
        const categoryObj = {};
        categoryObj.key = 'Category';
        categoryObj.value = this.product.primaryCategory.alias;
        filtersArray.push(categoryObj);

        const brandObj = {};
        brandObj.key = 'Brand';
        brandObj.value = this.product.brand.alias;
        filtersArray.push(brandObj);

        const productObj = {};
        productObj.key = 'Product';
        productObj.value = this.prodAlias;
        filtersArray.push(productObj);
      }

      return filtersArray;
    },
    breadcrumbsCurrent() {
      return {
        name: this.product?.primaryCategory.name,
        alias: this.product?.primaryCategory.alias,
        canonical: this.product?.primaryCategory.canonicalUrl,
        id: this.product?.primaryCategory.categoryId,
        type: 'category'
      };
    }
  },
  watch: {
    // @vuese
    // Watching currentStock to change quantity if set higher than totalStock
    currentStock(val) {
      if (val === 0) {
        return;
      }
      if (this.quantity > val) {
        this.quantity = val;
      }
    }
  },
  mounted() {
    this.switchToCanonical();
  },
  methods: {
    // @vuese
    // Handler for changing quantity
    // @arg value (Number)
    onQuantityChange(value) {
      this.quantity = value;
    },
    // @vuese
    // Action for clicking the add to cart button
    addToCartClick() {
      if (!this.chosenSku.id) {
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('MUST_CHOOSE_SKU'),
          placement: 'bottom-center'
        });
      } else if (
        this.quantity + this.chosenSkuCartQuantity >
        this.currentStock
      ) {
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('CART_ADD_TOO_MANY', { stock: this.currentStock }),
          placement: 'bottom-center'
        });
      } else {
        this.addToCartLoading = true;
        this.addToCart(this.chosenSku.id, this.quantity, this.product);
      }
    },
    // @vuese
    // Replace product data without reloading the page. Used for changing between product variants
    // @arg alias (String)
    replaceProduct(alias) {
      this.replaceAlias = alias;
      history.replaceState(null, null, alias);
    },
    // @vuese
    // Handler for changing the sku
    // @arg data (Object)
    sizeChangeHandler(data) {
      this.setSku(data.id, data.value);
    },
    // @vuese
    // Handler for reaching quantity threshold
    quantityThresholdHandler() {
      this.$store.dispatch('snackbar/trigger', {
        message: this.$t('QUANTITY_THRESHOLD_REACHED', {
          quantity: this.chosenSkuCartQuantity
        }),
        placement: 'bottom-center'
      });
    },
    // @vuese
    // Switching to canonical url if different from route path
    switchToCanonical() {
      const check = setInterval(() => {
        if (this.product) {
          clearInterval(check);
          if (this.product.canonicalUrl !== this.$route.path) {
            history.replaceState(null, null, this.product.canonicalUrl);
          }
        }
      }, 500);
    },
    notifyHandler(variant) {
      this.currentNotifyVariant = variant;
      this.$nextTick(() => {
        this.$store.commit('contentpanel/open', {
          name: 'notify'
        });
      });
    }
  }
};
