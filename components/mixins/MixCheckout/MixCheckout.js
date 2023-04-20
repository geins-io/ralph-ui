import { mapState, mapGetters } from 'vuex';
import createOrUpdateCheckoutMutation from 'checkout/create-or-update.graphql';
import placeOrderMutation from 'checkout/place-order.graphql';
import MixPromiseQueue from 'MixPromiseQueue';
import MixApolloRefetch from 'MixApolloRefetch';
// @group Mixins
// @vuese
// All functionality for the checkout
// **Data:**<br>
// debug: `false`<br>
// cartLoading: `false`<br>
// checkoutLoading: `false`<br>
// checkout: `{}`<br>
// desiredDeliveryDate: `null`<br>
// message: `''`
// pickupPoint: `''`,
// externalShippingId: `''`,
// udcValid: `false`
// udcDataSet: `false`
// paymentId: `vm.$config.defaultPaymentId`
// updateDelay: 150`
// updateTimeout: `null`
// activeElement: `null`
// frameLoading: `false`
// forceExternalCheckoutReset: `false`
export default {
  name: 'MixCheckout',
  mixins: [MixPromiseQueue, MixApolloRefetch],
  props: {},
  data: vm => ({
    debug: false,
    cartLoading: true,
    checkoutLoading: false,
    shippingLoading: false,
    checkout: {},
    desiredDeliveryDate: null,
    message: '',
    pickupPoint: '',
    externalShippingId: '',
    udcValid: false,
    udcDataSet: false,
    paymentId: vm.$config.checkout.defaultPaymentId,
    shippingId: vm.$config.checkout.defaultShippingId,
    updateDelay: 150,
    updateTimeout: null,
    activeElement: null,
    frameLoading: false,
    forceExternalCheckoutReset: false
  }),
  computed: {
    // @vuese
    // A list of accepted consents
    // @type Array
    acceptedConsents() {
      return this.checkout.consents?.filter(i => i.checked).map(i => i.type);
    },
    // @vuese
    // The checkout input object prepared for the API
    // @type Object
    checkoutInput() {
      const obj = {};

      if (this.$config.customerTypesToggle) {
        obj.customerType = this.$store.state.customerType;
      }
      if (this.paymentId) {
        obj.paymentId = this.paymentId;
      }
      if (this.shippingId) {
        obj.shippingId = this.shippingId;
      }
      if (this.checkout.billingAddress) {
        obj.billingAddress = this.checkout.billingAddress;
        delete obj.billingAddress.__typename;
      }
      if (this.checkout.email) {
        obj.email = this.checkout.email;
      }
      if (this.checkout.identityNumber) {
        obj.identityNumber = this.checkout.identityNumber;
      }
      if (this.orderMessage) {
        obj.message = this.orderMessage;
      }
      if (this.acceptedConsents?.length) {
        obj.acceptedConsents = this.acceptedConsents;
      }
      if (
        this.checkout.shippingAddress &&
        this.checkout.shippingAddress.addressLine1 !== ''
      ) {
        obj.shippingAddress = this.checkout.shippingAddress;
        delete obj.shippingAddress.__typename;
      }
      if (this.desiredDeliveryDate) {
        obj.desiredDeliveryDate = this.desiredDeliveryDate;
      }
      if (this.pickupPoint) {
        obj.pickupPoint = this.pickupPoint;
      }
      if (this.externalShippingId) {
        obj.externalShippingId = this.externalShippingId;
      }
      return obj;
    },
    // @vuese
    // This is the message that gets sent to the api. Override this if more than just the user inputted message should go in there
    // @type String
    orderMessage() {
      return this.message;
    },
    // @vuese
    // The current billing zip
    // @type String
    currentZip() {
      return this.checkout?.billingAddress?.zip || '';
    },
    // @vuese
    // Is there more than one payment option?
    // @type Boolean
    hasPaymentOptions() {
      return this.checkout?.paymentOptions?.length > 1;
    },
    // @vuese
    // The selected payment option
    // @type Object
    selectedPaymentOption() {
      return this.checkout?.paymentOptions?.find(i => i.isSelected);
    },
    // @vuese
    // The current payment type
    // @type String
    paymentType() {
      return this.selectedPaymentOption?.paymentType;
    },
    // @vuese
    // All selectable markets
    // @type Array
    selectableMarkets() {
      return this.markets
        .filter(market => !market.virtual)
        .map(market => {
          return {
            label: market.country.name,
            value: market.alias
          };
        });
    },
    ...mapState({
      markets: state => state.channel.markets,
      currentMarket: state => state.channel.currentMarket,
      checkoutMarket: state => state.channel.checkoutMarket,
      customerType: state => state.customerType,
      cart: state => state.cart
    }),
    ...mapGetters({
      checkoutMarketObj: 'channel/checkoutMarketObj'
    })
  },
  watch: {
    async 'cart.data'(newVal, oldVal) {
      if (
        newVal &&
        oldVal &&
        (await this.$store.dispatch('cart/itemsChanged', {
          new: newVal,
          old: oldVal
        }))
      ) {
        this.shippingLoading = true;
        this.createOrUpdateCheckout('cart changed');
      }
    },
    'checkout.paymentOptions'(newVal) {
      if (newVal && newVal.length) {
        let availableOptionSelected = false;
        newVal.forEach(i => {
          if (i.id === this.paymentId) {
            availableOptionSelected = true;
          }
        });
        if (!availableOptionSelected) {
          const id = newVal[0].id;
          this.paymentId = id;
          this.createOrUpdateCheckout('payment options changed');
        }
      }
    },
    customerType(newVal, oldVal) {
      if (newVal !== oldVal && this.$config.customerTypesToggle) {
        this.shippingLoading = true;
        this.cartLoading = true;
        this.checkoutLoading = true;
        this.frameLoading = true;
        this.forceExternalCheckoutReset = true;
        this.createOrUpdateCheckout('customer type changed');
      }
    },
    checkoutMarketObj: {
      deep: true,
      handler(newVal, oldVal) {
        // When market changes and currency stays the same, we need to update the checkout from here.
        // When market is changed and currency changes, cart will update and that will trigger an update of the checkout,
        // so we don't need to do it here
        if (newVal?.currency?.code === oldVal?.currency?.code) {
          this.createOrUpdateCheckout('market changed');
        }
      }
    }
  },
  mounted() {
    if (!this.$store.state.checkout.currentZip) {
      this.createOrUpdateCheckout('mounted');
    }
    this.emitEvent();
  },
  methods: {
    // @vuese
    // GTM event emitter
    emitEvent() {
      this.$store.dispatch('events/pushEvent', {
        type: 'checkout:impression'
      });

      if (this.$gtm && this.cart?.data?.items) {
        const items = this.cart.data.items.map(item => ({
          id: item.product.productId,
          name: item.product.name,
          brand: item.product.brand?.name,
          category: item.product.primaryCategory?.name,
          price: item.unitPrice?.sellingPriceExVat,
          currency: this.$store.getters['channel/currentCurrency'],
          tax: item.unitPrice.vat,
          quantity: item.quantity,
          variant: item.product.skus.find(i => i.skuId === item.skuId).name,
          sku: item.skuId
        }));
        const key = this.$store.getters.getGtmProductsKey;

        this.$gtm.push({
          event: 'Checkout Step',
          eventInfo: {},
          ecommerce: {
            currencyCode: this.$store.getters['channel/currentCurrency'],
            checkout: {
              actionField: {
                step: 1
              }
            },
            [`${key}`]: items
          },
          'gtm.uniqueEventId': 6
        });
      }
    },
    // @vuese
    // Handling the api call for creating an updating the checkout session
    createOrUpdateCheckout(reason = 'other') {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(() => {
        if (!this.$store.getters['cart/id']) {
          this.cartLoading = false;
          return;
        }
        if (this.debug) {
          // eslint-disable-next-line no-console
          console.log('createOrUpdateCheckout: ', reason.toUpperCase());
        }
        this.updateDelay = 150;
        this.checkoutLoading = true;
        if (this.$refs.udc) {
          this.$refs.udc.disable();
        }
        if (this.$refs.externalcheckout && this.$refs.externalcheckout.frame) {
          this.$refs.externalcheckout.suspend();
        }
        const vars = {
          cartId: this.$store.getters['cart/id'],
          checkoutMarketId: this.checkoutMarket
        };
        if (Object.keys(this.checkoutInput).length) {
          vars.checkout = this.checkoutInput;
        }
        const updateMutation = () =>
          this.$apollo
            .mutate({
              mutation: createOrUpdateCheckoutMutation,
              variables: vars,
              fetchPolicy: 'no-cache'
            })
            .then(result => {
              this.checkout = result.data.createOrUpdateCheckout;
              this.updateCart(this.checkout.cart);
              this.checkoutLoading = false;
              this.shippingLoading = false;
              this.cartLoading = false;
              this.frameLoading = false;
              this.$nextTick(() => {
                if (this.$refs.udc && this.$refs.udc.widget) {
                  this.$refs.udc.enable();
                }
                if (this.$refs.externalcheckout) {
                  if (
                    this.selectedPaymentOption.newCheckoutSession ||
                    this.forceExternalCheckoutReset
                  ) {
                    this.$refs.externalcheckout.initialize();
                    this.forceExternalCheckoutReset = false;
                  } else {
                    this.$refs.externalcheckout.resume();
                  }
                }
              });
            })
            .catch(error => {
              this.$nuxt.error({
                statusCode: error.statusCode,
                message: error
              });
            });

        this.enqueue(updateMutation);
      }, this.updateDelay);
    },
    // @vuese
    // Updating the cart if the cart is different from the existing cart
    // @arg cart (Object)
    async updateCart(cart) {
      if (
        await this.$store.dispatch('cart/changed', {
          new: cart,
          old: this.cart.data
        })
      ) {
        this.$store.dispatch('cart/update', cart);
      }
    },
    // @vuese
    // Updating the checkout data received from Carismar Checkout
    // @arg data (Object)
    updateCheckoutData(data) {
      this.checkout.billingAddress = data.billingAddress;
      this.checkout.email = data.email;
      if (this.$config.checkout.identityNumber) {
        this.checkout.identityNumber = data.identityNumber;
      }
      if (this.$config.checkout.message) {
        this.message = data.message;
      }
      this.checkout.shippingAddress = data.addShippingAddress
        ? data.shippingAddress
        : null;
    },
    // @vuese
    // Placing the order and redirecting to confirm page if completed
    placeOrder() {
      this.$apollo
        .mutate({
          mutation: placeOrderMutation,
          variables: {
            cartId: this.$store.getters['cart/id'],
            checkoutMarketId: this.checkoutMarket,
            checkout: this.checkoutInput
          }
        })
        .then(result => {
          if (
            result?.data?.placeOrder &&
            result.data.placeOrder.status === 'completed'
          ) {
            const confirmUrl =
              '/checkout/confirm?cartid=' +
              this.$store.getters['cart/id'] +
              '&oid=' +
              result.data.placeOrder.orderId +
              '&email=' +
              this.checkout.email;
            this.$router.push(confirmUrl);
          } else {
            this.$refs.checkoutCarismar.showErrorFeedback();
          }
        })
        .catch(error => {
          this.$nuxt.error({ statusCode: error.statusCode, message: error });
        });
    },
    // @vuese
    // Initialize UDC
    // @arg zip (String)
    initUDC(zip) {
      this.shippingLoading = true;
      if (this.checkout.billingAddress) {
        this.checkout.billingAddress.zip = zip;
      } else {
        this.checkout.billingAddress = {
          firstName: '',
          lastName: '',
          careOf: '',
          addressLine1: '',
          zip,
          city: '',
          entryCode: '',
          mobile: '',
          company: ''
        };
      }
      this.createOrUpdateCheckout('init UDC');
    },
    // @vuese
    // UDC callback handler
    // @arg data (Object)
    setUDCdata(data) {
      this.message = data.deliveryData;
      this.pickupPoint = data.pickupPoint;
      this.externalShippingId = data.selectedOptionId;
      this.cartLoading = true;
      this.udcDataSet = true;
      this.createOrUpdateCheckout('set UDC data');
    },
    // @vuese
    // Handling the payment selection
    // @arg payment id (Number)
    paymentSelectionHandler(id) {
      this.frameLoading = true;
      this.paymentId = id;
      this.createOrUpdateCheckout('payment selection');
    },
    // @vuese
    // Handling the shipping selection
    // @arg shipping id (Number)
    shippingSelectionHandler(id) {
      this.frameLoading = true;
      this.shippingId = id;
      this.createOrUpdateCheckout('shipping selection');
    },
    // @vuese
    // Handling the checkout market selection
    // @arg market (String)
    setCheckoutMarket(value) {
      this.$store.dispatch('channel/setCheckoutMarket', value);
    }
  }
};
