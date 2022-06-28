<template>
  <div class="ca-widget-product-list">
    <div :id="nostoId" class="nosto_element"></div>
    <h2 v-if="isTitleVisible" class="ca-widget-product-list__title">
      {{ nostoTitle }}
    </h2>
    <CaProductList
      v-if="configuration.slideshowDisabled"
      class="ca-widget-product-list__list"
      :products="products"
      :page-size="take"
    />
    <CaProductListSlider
      v-else-if="!loading && products"
      class="ca-widget-product-list__list"
      :products="products"
      :page-size="take"
      :arrows="configuration.displayNavigationArrows"
      :dots="configuration.displayNavigationLinks"
      :arrow-icon-name="$config.productListWidgetArrowIconName"
    />
    <CaListPagination
      v-if="
        configuration.slideshowDisabled &&
          !configuration.limitNrOfRows &&
          products &&
          products.count > take
      "
      direction="next"
      :showing="showing"
      :total-count="products.count"
      :all-products-loaded="allProductsLoaded"
      :loading="loading"
      @loadmore="loadMore"
    />
  </div>
</template>
<script>
import MixListPagination from 'MixListPagination';

// @group Atoms
// @vuese
// Nosto placement block
// **SASS-path:** _./styles/components/atoms/ca-ca-nosto-section.scss_
export default {
  name: 'CaNostoSection',
  mixins: [MixListPagination],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    productsLoaded: false,
    loading: true
  }),
  computed: {
    isTitleVisible() {
      return this.nostoTitle && this.products?.length;
    },
    nostoId() {
      return this.configuration?.nostoId;
    },
    take() {
      return this.configuration.limitNrOfRows
        ? this.configuration.pageCount * this.$config.productListRowSize
        : this.$config.productListPageSize;
    },
    nostoData() {
      return this.$store.state.nosto.pageWidgetsData?.[this.nostoId];
    },
    nostoTitle() {
      return this.nostoData?.title;
    },
    products() {
      const nostoProducts = this.nostoData?.products;
      if (nostoProducts) {
        return this.formatNostoData(nostoProducts);
      }
      return [];
    }
  },
  watch: {
    products: {
      handler(val) {
        if (val.length) {
          this.loading = false;
          this.productsLoaded = true;
        }
      },
      immediate: true
    }
  },
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
@import 'atoms/ca-nosto-section';
</style>
