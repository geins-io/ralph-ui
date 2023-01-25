<template>
  <div v-if="!error">
    <button
      class="ca-country-selector-panel"
      @click="
        $store.commit('contentpanel/open', {
          name: 'country-selector'
        })
      "
    >
      <span class="ca-country-selector-panel__description">
        {{ $t('CHOOSE_YOUR_COUNTRY') }}:
        <span>{{ selectedMarket.country.name }}</span>
      </span>
    </button>

    <LazyCaContentPanel
      name="country-selector"
      enter-from="right"
      title="Choose your country"
      class="ca-filter-panel"
    >
      <div
        v-for="(market, index) in markets"
        :key="index"
        class="ca-country-selector-panel__opt"
      >
        <a
          :href="'/' + getCodeFromId(market.defaultLanguageId)"
          class="ca-country-selector-panel__choice"
          :class="{
            'ca-country-selector-panel__choice--disabled':
              market.id === $store.state.marketId
          }"
          @click="setMarket(market.id)"
        >
          {{ market.country.name }}
        </a>
      </div>
    </LazyCaContentPanel>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-country-selector-panel.scss_
import getMarkets from 'global/markets.graphql';
export default {
  name: 'CaCountrySelectorPanel',
  apollo: {
    channel: {
      query: getMarkets,
      errorPolicy: 'all',
      result(result) {
        this.markets = result?.data?.channel?.markets || [];
      },
      error(error) {
        /* eslint-disable no-console */
        console.error(error);
        this.error = true;
      }
    }
  },
  mixins: [],
  props: {},
  data: () => ({
    markets: [],
    error: false
  }),
  computed: {
    selectedMarket() {
      const selectedMarket = this.markets?.find(
        market => market.id === this.$store.state.marketId
      );
      if (selectedMarket) {
        return selectedMarket;
      }
      return '';
    }
  },
  watch: {},
  mounted() {},
  methods: {
    getCodeFromId(id) {
      const result = id.split('-');
      const [code] = result;
      return code;
    },
    setMarket(id) {
      this.$store.dispatch('setMarketId', id);
      this.$store.commit('contentpanel/close');
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-country-selector-panel';
</style>
