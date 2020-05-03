<template>
  <component
    :is="baseTag"
    v-bind="attributes"
    class="ca-button"
    :class="modifiers"
    @click="$emit('clicked')"
  >
    <slot></slot>
  </component>
</template>
<script>
// @group Molecules
// @vuese
export default {
  name: 'CaButton',
  components: {},
  mixins: [],
  props: {
    href: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    baseTag() {
      return this.href === '' ? 'button' : 'a';
    },
    attributes() {
      return this.href !== ''
        ? {
            href: this.href
          }
        : '';
    },
    modifiers() {
      return {
        'ca-button--disabled': this.disabled
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
}
</style>
