<template>
  <component :is="baseTag" class="ca-accordion-item">
    <button class="ca-accordion-item__toggle" @click="toggleClickHandler">
      <CaIconAndText
        class="ca-accordion-item__icon-wrap"
        :icon-name="currentIcon"
        icon-position="right"
      >
        <slot name="toggle"></slot>
      </CaIconAndText>
    </button>
    <transition name="slide">
      <div v-if="open" class="ca-accordion-item__content">
        <slot></slot>
      </div>
    </transition>
  </component>
</template>
<script>
import CaIconAndText from 'CaIconAndText';
// @group Atoms
// @vuese
// Toggle content by clicking parent
export default {
  name: 'CaAccordionItem',
  components: { CaIconAndText },
  mixins: [],
  props: {
    // Should it be open on page load?
    openOnInit: {
      type: Boolean,
      // `false`
      default: false
    },
    // Html tag for wrapper
    baseTag: {
      type: String,
      default: 'div'
    },
    // Icon name for when accordion is open
    iconOpen: {
      type: String,
      default: 'minus'
    },
    // Icon name for when accordion is open
    iconClosed: {
      type: String,
      default: 'plus'
    }
  },
  data: () => ({
    open: false
  }),
  computed: {
    currentIcon() {
      return this.open ? this.iconOpen : this.iconClosed;
    }
  },
  watch: {},
  mounted() {
    this.open = this.openOnInit;
  },
  methods: {
    // Click handler for toggle click
    toggleClickHandler() {
      this.open = !this.open;
    }
  }
};
</script>
<style lang="scss">
.ca-accordion-item {
  border-bottom: $border-light;
  &__toggle {
    outline: none;
    width: 100%;
    padding: $px16;
    display: block;
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
  }
  &__icon-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ca-icon {
      font-size: 20px;
    }
  }
  &__content {
    max-height: 2000px;
    overflow: hidden;
  }
}
</style>
