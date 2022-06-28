<template>
  <div>
    <div v-if="nostoId" :id="nostoId" class="nosto_element"></div>
    <ul class="ca-quick-add-products">
      <li
        v-for="(product, index) in productsData"
        :key="index"
        class="ca-quick-add-products__item"
      >
        <CaQuickAddProduct :product="product" />
      </li>
    </ul>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// A list of quick add products<br><br>
// **SASS-path:** _./styles/components/molecules/ca-quick-add-products.scss_
export default {
  name: 'CaQuickAddProducts',
  mixins: [],
  props: {
    // A list of products
    products: {
      type: Array,
      default: () => []
    },
    nostoId: {
      type: [String, null],
      default: null
    }
  },
  data: () => ({}),
  computed: {
    productsData() {
      return this.nostoId ? this.nostoProducts : this.products;
    },
    nostoProducts() {
      const nostoProducts = this.nostoData?.products;
      if (nostoProducts) {
        return this.formatNostoData(nostoProducts);
      }
      return [];
    },
    nostoData() {
      return this.$store.state.nosto.pageWidgetsData?.[this.nostoId];
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getCanonicalUrl(url) {
      return `/${url
        ?.split('/')
        ?.slice(3)
        ?.join('/')}`;
    },
    getAliasUrl(url) {
      return url
        ?.split('/')
        ?.slice(-1)
        ?.join('');
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

      const formattedProduct = mappedAttributesProducts.map(product => ({
        ...product,
        images: product.images.split(','),
        skus: [
          {
            skuId: product?.primarySku?.id,
            productId: product.productId
          }
        ],
        totalStock: {
          ...product.totalStock,
          totalStock: product.totalStock.sellable
        },
        canonicalUrl: this.getCanonicalUrl(product.canonicalUrl || product.url),
        alias: this.getAliasUrl(product.canonicalUrl || product.url),
        discountCampaigns: product.discountCampaigns
          ? [product.discountCampaigns.split(',')]
          : []
      }));

      return formattedProduct;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-quick-add-products';
</style>
