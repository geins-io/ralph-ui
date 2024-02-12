import MixMetaReplacement from 'MixMetaReplacement';
import MixApolloRefetch from 'MixApolloRefetch';
import productQuery from 'product/product.graphql';
import relatedProductsQuery from 'product/related-products.graphql';
// @group Mixins
// @vuese
// All functionality for the product page<br><br>
// **Data:**<br>
// quantity: `1`<br>
// replaceAlias: `null`<br>
export default {
  name: 'MixProductPage',
  mixins: [MixMetaReplacement, MixApolloRefetch],
  async asyncData({ error, store, app, redirect, req, params }) {
    const currentPath = decodeURI(store.state.currentPath);
    const prodAlias = decodeURI(params.alias?.split('/').pop()) || '';

    const variables = {
      alias: prodAlias,
    };

    try {
      const client = app.apolloProvider.defaultClient;
      let product = null;

      await client
        .query({
          query: productQuery,
          variables,
          fetchPolicy: 'no-cache',
        })
        .then((result) => {
          product = result?.data?.product;
          if (!product) {
            error({
              statusCode: 404,
              message: 'Page not found',
              url: currentPath,
            });
            return;
          }
          if (req && product.canonicalUrl !== currentPath) {
            redirect({
              path: product.canonicalUrl,
              query: req.query,
            });
          }
        })
        .catch((err) => {
          error({
            statusCode: err.statusCode,
            message: err.message,
          });
        });

      return { product };
    } catch (err) {
      error(err);
    }
  },
  props: {},
  head() {
    return {
      title: this.metaReplacement(this.product?.meta.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaReplacement(this.product?.meta.description),
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.metaReplacement(this.product?.meta.title),
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.metaReplacement(this.product?.meta.description),
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            this.imgSrc || this.$config.baseUrl + '/meta-image-fallback.jpg',
        },
      ],
    };
  },
  apollo: {
    product: {
      query: productQuery,
      variables() {
        return {
          alias: this.prodAlias,
        };
      },
      errorPolicy: 'all',
      result() {
        this.initProduct();
      },
      skip() {
        return process.server || !this.prodAliasHasChanged;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      },
    },
    relatedProducts: {
      query: relatedProductsQuery,
      variables() {
        return {
          alias: this.prodAlias,
        };
      },
      errorPolicy: 'all',
      result(result) {
        this.relatedProducts = result?.data?.relatedProducts;
      },
      skip() {
        return !this.$config.productShowRelated;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      },
    },
  },
  data: () => ({
    quantity: 1,
    replaceAlias: null,
    currentNotifyVariant: {},
    initVariables: {},
    relatedProducts: [],
    impressionEventSent: false,
    prodAliasHasChanged: false,
  }),
  computed: {
    // @vuese
    // Quick ref to product images
    // @type Array
    productImages() {
      return this.product?.productImages && this.product.productImages.length
        ? this.product.productImages
        : [];
    },
    // @vuese
    // Alias used to fetch product data, using replaceAlias if it has a value
    // @type String
    prodAlias() {
      const routeParam = this.$route.params?.alias?.split('/').pop();
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
        categoryObj.value = this.product?.primaryCategory?.alias;
        filtersArray.push(categoryObj);

        const brandObj = {};
        brandObj.key = 'Brand';
        brandObj.value = this.product?.brand?.alias;
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
        name: this.product?.primaryCategory?.name,
        alias: this.product?.primaryCategory?.alias,
        canonical: this.product?.primaryCategory?.canonicalUrl,
        id: this.product?.primaryCategory?.categoryId,
        type: 'category',
      };
    },
    // @vuese
    // Related product with relation RELATED
    // @type Array
    relatedProductsRelated() {
      return this.relatedProducts.filter((i) => i.relation === 'RELATED');
    },
    // @vuese
    // Related product with relation ACCESSORIES
    // @type Array
    relatedProductsAccessories() {
      return this.relatedProducts.filter((i) => i.relation === 'ACCESSORIES');
    },
    // @vuese
    // Related product with relation SIMILAR
    // @type Array
    relatedProductsSimilar() {
      return this.relatedProducts.filter((i) => i.relation === 'SIMILAR');
    },
    // @vuese
    // Image src used for meta image
    // @type [String, Boolean]
    imgSrc() {
      let imgSrc = false;
      if (this.product?.productImages?.length) {
        imgSrc =
          this.$config.imageServer +
          '/product/' +
          this.$config.productSchemaOptions.schemaImageSize +
          '/' +
          this.product.productImages[0].fileName;
      }
      return imgSrc;
    },
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
      this.prodAliasHasChanged = true;
    },
    // @vuese
    // Watching productId to send impression event when changing variant
    'product.productId'(newVal, oldVal) {
      if (oldVal && newVal !== oldVal) {
        this.sendImpressionEvent();
      }
    },
  },
  mounted() {
    this.initProduct();
  },
  methods: {
    removeQueryVar(query, fields) {
      const newQuery = JSON.parse(JSON.stringify(query));

      fields.forEach((field) => {
        const indexQueryVariable =
          newQuery.definitions[0].variableDefinitions.findIndex(
            (item) => item.variable.name.value === field,
          );
        const indexQueryField =
          newQuery.definitions[0].selectionSet.selections[0].arguments.findIndex(
            (item) => item.value.name.value === field,
          );

        if (![indexQueryVariable, indexQueryField].includes(-1)) {
          newQuery.definitions[0].variableDefinitions.splice(
            indexQueryVariable,
            1,
          );
        }
      });

      return newQuery;
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
          placement: 'bottom-center',
        });
      } else if (
        this.quantity + this.chosenSkuCartQuantity >
        this.currentStock.totalStock
      ) {
        this.$store.dispatch('snackbar/trigger', {
          message: this.$t('CART_ADD_TOO_MANY', {
            stock: this.currentStock.totalStock,
          }),
          placement: 'bottom-center',
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
      if (alias !== this.prodAlias) {
        this.replaceAlias = alias;
        history.replaceState(null, null, alias);
      } else {
        this.$store.dispatch('loading/end');
      }
    },
    // @vuese
    // Handler for changing the sku
    // @arg data (Object)
    skuChangeHandler(data) {
      this.setSku(data.id, data.value);
    },
    // @vuese
    // Handler for reaching quantity threshold
    quantityThresholdHandler() {
      this.$store.dispatch('snackbar/trigger', {
        message: this.$t('QUANTITY_THRESHOLD_REACHED', {
          quantity: this.chosenSkuCartQuantity,
        }),
        placement: 'bottom-center',
      });
    },
    // @vuese
    // Switching to canonical url if different from route path
    switchToCanonical() {
      if (this.product.canonicalUrl !== this.$route.path) {
        history.replaceState(null, null, this.product.canonicalUrl);
      }
    },
    appendProductToLatest() {
      const COOKIE_NAME = 'ralph-latest-products';
      const latestProducts = this.$cookies.get(COOKIE_NAME);
      if (!latestProducts) {
        this.$cookies.set(COOKIE_NAME, [this.prodAlias], { path: '/' });
        return;
      }

      if (latestProducts.length > 20) {
        latestProducts.pop();
      }

      if (!latestProducts.includes(this.prodAlias)) {
        this.$cookies.set(COOKIE_NAME, [this.prodAlias, ...latestProducts], {
          path: '/',
        });
      } else {
        const existingAliasIndex = latestProducts.findIndex(
          (alias) => alias === this.prodAlias,
        );
        latestProducts.splice(existingAliasIndex, 1);
        this.$cookies.set(COOKIE_NAME, [this.prodAlias, ...latestProducts], {
          path: '/',
        });
      }
    },
    // @vuese
    // Handler for clicking the notify button
    // @arg variant (Object)
    notifyHandler(variant) {
      this.currentNotifyVariant = variant;
      this.$nextTick(() => {
        this.$store.commit('contentpanel/open', {
          name: 'notify',
        });
      });
    },
    // @vuese
    // Sending the product detail impression event
    sendImpressionEvent() {
      this.$store.dispatch('events/push', {
        type: 'product-detail:impression',
        data: { product: this.product },
      });
      this.impressionEventSent = true;
    },
    // @vuese
    // Initiate product
    initProduct() {
      if (!this.hasSkuVariants) {
        this.setDefaultSku();
      } else if (this.skuIsChosen && !this.chosenSkuVariant) {
        this.resetSku();
      }
      if (this.product?.variantGroup === null) {
        this.$ralphLog('WARNING:', 'Product has no variantGroup');
      }

      if (!this.product?.primaryCategory) {
        this.$ralphLog('WARNING:', 'Product has no primaryCategory');
      }

      this.appendProductToLatest();

      if (!this.impressionEventSent) {
        this.sendImpressionEvent();
      }

      this.$store.dispatch('loading/end');
    },
  },
};
