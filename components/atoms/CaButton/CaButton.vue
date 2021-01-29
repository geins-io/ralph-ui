<template>
  <component
    :is="linkBaseElem"
    v-bind="linkElemAttributes"
    class="ca-button"
    :class="modifiers"
    :tabindex="disabled ? '-1' : '0'"
    @click="$emit('clicked')"
  >
    <!-- Button text / content -->
    <slot></slot>
    <CaSpinner class="ca-button__spinner" :loading="loading" />
  </component>
</template>
<script>
import MixLinkHandler from 'MixLinkHandler';

// @group Atoms
// A button for click events or links<br><br>
// **SASS-path:** _./styles/components/atoms/ca-button.scss_
export default {
  name: 'CaButton',
  mixins: [MixLinkHandler],
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
      default: 'default'
    },
    // Color of button
    color: {
      // 'primary', 'secondary'
      type: String,
      default: 'primary'
    },
    // Set button in loading state
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    noLinkElement: 'button'
  }),
  computed: {
    modifiers() {
      const baseClass = 'ca-button--';
      const modifiers = [];

      if (this.disabled) {
        modifiers.push(baseClass + 'disabled');
      }
      if (this.loading) {
        modifiers.push(baseClass + 'loading');
      }

      modifiers.push(baseClass + this.size);
      modifiers.push(baseClass + this.type);
      modifiers.push(baseClass + this.color);

      return modifiers;
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
