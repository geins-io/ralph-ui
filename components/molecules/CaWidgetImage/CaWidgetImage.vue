<template>
  <component :is="baseElem" :href="imageObj.Href" class="ca-widget-image">
    <CaImage
      class="ca-widget-image__image"
      size="1360w"
      type="pagewidget"
      :alt="altText"
      :filename="imageObj.Filename"
    />
  </component>
</template>
<script>
import CaImage from 'CaImage';
// @group Molecules
// @vuese
// Widget displaying an image<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-image.scss_
export default {
  name: 'CaWidgetImage',
  components: { CaImage },
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
    imageObj() {
      return JSON.parse(this.configuration.Image);
    },
    hasLink() {
      return this.imageObj.Href !== '';
    },
    baseElem() {
      return this.hasLink ? 'a' : 'div';
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
