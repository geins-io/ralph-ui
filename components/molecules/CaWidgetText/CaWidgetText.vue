<template>
  <div class="ca-widget-text" :class="textAlignmentClass">
    <component
      :is="getHeadingTag(configuration.titleRenderMode)"
      v-if="configuration.title"
      class="ca-widget-text__title"
    >
      {{ configuration.title }}
    </component>
    <component
      :is="getHeadingTag(configuration.subtitleRenderMode)"
      v-if="configuration.subtitle"
      class="ca-widget-text__subtitle"
    >
      {{ configuration.subtitle }}
    </component>
    <CaHtml
      v-if="configuration.text"
      class="ca-widget-text__body"
      :content="configuration.text"
    />
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Widget displaying text<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-text.scss_
export default {
  name: 'CaWidgetText',
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    textAlignmentClass() {
      const alignClass = 'ca-widget-text--';
      switch (this.configuration.textAlignment) {
        case 1:
          return alignClass + 'left';
        case 2:
          return alignClass + 'center';
        case 3:
          return alignClass + 'right';
        case 4:
          return alignClass + 'justify';
        default:
          return '';
      }
    }
  },
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
        return 'div';
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-text';
</style>
