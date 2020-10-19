<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="ca-widget-text">
    <component
      :is="getHeadingTag(configuration.TitleRenderMode)"
      v-if="configuration.Title"
      class="ca-widget-text__title"
    >
      {{ configuration.Title }}
    </component>
    <component
      :is="getHeadingTag(configuration.SubtitleRenderMode)"
      v-if="configuration.Subtitle"
      class="ca-widget-text__subtitle"
    >
      {{ configuration.Subtitle }}
    </component>
    <div
      v-if="configuration.Text"
      class="ca-widget-text__body"
      v-html="configuration.Text"
    ></div>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Widget displaying text<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-text.scss_
export default {
  name: 'CaWidgetText',
  components: {},
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
  methods: {
    getHeadingTag(id) {
      if (id === 0) {
        return 'h1';
      }
      if (id === 1) {
        return 'h2';
      }
      if (id === 2) {
        return 'h3';
      }
      if (id === 3) {
        return 'span';
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-text';
</style>
