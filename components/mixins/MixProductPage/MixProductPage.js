import MixMetaReplacement from 'MixMetaReplacement';
import MixAddToCart from 'MixAddToCart';
import MixVariantHandler from 'MixVariantHandler';
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
  mixins: [MixMetaReplacement, MixAddToCart, MixVariantHandler],
  async asyncData({ app, store, error, params, route }) {
    try {
      const currentPath = decodeURI(store.state.currentPath);
      const prodAlias = decodeURI(params.alias?.split('/').pop()) || '';
      let asyncProduct = null;

      const variables = { alias: prodAlias };
      const callback = (result) => {
        asyncProduct = result?.data?.product;
        if (!asyncProduct) {
          app.$error404(currentPath);
          return;
        }
        if (asyncProduct.canonicalUrl !== currentPath) {
          app.$redirectToCanonical(asyncProduct.canonicalUrl, route?.query);
        }
      };

      await app.$fetchData(productQuery, callback, variables);

      return { asyncProduct };
    } catch (err) {
      error({ statusCode: err.statusCode, message: err });
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
            this.imgSrc() ||
            this.$config.public.baseUrl + '/meta-image-fallback.jpg',
        },
        ...this.preloadedImages,
      ],
    };
  },
  async fetch() {
    if (this.asyncProduct && !this.replaceAlias) {
      this.product = this.asyncProduct;
    } else {
      const callback = (result) => {
        const product = result?.data?.product;
        const currentPath = this.$route.path;
        if (!product) {
          this.$error404(currentPath);
          return;
        }
        if (currentPath !== product.canonicalUrl) {
          history.replaceState(null, null, product.canonicalUrl);
        }
        return product;
      };

      this.product = await this.fetchData(productQuery, callback);
    }

    if (this.replaceAlias) {
      this.initProduct();
    }

    if (this.product && this.$config.public.productShowRelated) {
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
    // Preloaded images for meta, improving LCP
    // @type Array
    preloadedImages() {
      if (!this.$config.public.preLoadedProductImageSizes) {
        return [];
      }
      const preloadedImages = [];
      const base = {
        rel: 'preload',
        as: 'image',
      };
      this.$config.public.preLoadedProductImageSizes.forEach((size) => {
        const obj = { ...base };
        const src = this.imgSrc(size);
        if (src) {
          obj.href = src;
          preloadedImages.push(obj);
        }
      });
      return preloadedImages;
    },
    preloadedImage() {
      const imgSrc = this.preloadedImages[0]?.href;
      return imgSrc || this.imgSrc();
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
  mounted() {
    this.initProduct();
  },
  methods: {
    // @vuese
    // Image src used for meta image
    // @arg size (String)
    imgSrc(size = this.$config.public.productSchemaOptions.schemaImageSize) {
      let imgSrc = false;
      if (this.product?.productImages?.length) {
        imgSrc =
          this.$config.public.imageServer +
          '/product/' +
          size +
          '/' +
          this.product.productImages[0].fileName;
      }
      return imgSrc;
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
      if (!this.product) {
        return;
      }
      if (!this.hasSkuVariants) {
        this.setDefaultSku();
      } else if (this.skuIsChosen && !this.chosenSkuVariant) {
        this.resetSku();
      }
      if (
        this.$config.public.ralphLog.all ||
        this.$config.public.ralphLog.warnings
      ) {
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
