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
    // Nosto id, need to render block
    nostoId: {
      type: String,
      default: ''
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
@import 'atoms/ca-nosto-section';
</style>
