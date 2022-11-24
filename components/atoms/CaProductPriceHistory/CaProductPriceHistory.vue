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
        v-for="(item, index) in sortedPriceHistory"
        :key="index"
        class="ca-product-price-history__list-item"
      >
        <span class="ca-product-price-history__text">{{
          getDate(item.date)
        }}</span>
        <span
          class="ca-product-price-history__text"
          :class="
            isLowestPrice(item.newPrice) &&
              'ca-product-price-history__text--lowest'
          "
        >
          <span
            v-if="isLowestPrice(item.newPrice)"
            class="ca-product-price-history__lowest"
            >Lowest price</span
          >
          {{ item.newPrice }}</span
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
export default {
  name: 'CaProductPriceHistory',
  mixins: [],
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
    priceHistory: [
      {
        date: new Date('October 17'),
        prevPrice: 399,
        newPrice: 249
      },
      {
        date: new Date('October 5'),
        prevPrice: 279,
        newPrice: 399
      },
      {
        date: new Date('4 dec'),
        prevPrice: 249,
        newPrice: 399
      }
    ]
  }),
  computed: {
    dateLanguage() {
      return this.language
        ? this.language
        : this.$config.currentChannelSettings.locale;
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
      console.log(this.priceHistory);
      return sortedPrices;
    }
  },
  watch: {},
  mounted() {
    this.$emit('lowest-price', this.lowestPrice);
  },
  methods: {
    getDate(date) {
      console.log(this.$config.currentChannelSettings);
      const day = date.getDate();
      const month = date
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
