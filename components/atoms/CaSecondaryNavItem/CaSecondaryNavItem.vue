<template>
  <li class="ca-secondary-nav-item">
    <!-- Add link here -->
    <slot></slot>
  </li>
</template>
<script>
// @group Atoms
// @vuese
// Navigation item wrapper of secondary navigation link
export default {
  name: 'CaSecondaryNavItem',
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
.ca-secondary-nav-item {
  border-top: $border-light;
  background: $c-lightest-gray;
  a {
    padding: $px16;
    display: block;
  }
}
</style>
