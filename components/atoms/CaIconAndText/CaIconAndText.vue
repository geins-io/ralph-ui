<template>
  <component :is="baseElement" class="ca-icon-and-text" :class="positionClass">
    <CaIcon class="ca-icon-and-text__icon" :name="iconName" />
    <component :is="baseElement" class="ca-icon-and-text__text">
      <!-- Text content -->
      <slot />
    </component>
  </component>
</template>
<script>
// @group Atoms
// @vuese
// Used to place a text together with an icon<br><br>
// **SASS-path:** _./styles/components/atoms/ca-icon-and-text.scss_
export default {
  name: 'CaIconAndText',
  mixins: [],
  props: {
    // The icon name. See documentation for [CaIcon](/components/CaIcon) to learn more.
    iconName: {
      type: String,
      required: true,
    },
    // The position of the icon
    iconPosition: {
      // 'left', 'right', 'top'
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right', 'top'].includes(value);
      },
    },
    // The element it should be rendered as
    baseElement: {
      type: String,
      default: 'span',
    },
  },
  data: () => ({}),
  computed: {
    positionClass() {
      return 'ca-icon-and-text--' + this.iconPosition;
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-icon-and-text';
</style>
