<template>
  <div>
    <button
      class="ca-country-selector-panel"
      @click="
        $store.commit('contentpanel/open', {
          name: 'country-selector',
        })
      "
    >
      <span class="ca-country-selector-panel__description">
        {{ $t('CHOOSE_YOUR_COUNTRY') }}:
        <span>{{ selectedMarketName }}</span>
      </span>
    </button>

    <LazyCaContentPanel
      name="country-selector"
      enter-from="right"
      title="Choose your country"
      class="ca-filter-panel"
    >
      <div
        v-for="(market, index) in selectableMarkets"
        :key="index"
        class="ca-country-selector-panel__opt"
      >
        <a
          :href="getLink(market.defaultLanguageId, market.alias)"
          class="ca-country-selector-panel__choice"
          :class="{
            'ca-country-selector-panel__choice--disabled':
              market.alias === $store.state.marketId,
          }"
          @click="setMarket(market.alias)"
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
// Country selector panel<br><br>
// **SASS-path:** _./styles/components/molecules/ca-country-selector-panel.scss_
import { mapState } from 'vuex';
export default {
  name: 'CaCountrySelectorPanel',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    selectedMarket() {
      const selectedMarket = this.markets?.find(
        (market) => market.alias === this.currentMarket,
      );
      if (selectedMarket) {
        return selectedMarket;
      }
      return '';
    },
    selectedMarketName() {
      return this.selectedMarket?.country?.name;
    },
    selectableMarkets() {
      return this.markets.filter((market) => !market.onlyDisplayInCheckout);
    },
    ...mapState({
      markets: (state) => state.channel.markets,
      currentMarket: (state) => state.channel.currentMarket,
    }),
  },
  watch: {},
  mounted() {},
  methods: {
    getCodeFromId(id) {
      const result = id.split('-');
      const [code] = result;
      return code;
    },
    getLink(id, alias) {
      const market = this.$config.public.marketInPath ? '/' + alias : '';
      const language = this.getCodeFromId(id);
      return `${market}/${language}`;
    },
    setMarket(alias) {
      this.$store.dispatch('channel/setCurrentMarket', alias);
      this.$store.commit('contentpanel/close');
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-country-selector-panel';
</style>
