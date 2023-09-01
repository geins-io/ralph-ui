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
          item_category: item.product.primaryCategory?.name,
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
    }
  },
  watch: {},
  mounted() {},
  methods: {
    sendDataLayerEvents(checkoutData, isDefault) {
      let data = checkoutData;
      if (isDefault) {
        data = {
          order: {
            orderId: this.orderId,
            currency: this.$store.getters['channel/currentCurrency'],
            itemValueIncVat: this.orderCart.summary.subTotal.sellingPriceIncVat,
            itemValueExVat: this.orderCart.summary.subTotal.sellingPriceExVat,
            email: this.$route.query.email
          },
          nthPurchase: 1
        };
      }
      this.$store.dispatch('events/push', {
        type: 'checkout:purchase',
        data: {
          order: data?.order,
          orderCart: this.orderCart,
          orderId: this.orderId,
          nthPurchase: data?.nthPurchase
        }
      });

      if (
        this.$store.getters['nosto/isNostoActive'] &&
        process.client &&
        data?.order
      ) {
        const { orderId, firstName, lastName, email, currency } = data?.order;

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
    }
  }
};
