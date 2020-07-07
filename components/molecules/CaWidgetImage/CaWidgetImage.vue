<template>
  <div class="ca-widget-image">
    <CaImage
      class="ca-widget-image__image"
      size="1360w"
      type="pagewidget"
      :filename="imageObj.Filename"
      :placeholder="imageObj.Filename"
    />
  </div>
</template>
<script>
import CaImage from '../../atoms/CaImage/CaImage.vue';
// @group Molecules
// @vuese
export default {
  name: 'CaWidgetImage',
  components: { CaImage },
  mixins: [],
  props: {
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    imageObj() {
      return JSON.parse(this.configuration.Image);
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
