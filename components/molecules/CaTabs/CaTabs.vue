<template>
  <div class="ca-tabs">
    <nav class="ca-tabs__nav" role="tablist" aria-label="Tabs list">
      <button
        v-for="(tab, index) in tabs"
        :id="tabId(index)"
        :key="index"
        class="ca-tabs__tab"
        :class="{ 'ca-tabs__tab--selected': isSelected(index) }"
        role="tab"
        type="button"
        :tabindex="setTabIndex(index)"
        :aria-selected="setAriaSelected(index)"
        :aria-controls="panelId(index)"
        @click="$emit('clicked', index)"
      >
        {{ tab.label }}
      </button>
    </nav>
    <slot name="panels" />
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Toggle content panel by tabs<br><br>
// **SASS-path:** _./styles/components/molecules/ca-tabs.scss_
export default {
  name: 'CaTabs',
  mixins: [],
  props: {
    // Labels to build tabs
    tabs: {
      type: Array,
      required: true,
    },
    // Selected tab by index
    selectedTab: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({}),
  computed: {
    // @vuese
    // Case selected tab index is above panel count - fallback 0
    // @type Number
    selected() {
      return this.selectedTab <= this.tabs.length - 1 ? this.selectedTab : 0;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Id for tab
    // TODO: Make unique. Will currently get duplicated if several instances of component
    // @arg index (Number)
    // @type String
    tabId(index) {
      return `ca-tab-${index}`;
    },
    // @vuese
    // panel-id for accessibility
    // TODO: Make unique. Will currently get duplicated if several instances of component
    // @arg index (Number)
    // @type String
    panelId(index) {
      return `ca-tab-panel-${index}`;
    },
    // @vuese
    // If current tab is selected
    // @arg index (Number)
    // @type Boolean
    isSelected(index) {
      return this.selected === index;
    },
    // @vuese
    // Tab index for keyboard navigation
    // @arg index (Number)
    // @type Number
    setTabIndex(index) {
      return this.isSelected(index) ? 0 : -1;
    },
    // @vuese
    // aria-selected for accessibility
    // Return as expected String making sure not to remove the attr
    // @arg index (Number)
    // @type String
    setAriaSelected(index) {
      return this.isSelected(index) ? 'true' : 'false';
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-tabs';
</style>
