<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="ca-widget-html">
    <div
      v-if="configuration.html"
      class="ca-widget-html__content"
      v-html="configuration.html"
    ></div>
    <style v-if="configuration.css" v-html="configuration.css"></style>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Widget displaying HTML<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-html.scss_
export default {
  name: 'CaWidgetHtml',
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
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
@import 'molecules/ca-widget-html';
</style>
