<template>
  <component
    :is="baseTag"
    class="ca-accordion-item"
    :class="{ 'ca-accordion-item--styled': styled }"
  >
    <CaClickable
      class="ca-accordion-item__toggle-wrap"
      @clicked="toggleClickHandler"
    >
      <slot name="toggle-content" :open="open">
        <div
          class="ca-accordion-item__toggle"
          :class="{ 'ca-accordion-item__toggle--open': open }"
        >
          <CaIconAndText
            class="ca-accordion-item__icon-wrap"
            :icon-name="currentIcon"
            icon-position="right"
            base-element="div"
          >
            <slot name="toggle-text" />
          </CaIconAndText>
        </div>
      </slot>
    </CaClickable>
    <SlideUpDown
      class="ca-accordion-item__content"
      tag="div"
      :active="open"
      :duration="200"
    >
      <slot />
    </SlideUpDown>
  </component>
</template>
<script>
import SlideUpDown from 'vue-slide-up-down';
// @group Molecules
// @vuese
// Toggle content by clicking parent<br><br>
// **SASS-path:** _./styles/components/molecules/ca-accordion-item.scss_
export default {
  name: 'CaAccordionItem',
  components: { SlideUpDown },
  mixins: [],
  props: {
    // Should it be open on page load?
    openOnInit: {
      type: Boolean,
      // `false`
      default: false,
    },
    // Html tag for wrapper
    baseTag: {
      type: String,
      default: 'div',
    },
    // Icon name for when accordion is open
    iconOpen: {
      type: String,
      default: 'minus',
    },
    // Icon name for when accordion is open
    iconClosed: {
      type: String,
      default: 'plus',
    },
    // Should it come with pre-defined style or none
    styled: {
      type: Boolean,
      // `true`
      default: true,
    },
  },
  data: () => ({
    open: false,
  }),
  computed: {
    currentIcon() {
      return this.open ? this.iconOpen : this.iconClosed;
    },
  },
  watch: {},
  mounted() {
    this.open = this.openOnInit;
  },
  methods: {
    // Click handler for toggle click
    toggleClickHandler() {
      this.open = !this.open;
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-accordion-item';
</style>
