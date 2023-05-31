<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="ca-product-meta">
    <script type="application/ld+json" v-html="productSchema"></script>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Adds a product meta script tag to the page
export default {
  name: 'CaProductMeta',
  mixins: [],
  props: {
    // Product object
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    productSchema() {
      const jsonld = [];
      const options = this.$config.productSchemaOptions;
      let productSchema = {};
      let color = [];

      if (this.product.skus?.length > 0) {
        for (let i = 0; this.product.skus.length > i; i++) {
          let gtin = this.product.skus[i].gtin;
          const isGtin12 = gtin?.length === 12;
          gtin = isGtin12 && options.useGtin13 ? `0${gtin}` : gtin;

          productSchema = {
            '@context': 'http://schema.org',
            '@type': 'Product',
            sku: this.product.skus[i].skuId,
            gtin,
            inProductGroupWithID: this.product.skus[i].productId,
            name: this.product.name,
            description: this.product.texts[options.productDescriptionField],
            brand: {
              '@type': 'Brand',
              name: this.product.brand.name
            },
            offers: {
              '@type': 'Offer',
              url: this.product.canonicalUrl,
              priceCurrency: this.$store.getters['channel/currentCurrency'],
              price: this.product.unitPrice.sellingPriceIncVat,
              availability: this.getStockStatus(
                this.product.skus[i].stock.inStock,
                this.product.skus[i].stock.totalStock
              ),
              ...options.extraOfferProperties
            }
          };
          color = this.product.variantDimensions.filter(
            d => d.dimension === 'Color'
          );
          productSchema.color = color[0]?.label;
          if (options.productSkuLabelIsSize) {
            productSchema.size = this.product.skus[i].name;
          }
          if (this.imgSrc) {
            productSchema.image = this.imgSrc;
          }
          jsonld.push(productSchema);
        }
      }
      return jsonld;
    },
    imgSrc() {
      let imgSrc = false;
      if (this.product.images?.length) {
        imgSrc =
          this.$config.imageServer +
          '/product/' +
          this.$config.productSchemaOptions.schemaImageSize +
          '/' +
          this.product.images[0];
      }
      return imgSrc;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getStockStatus(stock, totalStock) {
      if (totalStock === 0) {
        return 'OutOfStock';
      } else if (stock === 0) {
        return 'BackOrder';
      } else {
        return 'InStock';
      }
    }
  }
};
</script>
