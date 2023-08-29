<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="ca-snackbar"
      :class="[placementClass, modeClass]"
    >
      <div class="ca-snackbar__message">
        {{ snackbar.message }}
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex';
// @group Atoms
// @vuese
// Used to show user feedback as messages, triggered as so: `$store.dispatch('snackbar/trigger', {message: String, placement: 'bottom-center'/'top-right' (optional), mode: 'error'/'success' (optional)});`<br><br>
// **SASS-path:** _./styles/components/atoms/ca-snackbar.scss_
export default {
  name: 'CaSnackbar',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    visible() {
      return this.snackbar.message !== '';
    },
    placementClass() {
      return 'ca-snackbar--' + this.snackbar.placement;
    },
    modeClass() {
      return this.snackbar.mode ? 'ca-snackbar--' + this.snackbar.mode : '';
    },
    ...mapState(['snackbar']),
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-snackbar';
</style>
