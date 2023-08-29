<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <code v-if="configuration.JSON" v-html="configuration.JSON" />
</template>
<script>
// @group Molecules
// @vuese
// Custom widget component that renders a widget based on the configuration JSON object<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-json.scss_
export default {
  name: 'CaWidgetJson',
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true,
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
@import 'molecules/ca-widget-json';
</style>
