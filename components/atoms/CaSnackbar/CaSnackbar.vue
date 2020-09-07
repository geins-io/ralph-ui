<template>
  <transition name="fade">
    <div v-if="visible" class="ca-snackbar">
      <div class="ca-snackbar__message">
        {{ $store.state.snackbar.message }}
      </div>
    </div>
  </transition>
</template>
<script>
// @group Atoms
// @vuese
export default {
  name: 'CaSnackbar',
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    visible() {
      return this.$store.state.snackbar.message !== '';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-snackbar {
  position: fixed;
  width: calc(100% - #{$default-spacing});
  left: calc(#{$default-spacing} / 2);
  top: $header-bar-height + $top-bar-height + $px12;
  z-index: $z-index-snackbar;
  background: $c-darkest-gray;
  color: $c-text-inverse;
  font-weight: $font-weight-bold;
  padding: $px20;
  border-radius: 4px;
  box-shadow: $box-shadow;
  @include bp(tablet) {
    width: auto;
    left: auto;
    right: calc(#{$default-spacing} / 2);
  }
  @include bp(laptop) {
    top: $header-height-desktop + $default-spacing;
    right: $default-spacing;
  }
}
</style>
