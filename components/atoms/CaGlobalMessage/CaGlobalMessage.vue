<template>
  <div class="ca-global-message">
    <slot />
  </div>
</template>
<script>
// @group Atoms
// @vuese
// A global message for the site<br><br>
// **SASS-path:** _./styles/components/atoms/ca-global-message.scss_
export default {
  name: 'CaGlobalMessage',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-global-message';
</style>
