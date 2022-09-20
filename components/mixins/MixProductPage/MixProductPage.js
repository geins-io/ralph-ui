import MixMetaReplacement from 'MixMetaReplacement';
import MixCache from 'MixCache';
import productQuery from 'product/product.graphql';
import relatedProductsQuery from 'product/related-products.graphql';
import combineQuery from 'graphql-combine-query';
// @group Mixins
// @vuese
// All functionality for the product page<br><br>
// **Data:**<br>
// quantity: `1`<br>
// replaceAlias: `null`<br>
export default {
  name: 'MixProductPage',
  mixins: [MixMetaReplacement, MixCache],
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
        const productQueryModifyed = this.$config.productShowRelated
          ? this.removeQueryVar(productQuery, ['channelId', 'languageId'])
          : productQuery;
        let finishQuery = {
          document: productQueryModifyed,
          variables: {
            alias: this.prodAlias
          }
        };
        if (this.$config.productShowRelated) {
          finishQuery = combineQuery('withRelatedCombined')
            .add(productQueryModifyed, {
              alias: this.prodAlias
            })
            .add(relatedProductsQuery, {
              prodAlias: this.prodAlias
            });
        }

        this.initVariables = finishQuery.variables;
        return finishQuery.document;
      },
      variables() {
        return this.initVariables;
      },
      result(result) {
        if (result && result.data) {
          if (!this.product && !process.server) {
            this.$nuxt.error({ statusCode: 404, message: 'Page not found' });
            this.$store.dispatch('redirect404');
          }

          if (!this.hasSkuVariants) {
            this.setDefaultSku();
          } else if (this.skuIsChosen && !this.chosenSkuVariant) {
            this.resetSku();
          }

          const { product, ...relatedProducts } = result.data;

          if (this.$config.productShowRelated) {
            this.relatedProducts = relatedProducts.relatedProducts;
            this.isInitialRequest = false;
          }
        }
        this.$store.dispatch('loading/end');
      },
      skip() {
        return !this.isInitialRequest;
      },
      error(error) {
        // pass the error response to the error component
        this.$nuxt.error({ statusCode: 500, message: error });
      }
    }
  },
  data: () => ({
    quantity: 1,
    replaceAlias: null,
    currentNotifyVariant: {},
    initVariables: {},
    isInitialRequest: true,
    relatedProducts: []
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
    // @vuese
    // Current breadcrumb object
    // @type Object
    breadcrumbsCurrent() {
      return {
        name: this.product?.primaryCategory.name,
        alias: this.product?.primaryCategory.alias,
        canonical: this.product?.primaryCategory.canonicalUrl,
        id: this.product?.primaryCategory.categoryId,
        type: 'category'
      };
    },
    // @vuese
    // Related product with relation RELATED
    // @type Array
    relatedProductsRelated() {
      return this.relatedProducts.filter(i => i.relation === 'RELATED');
    },
    // @vuese
    // Related product with relation ACCESSORIES
    // @type Array
    relatedProductsAccessories() {
      return this.relatedProducts.filter(i => i.relation === 'ACCESSORIES');
    },
    // @vuese
    // Related product with relation SIMILAR
    // @type Array
    relatedProductsSimilar() {
      return this.relatedProducts.filter(i => i.relation === 'SIMILAR');
    }
  },
  watch: {
    // @vuese
    // Watching currentStock.totalStock to change quantity if set higher than totalStock
    'currentStock.totalStock'(val) {
      if (val === 0) {
        return;
      }
      if (this.quantity > val) {
        this.quantity = val;
      }
    },
    // @vuese
    // Watching prodAlias to fetch request when alias state change
    prodAlias() {
      this.isInitialRequest = true;
    }
  },
  mounted() {
    this.switchToCanonical();
  },
  methods: {
    removeQueryVar(query, fields) {
      const newQuery = JSON.parse(JSON.stringify(query));

      fields.forEach(field => {
        const indexQueryVariable = newQuery.definitions[0].variableDefinitions.findIndex(
          item => item.variable.name.value === field
        );
        const indexQueryField = newQuery.definitions[0].selectionSet.selections[0].arguments.findIndex(
          item => item.value.name.value === field
        );

        if (![indexQueryVariable, indexQueryField].includes(-1)) {
          newQuery.definitions[0].variableDefinitions.splice(
            indexQueryVariable,
            1
          );
        }
      });

      return newQuery;
    },
    // @vuese
    // GTM event emitter
    emitGTMEvent() {
      if (this.$gtm) {
        this.$gtm.push({
          event: 'Product Detail Impression',
          eventInfo: {},
          ecommerce: {
            currencyCode: 'SEK',
            detail: {
              products: [
                {
                  id: this.product.productId,
                  name: this.product.name,
                  brand: this.product.brand?.name,
                  category: this.product.primaryCategory?.name,
                  price: this.product.unitPrice?.sellingPriceExVat,
                  tax: this.product.unitPrice.vat,
                  currency: 'SEK',
                  inStock: Boolean(this.product?.totalStock?.inStock),
                  urgencyLabelDisplayed: false
                }
              ]
            }
          },
          'gtm.uniqueEventId': 4
        });
      }
    },
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
        this.currentStock.totalStock
      ) {
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('CART_ADD_TOO_MANY', {
            stock: this.currentStock.totalStock
          }),
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
          this.appendProductToLatest();
          this.emitGTMEvent();
          clearInterval(check);
          if (this.product.canonicalUrl !== this.$route.path) {
            history.replaceState(null, null, this.product.canonicalUrl);
          }
        }
      }, 500);
    },
    appendProductToLatest() {
      const COOKIE_NAME = 'ralph-latest-products';
      const latestProducts = this.$cookies.get(COOKIE_NAME);
      if (!latestProducts) {
        this.$cookies.set(COOKIE_NAME, [this.prodAlias]);
        return;
      }

      if (latestProducts.length > 20) {
        latestProducts.pop();
      }

      if (!latestProducts.includes(this.prodAlias)) {
        this.$cookies.set(COOKIE_NAME, [this.prodAlias, ...latestProducts]);
      } else {
        const existingAliasIndex = latestProducts.findIndex(
          alias => alias === this.prodAlias
        );
        latestProducts.splice(existingAliasIndex, 1);
        this.$cookies.set(COOKIE_NAME, [this.prodAlias, ...latestProducts]);
      }
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
