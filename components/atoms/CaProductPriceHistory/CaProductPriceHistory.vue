<template>
  <div class="ca-product-price-history">
    <ul>
      <li class="ca-product-price-history__list-item">
        <span class="ca-product-price-history__title">{{
          $t('PRICE_HISTORY_DATE')
        }}</span>
        <span class="ca-product-price-history__title">{{
          $t('PRICE_HISTORY_NEW_PRICE')
        }}</span>
      </li>
      <li
        v-for="(item, index) in priceLog"
        :key="index"
        class="ca-product-price-history__list-item"
      >
        <span class="ca-product-price-history__text">{{
          getDate(item.date)
        }}</span>
        <span
          class="ca-product-price-history__text"
          :class="item.isLowest && 'ca-product-price-history__text--lowest'"
        >
          <span v-if="item.isLowest" class="ca-product-price-history__lowest"
            >Lowest price</span
          >
          {{ item.price }}</span
        >
      </li>
    </ul>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-product-price-history.scss_
import productPriceHistoryQuery from 'product/product-price-history.graphql';

export default {
  name: 'CaProductPriceHistory',
  mixins: [],
  apollo: {
    product: {
      query: productPriceHistoryQuery,
      variables() {
        return {
          alias: this.productAlias
        };
      },
      errorPolicy: 'all',
      result(result) {
        const { product } = result.data;
        this.priceLog = product.priceLog;
        this.unitPrice = product.unitPrice;
        console.log('priceLog', this.priceLog);
        console.log('unitPrice', this.unitPrice);
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    }
  },

  props: {
    // language used for date, like so: 'sv'. Defaults to $config.currentChannelSettings.locale if not set
    language: {
      type: String,
      default: ''
    },
    // Set to true to display full month like so: 'december'. Defaults to short like so: 'dec'
    fullMonth: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    priceLog: [],
    unitPrice: {},
    productAlias: ''
  }),
  computed: {
    dateLanguage() {
      return this.language ? this.language : this.$i18n.defaultLocale;
    },
    monthFormat() {
      return this.fullMonth ? 'long' : 'short';
    },
    lowestPrice() {
      return this.priceHistory.reduce((prev, curr) => {
        return curr.newPrice < prev.newPrice ? curr : prev;
      }).newPrice;
    },
    sortedPriceHistory() {
      const sortedPrices = [...this.priceHistory].sort(
        (a, b) => Number(b.date) - Number(a.date)
      );
      return sortedPrices;
    }
  },
  watch: {},
  mounted() {},
  created() {
    this.productAlias = this.$route.params.alias;
  },
  methods: {
    getDate(date) {
      const newDate = new Date(date);
      const day = newDate.getDate();
      const month = newDate
        .toLocaleString(this.dateLanguage, { month: this.monthFormat })
        .replace('.', '');
      return `${day} ${month}`;
    },
    isLowestPrice(price) {
      return price === this.lowestPrice;
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-product-price-history';
</style>
