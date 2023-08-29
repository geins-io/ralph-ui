<template>
  <div class="ca-container" :class="designClass">
    <slot />
  </div>
</template>
<script>
// @group Atoms
// Used to wrap content to keep page width<br><br>
// **SASS-path:** _./styles/components/atoms/ca-container.scss_
export default {
  name: 'CaContainer',
  mixins: [],
  props: {
    design: {
      type: String,
      default: 'default',
    },
  },
  data: () => ({}),
  computed: {
    designClass() {
      return 'ca-container--' + this.design;
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-container';
</style>
