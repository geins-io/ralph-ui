<template>
  <span class="ca-icon-and-text" :class="positionClass">
    <CaIcon class="ca-icon-and-text__icon" :name="iconName" />
    <span class="ca-icon-and-text__text">
      <slot></slot>
    </span>
  </span>
</template>
<script>
import { CaIcon } from '@ralph/ralph-ui';

// @group Molecules
// Used to place a text together with an icon
export default {
  name: 'CaIconAndText',
  components: { CaIcon },
  mixins: [],
  props: {
    // The icon name. See documentation for [CaIcon](/components/CaIcon) to learn more.
    iconName: {
      type: String,
      required: true
    },
    // The position of the icon
    iconPosition: {
      // 'left', 'right', 'top'
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right', 'top'].includes(value);
      }
    }
  },
  data: () => ({}),
  computed: {
    positionClass() {
      return 'ca-icon-and-text--' + this.iconPosition;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
$icon-spacing: 0.4em !default;
.ca-icon-and-text {
  display: inline-flex;
  align-items: center;
  &--left {
    .ca-icon-and-text__text {
      margin-left: $icon-spacing;
    }
  }
  &--right {
    flex-direction: row-reverse;
    .ca-icon-and-text__text {
      margin-right: $icon-spacing;
    }
  }
  &--top {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
