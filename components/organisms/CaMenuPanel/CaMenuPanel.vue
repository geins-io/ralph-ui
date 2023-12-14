<template>
  <LazyCaContentPanel class="ca-menu-panel" name="menu-panel" enter-from="left">
    <template #header>
      <CaLogo class="ca-menu-panel__logo" :alt="$t('LOGO_ALT_TEXT')" />
    </template>
    <CaPanelNavigation :menu-location-id="menuLocationId" />
    <template #footer>
      <CaSecondaryNav />
    </template>
  </LazyCaContentPanel>
</template>
<script>
// @group Organisms
// @vuese
// A panel holding the panel navigation for given location id and the secondary nav<br><br>
// **SASS-path:** _./styles/components/organisms/ca-menu-panel.scss_
export default {
  name: 'CaMenuPanel',
  mixins: [],
  props: {
    // Menu location id
    menuLocationId: {
      type: String,
      default: '',
    },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'organisms/ca-menu-panel';
</style>
