<template>
  <button
    class="ca-icon-button"
    :aria-label="ariaLabel"
    @click="$emit('clicked')"
  >
    <CaIcon :name="iconName" />
  </button>
</template>
<script>
import CaIcon from '../../atoms/CaIcon/CaIcon.vue';
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
    },
    // Required to add aria label for the button since it has no text content
    ariaLabel: {
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
