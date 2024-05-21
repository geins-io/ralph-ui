<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="ca-widget-json">
    <h3 class="ca-widget-json__title">Custom created widget</h3>
    <p class="ca-widget-json__info">
      Below you will find the JSON data of the widget you have created. Now it's
      up to you to do something amazing with it!
    </p>
    <p class="ca-widget-json__extra-info">
      Read more on how to use the Geins CMS Create widget function
      <a
        class="ca-widget-json__link"
        href="https://docs.geins.io/docs/geins/cms/create-widget"
        target="_blank"
      >
        here</a
      >.
    </p>
    <CaFeedback class="ca-widget-json__feedback" :constant="true">
      <p>
        <strong>Tip!</strong> You can use the
        <a
          class="ca-widget-json__link"
          target="_blank"
          href="https://www.npmjs.com/package/@geins/ralph-module-cms"
        >
          Geins CMS module
        </a>
        to handle the widget rendering, for a plug and play way to start
        creating your own widget components.
      </p>
    </CaFeedback>
    <pre v-if="configuration.json" class="ca-widget-json__pre">
    <p class="ca-widget-json__code-title">configuration.json</p>
    <div
      class="ca-widget-json__code"
      v-html="configuration.json"
    />
    </pre>
  </div>
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
