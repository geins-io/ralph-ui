<template>
  <component :is="baseElem" :href="imageObj.Href" class="ca-widget-image">
    <CaImage
      class="ca-widget-image__image"
      size="1360w"
      type="pagewidget"
      :filename="imageObj.Filename"
    />
  </component>
</template>
<script>
import CaImage from 'CaImage';
// @group Molecules
// @vuese
// Widget displaying an image
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
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-widget-image {
}
</style>
