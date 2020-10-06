<template>
  <li class="ca-secondary-nav-item">
    <!-- Add link here -->
    <slot></slot>
  </li>
</template>
<script>
// @group Atoms
// @vuese
// Navigation item wrapper of secondary navigation link<br><br>
// **SASS-path:** _./styles/components/atoms/ca-secondary-nav-item.scss_
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
@import 'atoms/ca-secondary-nav-item';
</style>
