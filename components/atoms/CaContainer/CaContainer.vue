<template>
  <div class="ca-container" :class="widthClass">
    <slot></slot>
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
    width: {
      type: String,
      default: 'default'
    }
  },
  data: () => ({}),
  computed: {
    widthClass() {
      return 'ca-container--' + this.width;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-container';
</style>
