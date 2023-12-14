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
      :banner-image="fullWidth"
      :filename="filename"
      :ratio="currentRatio"
      :sizes="imageSizes"
      :loading="isParrentFirst"
    />
  </component>
</template>
<script>
import MixWidgetImage from 'MixWidgetImage';
// @group Molecules
// @vuese
// Widget displaying an image<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-image.scss_
export default {
  name: 'CaWidgetImage',
  mixins: [MixWidgetImage],
  props: {
    isFirst: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    isParrentFirst() {
      if (this.isFirst) {
        return 'eager';
      } else {
        return 'lazy';
      }
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-image';
</style>
