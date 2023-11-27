// @group Mixins
// @vuese
export default {
  name: 'MixDatalayerConfirm',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    productsData() {
      return this.orderCart?.items.map((item) => {
        return {
          item_id: item.product.productId,
          item_name: item.product.name,
          item_brand: item.product.brand.name,
          item_category: item.product.primaryCategory?.name,
          price: item.unitPrice.sellingPriceExVat,
          tax: item.unitPrice.vat,
          quantity: item.quantity,
          item_variant: item.product.skus.find((i) => i.skuId === item.skuId)
            .name,
          sku: item.skuId,
          // velocity: "EncryptMargin(item.UnitPriceExVat, item.PurchasePrice).ToString('0.0000', CultureInfo.InvariantCulture)" //Backendmagi
        };
      });
    },
  },
  watch: {},
  mounted() {},
  methods: {
    sendDataLayerEvents(checkoutData) {
      const order = checkoutData?.order || {
        orderId: this.orderId,
        currency: this.$store.getters['channel/currentCurrency'],
        itemValueIncVat: this.orderCart.summary.subTotal.sellingPriceIncVat,
        itemValueExVat: this.orderCart.summary.subTotal.sellingPriceExVat,
        email: this.$route.query.email,
      };
      this.$store.dispatch('events/push', {
        type: 'checkout:purchase',
        data: {
          order,
          orderCart: this.orderCart,
          orderId: this.orderId,
          nthPurchase: checkoutData?.nthPurchase || 1,
        },
      });
    },
  },
};
