<template>
  <button
    class="ca-market-selector-button"
    type="button"
    @click="
      $store.commit('contentpanel/open', {
        name: 'market-selector'
      })
    "
  >
    <span class="ca-market-selector-button__inner">
      <CaFlag
        v-if="showFlag"
        class="ca-market-selector-button__flag"
        :country="selectedCountryCode"
        shape="circle"
      />
      <span class="ca-market-selector-button__name">
        {{ selectedCountryName }} ({{ selectedCurrencyCode }})
      </span>
    </span>
  </button>
</template>
<script>
import { mapState } from 'vuex';
// @group Atoms
// @vuese
// Button to trigger he market selector panel<br><br>
// **SASS-path:** _./styles/components/atoms/ca-market-selector-button.scss_
export default {
  name: 'CaMarketSelectorButton',
  mixins: [],
  props: {
    // Setting to show or hide the flag
    showFlag: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({}),
  computed: {
    selectedMarket() {
      return this.markets?.find(market => market.alias === this.currentMarket);
    },
    selectedCountryCode() {
      return this.selectedMarket?.country?.code || '';
    },
    selectedCountryName() {
      return this.selectedMarket?.country?.name || '';
    },
    selectedCurrencyCode() {
      return this.selectedMarket?.currency?.code || '';
    },
    ...mapState({
      markets: state => state.channel.markets,
      currentMarket: state => state.channel.currentMarket
    })
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-market-selector-button';
</style>
