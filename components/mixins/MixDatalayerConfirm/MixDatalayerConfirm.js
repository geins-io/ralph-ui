// @group Mixins
// @vuese
export default {
  name: 'MixDatalayerConfirm',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    productsData() {
      return this.orderCart?.items.map(item => {
        return {
          item_id: item.product.productId,
          item_name: item.product.name,
          item_brand: item.product.brand.name,
          item_category: item.product.primaryCategory.name,
          price: item.unitPrice.sellingPriceExVat,
          tax: item.unitPrice.vat,
          quantity: item.quantity,
          item_variant: item.product.skus.find(i => i.skuId === item.skuId)
            .name,
          sku: item.skuId
          // velocity: "EncryptMargin(item.UnitPriceExVat, item.PurchasePrice).ToString('0.0000', CultureInfo.InvariantCulture)" //Backendmagi
        };
      });
    }
  },
  watch: {},
  mounted() {},
  methods: {
    datalayerConfirm() {
      if (this.$gtm) {
        this.$gtm.push({
          event: 'purchase',
          ecommerce: {
            currencyCode: 'SEK',
            purchase: {
              actionField: {
                id: this.$route.query.oid || this.$route.query.cartid,
                revenue: this.orderCart.summary.total.sellingPriceIncVat,
                tax: this.orderCart.summary.total.vat,
                shipping: this.orderCart.summary.shipping.feeExVat,
                shippingTax:
                  this.orderCart.summary.shipping.feeIncVat -
                  this.orderCart.summary.shipping.feeExVat,
                // sumPayedFromBalance: 'FormatPrice(itemsSummary.Balance)',
                discount:
                  this.orderCart.summary.total.discountExVat +
                  this.orderCart.summary.fixedAmountDiscountExVat,
                discountTax:
                  this.orderCart.summary.total.discountIncVat +
                  this.orderCart.summary.fixedAmountDiscountIncVat -
                  (this.orderCart.summary.total.discountExVat +
                    this.orderCart.summary.fixedAmountDiscountExVat),
                timestamp: Math.floor(Date.now() / 1000),
                coupon: this.orderCart.promoCode
              },
              products: this.productsData
            }
          }
        });
      }
    }
  }
};
