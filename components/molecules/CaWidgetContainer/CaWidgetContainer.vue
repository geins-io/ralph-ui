<template>
  <div v-if="widgets" class="ca-widget-container" :class="layoutClass">
    <CaWidget
      v-for="(widget, index) in widgets"
      :key="index"
      :type="widget.name"
      :configuration="widget.configuration"
    />
  </div>
</template>
<script>
import CaWidget from 'CaWidget';

// @group Molecules
// @vuese
// A container holding a set of widgets<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-container.scss_
export default {
  name: 'CaWidgetContainer',
  components: { CaWidget },
  mixins: [],
  props: {
    // An array of widgets to be displayed in this container
    widgets: {
      type: Array,
      required: true
    },
    // The container layout
    layout: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    layoutClass() {
      return 'ca-widget-container--' + this.layout;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-container';
</style>
