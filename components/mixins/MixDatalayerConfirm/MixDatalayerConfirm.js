import getCheckoutAndOrderQuery from 'checkout/get-checkout-and-order.graphql';

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
    },
    nostoProducts() {
      return this.orderCart?.items?.map(item => ({
        product_id: item.product.productId,
        name: item.product.name,
        unit_price: item.unitPrice.sellingPriceExVat,
        quantity: item.quantity,
        sku_id: item.skuId,
        price_currency_code: this.$store.getters['channel/currentCurrency']
      }));
    },
    // @vuese
    // The external order id
    // @type String
    orderId() {
      switch (this.type) {
        case 'KLARNA':
          return this.$route.query.kid;
        case 'SVEA':
          return this.$route.query.sid;
        case 'WALLEY':
          return this.$route.query.wid;
        case 'AVARDA':
          return this.$route.query.aid;
        default:
          return null;
      }
    },
    type() {
      if (this.$route.query.sid) {
        return 'SVEA';
      }

      if (this.$route.query.kid) {
        return 'KLARNA';
      }

      if (this.$route.query.wid) {
        return 'WALLEY';
      }

      if (this.$route.query.aid) {
        return 'AVARDA';
      }
      return 'KLARNA';
    }
  },
  watch: {},
  mounted() {},
  methods: {
    datalayerConfirm() {
      this.$apollo
        .query({
          query: getCheckoutAndOrderQuery,
          errorPolicy: 'all',
          fetchPolicy: 'no-cache',
          variables: {
            id: this.orderId,
            paymentType: this.type,
            checkoutMarket: this.$store.state.channel.checkoutMarket
          }
        })
        .then(result => {
          if (!result.errors) {
            const {
              orderId,
              firstName,
              lastName,
              email,
              currency
            } = result.data?.getCheckoutAndOrder.order;

            this.$store.dispatch('events/push', {
              type: 'checkout:purchase',
              data: { order: result.data?.getCheckoutAndOrder.order }
            });

            if (this.$store.getters['nosto/isNostoActive'] && process.client) {
              window.nostojs(api => {
                api
                  .defaultSession()
                  .addOrder({
                    external_order_ref: this.orderId,
                    info: {
                      order_number: orderId,
                      email,
                      first_name: firstName,
                      last_name: lastName,
                      type: 'order',
                      newsletter: true
                    },
                    items: this.orderCart?.items?.map(item => ({
                      product_id: item.product.productId,
                      sku_id: item.skuId,
                      name: item.product.name,
                      quantity: item.quantity,
                      price_currency_code: currency,
                      unit_price: item.unitPrice.sellingPriceIncVat
                    }))
                  })
                  .setPlacements(['order-related'])
                  .load()
                  .then(data => {
                    // eslint-disable-next-line
                    console.log(data.recommendations);
                  });
              });
            }

            if (this.$gtm) {
              const items = this.productsData;
              const key = this.$store.getters.getGtmProductsKey;

              this.$gtm.push({
                event: 'purchase',
                ecommerce: {
                  currencyCode: currency,
                  purchase: {
                    actionField: {
                      id: orderId,
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
                    [`${key}`]: items
                  }
                }
              });
            }
          }
        })
        .catch(error => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    }
  }
};
