<template>
  <div class="ca-product-price-history">
    <p v-if="simple && product">
      {{
        $t('PRICE_HISTORY_LOWEST_PRICE', {
          lowestPrice
        })
      }}
    </p>
    <ul v-else-if="!simple && product">
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
        <span class="ca-product-price-history__text"
          >{{ getDate(item.date).date }}
          <span
            v-if="!getDate(item.date).isThisYear"
            class="ca-product-price-history__year"
            >({{ getDate(item.date).year }})</span
          >
        </span>
        <span
          class="ca-product-price-history__text"
          :class="item.isLowest && 'ca-product-price-history__text--lowest'"
        >
          <span v-if="item.isLowest" class="ca-product-price-history__lowest">{{
            $t('PRICE_HISTORY_LOWEST')
          }}</span>
          {{ item.sellingPriceIncVatFormatted }}
        </span>
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
          alias: this.$route.params.alias
        };
      },
      errorPolicy: 'all',
      result(result) {
        const { product } = result.data;
        this.priceLog = product.priceLog;
        this.unitPrice = product.unitPrice;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      }
    }
  },

  props: {
    // locale used for date, like so: 'sv' or 'sv-SE'. Defaults to $i18n.defaultLocale if not set
    locale: {
      type: String,
      default: ''
    },
    // Set to true to display full month like so: 'december'. Defaults to short like so: 'dec'
    showFullMonth: {
      type: Boolean,
      default: false
    },
    // Set to true to display only one line with lowest price.
    simple: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    priceLog: [],
    unitPrice: {}
  }),
  computed: {
    dateLocale() {
      return this.locale ? this.locale : this.$i18n.defaultLocale;
    },
    monthFormat() {
      return this.showFullMonth ? 'long' : 'short';
    },
    lowestPrice() {
      return this.priceLog.find(price => price.isLowest)
        .sellingPriceIncVatFormatted;
    }
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
        year
      };
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-product-price-history';
</style>
