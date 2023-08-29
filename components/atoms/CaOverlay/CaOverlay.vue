<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="ca-overlay"
      :class="modifiers"
      @click="$emit('clicked')"
    />
  </transition>
</template>
<script>
// @group Atoms
// @vuese
// Used to display an overlay of the entire page<br><br>
// **SASS-path:** _./styles/components/atoms/ca-overlay.scss_
export default {
  name: 'CaOverlay',
  mixins: [],
  props: {
    // Set to true when visible to enable clicks of the overlay
    visible: {
      type: Boolean,
      // `false`
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-overlay--visible': this.visible,
      };
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-overlay';
</style>
