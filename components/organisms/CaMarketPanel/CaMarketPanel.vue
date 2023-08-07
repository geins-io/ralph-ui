<template>
  <LazyCaContentPanel
    name="market-selector"
    enter-from="bottom"
    enter-from-tablet-up="right"
    :title="$t('MARKET_PANEL_TITLE')"
    class="ca-market-panel"
  >
    <ul v-if="mode === 'simple'" class="ca-market-panel__simple-list">
      <li
        v-for="(market, index) in selectableMarkets"
        :key="index"
        class="ca-market-panel__opt"
      >
        <a
          :href="
            $getPath(
              'index',
              market.alias,
              getCodeFromId(market.defaultLanguageId)
            )
          "
          class="ca-market-panel__choice"
          :class="{
            'ca-market-panel__choice--disabled':
              market.alias === $store.state.channel.currentMarket
          }"
        >
          <CaFlag
            class="ca-market-panel__flag"
            :country="market.country.code"
            shape="circle"
          />
          {{ market.country.name }}
          <span class="ca-market-panel__currency">
            ({{ market.currency.code }})
          </span>
        </a>
      </li>
    </ul>
    <div v-else class="ca-market-panel__wrap">
      <CaMarketGroup
        v-for="(group, index) in marketsByGroupKey"
        :key="index"
        :markets="group"
        class="ca-market-panel__group"
      />
    </div>
  </LazyCaContentPanel>
</template>
<script>
import { mapState } from 'vuex';
// @group Organisms
// @vuese
// A panel for selecting markets<br><br>
// **SASS-path:** _./styles/components/organisms/ca-market-panel.scss_
export default {
  name: 'CaMarketPanel',
  mixins: [],
  props: {
    // Display mode for country selector. Advanced mode groups markets by groupKey and shows languages per market
    mode: {
      // `simple` or `advanced`
      type: String,
      default: 'simple',
      validator: value => ['simple', 'advanced'].includes(value)
    }
  },
  data: () => ({}),
  computed: {
    // @vuese
    // List of selectable markets
    // @type {Array}
    selectableMarkets() {
      return this.markets.filter(market => !market.onlyDisplayInCheckout);
    },
    // @vuese
    // Markets grouped by groupKey
    // @type {Object}
    marketsByGroupKey() {
      return this.selectableMarkets.reduce((acc, market) => {
        const { groupKey } = market;
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(market);
        return acc;
      }, {});
    },
    ...mapState({
      markets: state => state.channel.markets,
      currentMarket: state => state.channel.currentMarket
    })
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Get the language code from a language id
    // @arg id (String)
    getCodeFromId(id) {
      const result = id.split('-');
      const [code] = result;
      return code;
    }
  }
};
</script>
<style lang="scss">
@import 'organisms/ca-market-panel';
</style>
