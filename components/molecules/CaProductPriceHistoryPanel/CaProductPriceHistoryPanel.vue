<template>
  <div class="ca-product-price-history-panel">
    <CaClickable
      class="ca-mini-cart"
      :aria-label="$t('CART')"
      @clicked="
        $store.commit('contentpanel/open', {
          name: 'product-price-history'
        })
      "
    >
      <p>{{ $t('PRICE_HISTORY_SHOW') }}</p>
    </CaClickable>

    <CaContentPanel
      class="ca-product-price-history-panel"
      name="product-price-history"
      enter-from="bottom"
      enter-from-tablet-up="right"
      :title="$t('PRICE_HISTORY_TITLE')"
    >
      <CaProductPriceHistory />
    </CaContentPanel>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// A component that displays CaProductPriceHistory in a content panel.<br><br>

// **SASS-path:** _./styles/components/molecules/ca-product-price-history-panel.scss_
export default {
  name: 'CaProductPriceHistoryPanel',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-product-price-history-panel';
</style>
