<template>
  <div class="ca-overlay" :class="modifiers" @click="$emit('clicked')"></div>
</template>
<script>
// @group Atoms
// @vuese
// Used to display an overlay of the entire page
export default {
  name: 'CaOverlay',
  components: {},
  mixins: [],
  props: {
    // Set to true when visible to enable clicks of the overlay
    visible: {
      type: Boolean,
      // `false`
      default: false
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-overlay--visible': this.visible
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-overlay {
  z-index: $z-index-overlay;
  background-color: $c-overlay;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  &--visible {
    pointer-events: initial;
  }
}
</style>
