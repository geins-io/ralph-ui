<template>
  <div class="ca-container">
    <slot></slot>
  </div>
</template>
<script>
// @group Atoms
// Used to wrap content to keep page width
export default {
  name: 'CaContainer',
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-container {
  position: relative;
  margin: 0 auto;
  max-width: $site-width;
  width: calc(100% - #{$default-spacing});
  @include bp(laptop) {
    width: calc(100% - #{$default-spacing * 2});
  }
}
</style>
