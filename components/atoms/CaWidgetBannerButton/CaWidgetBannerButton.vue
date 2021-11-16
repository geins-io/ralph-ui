<template>
  <CaButton
    class="ca-widget-banner-button"
    :size="$store.getters.viewportComputer ? 'm' : 's'"
    :no-function="true"
  >
    <slot></slot>
  </CaButton>
</template>
<script>
// @group Atoms
// @vuese
// The button in the banner widget. Component made to be overridden if necessary<br><br>
// **SASS-path:** _./styles/components/atoms/ca-widget-banner-button.scss_
export default {
  name: 'CaWidgetBannerButton',
  mixins: [],
  props: {
    textColor: {
      type: Number,
      default: 0
    },
    belowImage: {
      type: Boolean,
      default: false
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
