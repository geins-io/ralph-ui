<template>
  <CaButton
    class="ca-widget-banner-button"
    :size="$store.getters.viewportComputer ? 'm' : 's'"
  >
    <slot></slot>
  </CaButton>
</template>
<script>
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-widget-banner-button.scss_
export default {
  name: 'CaWidgetBannerButton',
  mixins: [],
  props: {
    textColor: {
      type: Number,
      default: 0
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-widget-banner-button';
</style>
