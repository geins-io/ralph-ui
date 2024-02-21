import MixMetaReplacement from 'MixMetaReplacement';
import MixFetch from 'MixFetch';
import productQuery from 'product/product.graphql';
import relatedProductsQuery from 'product/related-products.graphql';
// @group Mixins
// @vuese
// All functionality for the product page<br><br>
// **Data:**<br>
// product: `null`<br>
// quantity: `1`<br>
// replaceAlias: `null`<br>
// currentNotifyVariant: `{}`<br>
// relatedProducts: `[]`<br>
export default {
  name: 'MixProductPage',
  mixins: [MixMetaReplacement, MixFetch],
  async asyncData({ error, store, app, redirect, req, params }) {
    const currentPath = decodeURI(store.state.currentPath);
    const prodAlias = decodeURI(params.alias?.split('/').pop()) || '';

    const variables = {
      alias: prodAlias,
    };

    try {
      const client = app.apolloProvider.defaultClient;
      let asyncProduct = null;

      await client
        .query({
          query: productQuery,
          variables,
        })
        .then((result) => {
          asyncProduct = result?.data?.product;
          if (!asyncProduct) {
            error({
              statusCode: 404,
              message: 'Page not found',
              url: currentPath,
            });
            return;
          }
          if (asyncProduct.canonicalUrl !== currentPath) {
            redirect({
              path: asyncProduct.canonicalUrl,
              query: req?.query,
            });
          }
        })
        .catch((err) => {
          error({
            statusCode: err.statusCode,
            message: err.message,
          });
        });

      return { asyncProduct };
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
  async fetch() {
    if (this.asyncProduct && !this.replaceAlias) {
      this.product = this.asyncProduct;
    } else {
      this.product = await this.fetchData(productQuery, (result) => {
        const product = result?.data?.product;
        const currentPath = this.$route.path;
        if (!product) {
          this.$nuxt.context.error({
            statusCode: 404,
            message: 'Page not found',
            url: currentPath,
          });
          return;
        }
        if (currentPath !== product.canonicalUrl) {
          history.replaceState(null, null, product.canonicalUrl);
        }
        return product;
      });
    }

    if (this.product && !process.server) {
      this.initProduct();
    }

    if (this.product && this.$config.productShowRelated) {
      this.relatedProducts = await this.fetchData(
        relatedProductsQuery,
        (result) => {
          return result?.data?.relatedProducts || [];
        },
      );
    }
  },
  data: () => ({
    product: null,
    quantity: 1,
    replaceAlias: null,
    currentNotifyVariant: {},
    relatedProducts: [],
  }),
  computed: {
    // @vuese
    // Variables to be watched by MixFetch
    // @type Object
    variables() {
      return {
        alias: this.prodAlias,
      };
    },
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
  },
  mounted() {},
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
        this.$fetch();
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
    // @vuese
    // Append product id to latest products cookie
    appendProductToLatest() {
      const COOKIE_NAME = 'ralph-latest-products';
      let latestProducts = this.$cookies.get(COOKIE_NAME);

      // Now going from aliases to productId's, remove all old cookies to not cause trouble
      if (latestProducts && typeof latestProducts[0] === 'string') {
        this.$cookies.remove(COOKIE_NAME);
        latestProducts = null;
      }

      if (!latestProducts) {
        this.$cookies.set(COOKIE_NAME, [this.product.productId], { path: '/' });
        return;
      }

      if (latestProducts.length > 20) {
        latestProducts.pop();
      }

      if (!latestProducts.includes(this.product.productId)) {
        this.$cookies.set(
          COOKIE_NAME,
          [this.product.productId, ...latestProducts],
          {
            path: '/',
          },
        );
      } else {
        const existingIdIndex = latestProducts.findIndex(
          (id) => id === this.product.productId,
        );
        latestProducts.splice(existingIdIndex, 1);
        this.$cookies.set(
          COOKIE_NAME,
          [this.product.productId, ...latestProducts],
          {
            path: '/',
          },
        );
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
    // Initiate product
    initProduct() {
      if (!this.hasSkuVariants) {
        this.setDefaultSku();
      } else if (this.skuIsChosen && !this.chosenSkuVariant) {
        this.resetSku();
      }
      if (this.$config.ralphLog.all || this.$config.ralphLog.warnings) {
        if (this.product?.variantGroup === null) {
          this.$ralphLog('WARNING:', 'Product has no variantGroup');
        }

        if (!this.product?.primaryCategory) {
          this.$ralphLog('WARNING:', 'Product has no primaryCategory');
        }
      }

      this.appendProductToLatest();

      this.$store.dispatch('events/push', {
        type: 'product-detail:impression',
        data: { product: this.product },
      });

      this.$store.dispatch('loading/end');
    },
  },
};
