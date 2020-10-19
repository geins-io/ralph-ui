<template>
  <div class="ca-checkout-section" :class="modifiers">
    <h2 class="ca-checkout-section__title">
      <!-- The checkout sections title -->
      <slot name="title"></slot>
    </h2>
    <div class="ca-checkout-section__content">
      <!-- Content of the section -->
      <slot></slot>
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
  components: {},
  mixins: [],
  props: {
    // Shows an arrow at the bottom of the box
    bottomArrow: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-checkout-section--arrow': this.bottomArrow
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
