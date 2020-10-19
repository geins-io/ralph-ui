<template>
  <component
    :is="baseTag"
    v-bind="attributes"
    class="ca-button"
    :class="modifiers"
    @click="$emit('clicked')"
  >
    <!-- Button text / content -->
    <slot></slot>
    <CaSpinner class="ca-button__spinner" :loading="loading" />
  </component>
</template>
<script>
import CaSpinner from 'CaSpinner';
// @group Atoms
// A button for click events or links<br><br>
// **SASS-path:** _./styles/components/atoms/ca-button.scss_
export default {
  name: 'CaButton',
  components: { CaSpinner },
  mixins: [],
  props: {
    // Set this to link button somewhere
    href: {
      type: String,
      // ''
      default: ''
    },
    // Use to disable button
    disabled: {
      type: Boolean,
      // `false`
      default: false
    },
    // The size of the button
    size: {
      // 's', 'm', 'l'
      type: String,
      default: 'm',
      validator(value) {
        return ['s', 'm', 'l'].includes(value);
      }
    },
    // Type of button
    type: {
      // 'default', 'full-width'
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'full-width'].includes(value);
      }
    },
    // Color of button
    color: {
      // 'default', 'secondary'
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'secondary'].includes(value);
      }
    },
    // Set button in loading state
    loading: {
      type: Boolean,
      default: false
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
    },
    modifiers() {
      return {
        'ca-button--disabled': this.disabled,
        'ca-button--small': this.size === 's',
        'ca-button--full-width': this.type === 'full-width',
        'ca-button--secondary': this.color === 'secondary',
        'ca-button--loading': this.loading
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-button';
</style>
