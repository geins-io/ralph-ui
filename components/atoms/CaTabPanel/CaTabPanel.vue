<template>
  <div
    :id="panelId"
    class="ca-tab-panel"
    :class="{ 'ca-tab-panel--selected': isSelected }"
    role="tabpanel"
    tabindex="0"
    :aria-selected="setAriaSelected"
    :aria-labelledby="panelId"
    :hidden="!isSelected"
  >
    <slot></slot>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Display content by tab panel<br><br>
// **SASS-path:** _./styles/components/atoms/ca-tab-content.scss_
export default {
  name: 'CaTabPanel',
  mixins: [],
  props: {
    // Index of panel
    index: {
      type: Number,
      required: true
    },
    // Total amount of panels
    panelCount: {
      type: Number,
      required: true
    },
    // Selected panel by index
    selectedTab: {
      type: Number,
      default: 0
    }
  },
  data: () => ({}),
  computed: {
    // @vuese
    // panel-id for accessibility
    // TODO: id needs to be unique. Will currently duplicate if several instances
    // @type String
    panelId() {
      return `ca-tab-panel-${this.index}`;
    },
    // @vuese
    // Case selected tab index is above panel count - fallback 0
    // @type Number
    selected() {
      return this.selectedTab <= this.panelCount - 1 ? this.selectedTab : 0;
    },
    // @vuese
    // If current tab is selected
    // @type Boolean
    isSelected() {
      return this.selected === this.index;
    },
    // @vuese
    // aria-selected for accessibility
    // @type String
    setAriaSelected() {
      return this.isSelected ? 'true' : 'false';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-tab-panel';
</style>
