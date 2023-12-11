<template>
  <div class="ca-product-tabs">
    <CaTabs
      v-if="tabs.length > 0"
      :tabs="tabs"
      :selected-tab="selectedTab"
      @clicked="setSelectedTab"
    >
      <template #panels>
        <CaTabPanel
          v-for="(tab, index) in tabs"
          :key="index"
          :index="index"
          :selected-tab="selectedTab"
          :title="tab.label"
          :panel-count="tabs.length"
        >
          <CaHtml
            v-if="tab.panel"
            class="ca-tabs__panel-content"
            :content="tab.panel"
          />
        </CaTabPanel>
      </template>
    </CaTabs>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Used to present your detailed product information in tabs<br><br>
//
// **Data:**<br>
// selectedTab: `0`
//
// **SASS-path:** _./styles/components/molecules/ca-product-tabs.scss_
export default {
  name: 'CaProductTabs',
  mixins: [],
  props: {
    // The product object
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    selectedTab: 0,
  }),
  computed: {
    tabs() {
      return [
        {
          label: this.$t('PRODUCT_DESCRIPTION'),
          panel: this.product.texts.text1,
        },
        {
          label: this.$t('PRODUCT_SPECIFICATION'),
          panel: this.product.texts.text2,
        },
        {
          label: 'Extra info',
          panel: this.product.texts.text3,
        },
      ];
    },
  },
  watch: {},
  mounted() {},
  methods: {
    setSelectedTab(data) {
      this.selectedTab = data;
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-product-tabs';
</style>
