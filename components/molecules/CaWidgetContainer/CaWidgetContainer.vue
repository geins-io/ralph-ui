<template>
  <div v-if="widgets" class="ca-widget-container">
    <CaWidget
      v-for="(widget, index) in widgets"
      :key="index"
      :type="widget.name"
      :size="widget.size"
      :configuration="widget.configuration"
    />
  </div>
</template>
<script>
import CaWidget from 'CaWidget';

// @group Molecules
// @vuese
export default {
  name: 'CaWidgetContainer',
  components: { CaWidget },
  mixins: [],
  props: {
    widgets: {
      type: Array,
      required: true
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
.ca-widget-container {
  display: flex;
  flex-wrap: wrap;
  margin: -$widget-spacing;
  &:not(:first-child) {
    margin-top: $widget-spacing;
  }
  @include bp(tablet) {
    margin: -$widget-spacing-desktop;
    &:not(:first-child) {
      margin-top: $widget-spacing-desktop;
    }
  }
}
</style>
