<template>
  <div class="ca-currency-selector">
    <nav class="ca-currency-selector__nav">
      <button
        class="ca-currency-selector__item"
        :class="{
          'is-selected': $store.getters['channel/currentCurrency'] === 'SEK'
        }"
        @click="setMarket('se')"
      >
        <span class="ca-currency-selector__label">
          SEK
        </span>
      </button>
      <button
        class="ca-currency-selector__item"
        :class="{
          'is-selected': $store.getters['channel/currentCurrency'] === 'EUR'
        }"
        @click="setMarket('eu')"
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
    setMarket(alias) {
      this.$store.dispatch('channel/setCurrentMarket', alias);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-currency-selector';
</style>
