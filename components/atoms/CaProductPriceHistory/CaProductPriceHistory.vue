<template>
  <div v-if="product" class="ca-product-price-history">
    <p v-if="simple">
      {{ $t('PRICE_HISTORY_LOWEST_PRICE', { lowestPrice }) }}
    </p>
    <table v-else>
      <thead>
        <tr class="ca-product-price-history__head">
          <th class="ca-product-price-history__title">
            {{ $t('PRICE_HISTORY_DATE') }}
          </th>
          <th class="ca-product-price-history__title">
            {{ $t('PRICE_HISTORY_NEW_PRICE') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in pricesToRender"
          :key="index"
          class="ca-product-price-history__list-item"
        >
          <td class="ca-product-price-history__text">
            {{ getDate(item.date).date }}
            <span v-if="!getDate(item.date).isThisYear">
              ({{ getDate(item.date).year }})
            </span>
          </td>

          <td v-if="item.isLowest" class="ca-product-price-history__lowest">
            {{ $t('PRICE_HISTORY_LOWEST') }}
          </td>
          <td
            class="ca-product-price-history__text"
            :class="{
              'ca-product-price-history__text--lowest': item.isLowest,
            }"
          >
            {{ item.sellingPriceIncVatFormatted }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import productPriceHistoryQuery from 'product/product-price-history.graphql';
import MixFetch from 'MixFetch';
// @group Atoms
// @vuese
// A component that displays price history of product. <br><br>
// **SASS-path:** _./styles/components/atoms/ca-product-price-history.scss_
export default {
  name: 'CaProductPriceHistory',
  mixins: [MixFetch],
  props: {
    // @vuese
    // The date locale
    locale: {
      type: String,
      default() {
        return this.$store.state.channel.currentLocale;
      },
    },
    // @vuese
    // Set to true to display full month like so: 'december'. Defaults to short like so: 'dec'
    showFullMonth: {
      type: Boolean,
      default: false,
    },
    // @vuese
    // Set to true to display only one line with lowest price.
    simple: {
      type: Boolean,
      default: false,
    },
    // @vuese
    // The product alias
    prodAlias: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    product: null,
  }),
  async fetch() {
    this.product = await this.fetchData(productPriceHistoryQuery, (result) => {
      const { product } = result.data;
      return product;
    });
  },
  computed: {
    variables() {
      return {
        alias: this.prodAlias || this.$route.params.alias,
      };
    },
    monthFormat() {
      return this.showFullMonth ? 'long' : 'short';
    },
    lowestPrice() {
      return this.product.priceLog.find((price) => price.isLowest)
        .sellingPriceIncVatFormatted;
    },
    pricesToRender() {
      const reversedPriceLog = [...this.product.priceLog].reverse();
      let latestPrice = null;
      const pricesToRender = [];
      reversedPriceLog.forEach((price) => {
        if (price.sellingPriceIncVat !== latestPrice) {
          pricesToRender.unshift(price);
        }
        latestPrice = price.sellingPriceIncVat;
      });
      return pricesToRender;
    },
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    getDate(date) {
      const changeDate = new Date(date);
      const year = changeDate.getFullYear();
      const month = changeDate
        .toLocaleString(this.dateLocale, { month: this.monthFormat })
        .replace('.', '');
      const day = changeDate.getDate();
      return {
        date: `${day} ${month}`,
        isThisYear: year === new Date().getFullYear(),
        year,
      };
    },
  },
};
</script>
<style lang="scss">
@import 'atoms/ca-product-price-history';
</style>
