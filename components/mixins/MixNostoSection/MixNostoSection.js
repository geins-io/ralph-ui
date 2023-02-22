// @group Mixins
// @vuese
// Mixin for Nosto section
export default {
  name: 'MixNostoSection',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    nostoData() {
      return this.$store.state.nosto.pageWidgetsData?.[this.nostoId];
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getCanonicalUrl(url, productId) {
      return `/${url
        ?.split('/')
        ?.slice(3)
        ?.join('/')}?refSrc=${productId}&nosto=${this.nostoData.div_id}`;
    },
    getAliasUrl(url, productId) {
      return `${url
        ?.split('/')
        ?.slice(-1)
        ?.join('')}?refSrc=${productId}&nosto=${this.nostoData.div_id}`;
    },
    formatNostoData(products) {
      const createObjectNode = (indexKey, keys, acc, value) => {
        acc[keys[indexKey]] = acc[keys[indexKey]]
          ? { ...acc[keys[indexKey]] }
          : {};

        if (indexKey === keys.length - 1) {
          acc[keys[indexKey]] = value;
          return;
        }

        createObjectNode(indexKey + 1, keys, acc[keys[indexKey]], value);
      };

      const mappedAttributesProducts = products.map(product => ({
        ...product,
        ...Object.entries(product.custom_fields).reduce((acc, [key, value]) => {
          const keys = key.split('_');
          if (keys.length > 1) {
            createObjectNode(0, keys, acc, value);
            return acc;
          }
          return { ...acc, [keys[0]]: value };
        }, {})
      }));

      const countPercentageDiscount = (partialValue, totalValue) =>
        // ~~ shorthand for Math.round
        100 - ~~((partialValue / totalValue) * 100);

      const formattedProduct = mappedAttributesProducts.map(product => ({
        ...product,
        unitPrice: {
          ...product.unitPrice,
          discountPercentage: countPercentageDiscount(
            product.price,
            product.list_price
          )
        },
        images: product.images.split(','),
        skus: [
          {
            skuId: Number(product?.primarySku?.id),
            productId: product.product_id
          }
        ],
        totalStock: {
          ...product.totalStock,
          totalStock: product.totalStock.sellable
        },
        canonicalUrl: this.getCanonicalUrl(
          product.canonicalUrl || product.url,
          product.product_id
        ),
        alias: this.getAliasUrl(
          product.canonicalUrl || product.url,
          product.product_id
        ),
        discountCampaigns: product.discountCampaigns
          ? [product.discountCampaigns.split(',')]
          : []
      }));

      return formattedProduct;
    }
  }
};
