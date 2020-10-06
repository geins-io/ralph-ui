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
// Used to show user feedback as messages, triggered as so: `$store.dispatch('snackbar/trigger', [message (String)]);`<br><br>
// **SASS-path:** _./styles/components/atoms/ca-snackbar.scss_
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
@import 'atoms/ca-snackbar';
</style>
