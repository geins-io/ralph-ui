<template>
  <CaAccordionItem class="ca-order-summary">
    <template #toggle-content="{open}">
      <div class="ca-order-summary__header">
        <div class="ca-order-summary__info">
          <span class="ca-order-summary__date">{{ order.date }}</span>
          <span class="ca-order-summary__count">
            {{ order.cart.count }}
            {{ $tc('PRODUCT_LOWERCASE', order.cart.count) }}
          </span>
          <span class="ca-order-summary__status">
            <CaStatusLabel :text="order.status" />
          </span>
          <span class="ca-order-summary__id">#{{ order.id }}</span>
          <span class="ca-order-summary__total">
            {{ $store.getters.getSellingPrice(order.cart.total) }}
          </span>
        </div>
        <CaButton
          v-if="$store.getters.viewport !== 'phone'"
          class="ca-order-summary__toggle"
          size="s"
          :color="open ? 'secondary' : 'primary'"
          :no-function="true"
        >
          <CaIconAndText
            :icon-name="open ? 'arrow-up' : 'arrow-down'"
            icon-position="right"
          >
            {{ $t('ACCOUNT_VIEW_DETAILS') }}
          </CaIconAndText>
        </CaButton>
        <CaIcon
          v-else
          class="ca-order-summary__toggle-icon"
          :name="open ? 'chevron-up' : 'chevron-down'"
        />
      </div>
    </template>
    <div class="ca-order-summary__details">
      <div class="ca-order-detail">
        <div class="ca-order-detail__methods">
          <div class="ca-order-detail__method">
            <h3 class="ca-order-detail__subtitle">
              {{ $t('SHIPPING_METHOD') }}
            </h3>
            {{ order.shipping.name }}
          </div>
          <div class="ca-order-detail__method">
            <h3 class="ca-order-detail__subtitle">
              {{ $t('PAYMENT_METHOD') }}
            </h3>
            {{ order.payment.name }}
          </div>
        </div>
        <CaButton class="ca-order-detail__track" type="full-width">
          {{ $t('TRACK_ORDER') }}
        </CaButton>
        <CaCart
          class="ca-order-detail__cart"
          mode="display"
          :cart="order.cart"
        />
        <div class="ca-order-detail__addresses">
          <div class="ca-order-detail__address">
            <h3 class="ca-order-detail__subtitle">
              {{ $t('BILLING_ADDRESS') }}
            </h3>
            <CaAddress :address="order.address.billing" />
          </div>
          <div class="ca-order-detail__address">
            <h3 class="ca-order-detail__subtitle">
              {{ $t('SHIPPING_ADDRESS') }}
            </h3>
            <CaAddress :address="order.address.shipping" />
          </div>
        </div>
      </div>
    </div>
  </CaAccordionItem>
</template>
<script>
import getOrdersQuery from 'user/orders.graphql';
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-order-summary.scss_
export default {
  name: 'CaOrderSummary',
  apollo: {
    getOrders: {
      query: getOrdersQuery,
      variables() {
        return {
          apiKey: this.$config.apiKey.toString()
        };
      },
      context() {
        return {
          headers: this.$store.state.auth.headers
        };
      },
      result(result) {
        console.log('getOrders', result);
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  mixins: [],
  props: {},
  data: () => ({
    order: {
      id: '189144',
      date: 'Nov 03, 2020',
      cart: {
        id: '1c90e6be-096c-49ce-88d3-24179887a4fc',
        count: 1,
        total: {
          sellingPriceIncVatFormatted: '159 kr',
          sellingPriceExVatFormatted: '142 kr',
          __typename: 'PriceType'
        },
        items: [
          {
            quantity: 1,
            skuId: 5273,
            totalPrice: {
              isDiscounted: true,
              regularPriceIncVatFormatted: '199 kr',
              sellingPriceIncVatFormatted: '159 kr',
              regularPriceExVatFormatted: '178 kr',
              sellingPriceExVatFormatted: '142 kr',
              __typename: 'PriceType'
            },
            product: {
              brand: { name: 'Godis.se', __typename: 'BrandType' },
              name: 'Jag älskar dig - Lakrits Mix Stor',
              images: ['godisse_jag_alskar_dig_-_lakrits_mix_stor.jpg'],
              alias: 'jag-alskar-dig-lakrits-mix-stor',
              unitPrice: {
                isDiscounted: true,
                regularPriceIncVatFormatted: '199 kr',
                sellingPriceIncVatFormatted: '159 kr',
                regularPriceExVatFormatted: '178 kr',
                sellingPriceExVatFormatted: '142 kr',
                __typename: 'PriceType'
              },
              skus: [
                {
                  skuId: 5273,
                  name: '700g',
                  stock: { totalStock: 8, __typename: 'StockType' },
                  __typename: 'SkuType'
                }
              ],
              __typename: 'ProductType'
            }
          }
        ]
      },
      status: 'Received',
      shipping: {
        id: 2,
        name: 'Instabox',
        trackingLink: ''
      },
      payment: {
        id: 1,
        name: 'Klarna'
      },
      message: '',
      address: {
        shipping: {
          firstName: 'Olivia',
          lastName: 'Axelsson',
          email: 'olivia.axelsson@gmail.com',
          co: '',
          address: 'Gamla Huddingevägen 442',
          address2: '',
          zip: '125 42',
          city: 'Älvsjö',
          country: 'Sweden'
        },
        billing: {
          firstName: 'Olivia',
          lastName: 'Axelsson',
          email: 'olivia.axelsson@gmail.com',
          co: '',
          address: 'Gamla Huddingevägen 442',
          address2: '',
          zip: '125 42',
          city: 'Älvsjö',
          country: 'Sweden'
        }
      }
    }
  }),
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-order-summary';
</style>
