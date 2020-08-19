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
// Widget displaying text
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
.ca-widget-text {
  $block: &;
  text-align: center;
  padding: $px12 0;
  &__title {
    font-family: $heading-font;
    font-weight: $font-weight-bold;
    font-size: $font-size-xxl;
    & + #{$block}__subtitle {
      margin-top: $px4;
    }
  }
  &__subtitle {
    font-size: $font-size-l;
    font-weight: $font-weight-bold;
    & + #{$block}__body {
      margin-top: $px8;
    }
  }
  &__body {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
