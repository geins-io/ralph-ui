<template>
  <button class="ca-icon-button" @click="$emit('clicked')">
    <CaIcon :name="iconName" />
  </button>
</template>
<script>
import { CaIcon } from '@ralph/ralph-ui';
// @group Molecules
// A clickable icon
export default {
  name: 'CaIconButton',
  components: { CaIcon },
  mixins: [],
  props: {
    // The icon name. See documentation for [CaIcon](/components/CaIcon) to learn more.
    iconName: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-icon-button {
}
</style>
