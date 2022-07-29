<template>
  <div class="ca-widget-rich-text">
    <CaHtml
      v-if="configuration.text"
      class="ca-widget-rich-text__body"
      :content="configuration.text"
    />
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Widget displaying a chunk of rich text<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-rich-text.scss_
export default {
  name: 'CaWidgetRichText',
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
@import 'molecules/ca-widget-rich-text';
</style>
