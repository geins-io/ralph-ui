<template>
  <component
    :is="linkBaseElem"
    v-bind="linkElemAttributes"
    class="ca-widget-image"
  >
    <CaImage
      class="ca-widget-image__image"
      size="1360w"
      type="pagewidget"
      :alt="altText"
      :filename="imageObj.Filename"
      :ratio="630 / 902"
    />
  </component>
</template>
<script>
import CaImage from 'CaImage';
import MixLinkHandler from 'MixLinkHandler';
// @group Molecules
// @vuese
// Widget displaying an image<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-image.scss_
export default {
  name: 'CaWidgetImage',
  components: { CaImage },
  mixins: [MixLinkHandler],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    imageObj() {
      return JSON.parse(this.configuration.Image);
    },
    href() {
      return this.imageObj.Href;
    },
    altText() {
      return this.imageObj.AltText || 'Widget image';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-image';
</style>
