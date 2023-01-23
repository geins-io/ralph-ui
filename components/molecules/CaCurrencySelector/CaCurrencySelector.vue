<template>
  <div class="ca-currency-selector">
    <nav class="ca-currency-selector__nav">
      <button
        class="ca-currency-selector__item"
        :class="{ 'is-selected': $store.state.marketId === 'SE|SEK' }"
        @click="setMarket('SE|SEK')"
      >
        <span class="ca-currency-selector__label">
          SEK
        </span>
      </button>
      <button
        class="ca-currency-selector__item"
        :class="{ 'is-selected': $store.state.marketId === 'EU|EUR' }"
        @click="setMarket('EU|EUR')"
      >
        <span class="ca-currency-selector__label">
          EUR
        </span>
      </button>
    </nav>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// This component is used to select the currency. Needs more attention to become dynamic. Right now only quickly made for one client.
export default {
  name: 'CaCurrencySelector',
  mixins: [],
  props: {
    // How to print locale label
    displayName: {
      // `full`, `code`
      type: String,
      default: 'code'
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    setMarket(id) {
      this.$store.commit('setMarketId', id);
      this.$cookies.set('selected-market', id, {
        path: '/',
        expires: new Date(new Date().getTime() + 31536000000)
      });
      this.$store.dispatch('cart/get');
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-currency-selector';
</style>
