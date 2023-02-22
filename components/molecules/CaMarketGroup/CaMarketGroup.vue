<template>
  <div class="ca-market-group">
    <h2 class="ca-market-group__title">{{ $t('MARKET_GROUP_' + groupKey) }}</h2>
    <ul class="ca-market-group__list">
      <li
        v-for="market in markets"
        :key="market.id"
        class="ca-market-group__market"
      >
        <CaMarketItem :market="market" />
      </li>
    </ul>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// A group of market items with a group title<br><br>
// **SASS-path:** _./styles/components/molecules/ca-market-group.scss_
export default {
  name: 'CaMarketGroup',
  mixins: [],
  props: {
    // List of markets
    markets: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    groupKey() {
      const groups = this.markets.map(market => market.groupKey);
      const uniqueGroups = [...new Set(groups)];
      return uniqueGroups[0].toUpperCase();
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-market-group';
</style>
