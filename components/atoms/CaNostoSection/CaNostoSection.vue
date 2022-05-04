<template>
  <div class="ca-nosto-section">
    <div :id="nostoId" class="nosto_element"></div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Nosto placement block
// **SASS-path:** _./styles/components/atoms/ca-ca-nosto-section.scss_
export default {
  name: 'CaNostoSection',
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      default: null
    }
  },
  data: () => ({}),
  computed: {
    nostoId() {
      return this.configuration?.nostoId;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-nosto-section';
</style>
