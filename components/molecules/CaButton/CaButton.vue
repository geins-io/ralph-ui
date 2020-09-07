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
// @group Molecules
// A button for click events or links
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
.ca-button {
  display: inline-block;
  background: $c-button-main-bg;
  color: $c-button-main-txt;
  font-size: $font-size-s;
  font-weight: $font-weight-bold;
  text-transform: uppercase;
  padding: 1em 2.4em;
  white-space: nowrap;
  position: relative;
  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -10px;
  }
  &--small {
    padding: 0.3em 0.65em;
  }
  &--full-width {
    width: 100%;
    padding-left: 0.7em;
    padding-right: 0.7em;
    text-align: center;
  }
  &--disabled {
    opacity: 0.7;
    pointer-events: none;
  }
  &--secondary {
    background: $c-button-secondary-bg;
    color: $c-button-secondary-txt;
    border: $c-button-secondary-border;
  }
  &--loading {
    color: transparent;
  }
}
</style>
