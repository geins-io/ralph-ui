<template>
  <a
    class="ca-clickable"
    role="button"
    v-bind="$attrs"
    @click.prevent="
      (e) => {
        $emit('clicked', e);
      }
    "
  >
    <slot />
  </a>
</template>
<script>
// @group Atoms
// @vuese
// Use this to make a clickable area<br><br>
// **SASS-path:** _./styles/components/atoms/ca-clickable.scss_
export default {
  name: 'CaClickable',
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
@import 'atoms/ca-clickable';
</style>
