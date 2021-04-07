<template>
  <div class="ca-checkout-section" :class="modifiers">
    <h2 v-if="$slots.title" class="ca-checkout-section__title">
      <!-- The checkout sections title -->
      <slot name="title"></slot>
    </h2>
    <div class="ca-checkout-section__content">
      <!-- Content of the section -->
      <slot></slot>
      <transition name="fade">
        <div v-if="loading" class="ca-checkout-section__loading">
          <CaSpinner class="ca-checkout-section__spinner" :loading="true" />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Used to wrap a section on the checkout page. Used for both the cart and the different steps of the checkout<br><br>
// **SASS-path:** _./styles/components/atoms/ca-checkout-section.scss_
export default {
  name: 'CaCheckoutSection',
  mixins: [],
  props: {
    // Shows an arrow at the bottom of the box
    bottomArrow: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-checkout-section--arrow': this.bottomArrow,
        'ca-checkout-section--loading': this.loading
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-checkout-section';
</style>
