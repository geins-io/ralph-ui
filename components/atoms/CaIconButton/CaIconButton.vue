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
// @group Atoms
// A clickable icon<br><br>
// **SASS-path:** _./styles/components/atoms/ca-icon-button.scss_
export default {
  name: 'CaIconButton',
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
      } else return { type: 'button' };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-icon-button';
</style>
