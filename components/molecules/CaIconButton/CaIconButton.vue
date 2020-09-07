<template>
  <component
    :is="baseTag"
    v-bind="attributes"
    class="ca-icon-button"
    :aria-label="ariaLabel"
    :disabled="disabled"
    @click="$emit('clicked')"
  >
    <CaIcon :name="iconName" />
  </component>
</template>
<script>
import CaIcon from 'CaIcon';
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
    },
    // Used to disable button
    disabled: {
      type: Boolean,
      default: false
    },
    // Set this to link button somewhere
    href: {
      type: String,
      // ''
      default: ''
    }
  },
  data: () => ({}),
  computed: {
    hasLink() {
      return this.href !== '';
    },
    baseTag() {
      if (this.hasLink) {
        return this.href.includes('http') ? 'a' : 'NuxtLink';
      } else return 'button';
    },
    attributes() {
      if (this.hasLink) {
        return this.href.includes('http')
          ? { href: this.href, target: '_blank', rel: 'noopener' }
          : { to: this.href };
      } else return '';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-icon-button {
}
</style>
