<template>
  <div class="ca-checkout-section" :class="modifiers">
    <h2 v-if="$slots.title" class="ca-checkout-section__title">
      <!-- The checkout sections title -->
      <slot name="title" />
    </h2>
    <div class="ca-checkout-section__content">
      <!-- Content of the section -->
      <slot />
      <transition name="fade">
        <div v-if="loading" class="ca-checkout-section__loading">
          <CaSpinner class="ca-checkout-section__spinner" :loading="true" />
        </div>
      </transition>
      <transition name="fade">
        <div v-if="blocked && !loading" class="ca-checkout-section__guard">
          <div class="ca-checkout-section__guard-info">
            <CaIcon class="ca-checkout-section__guard-icon" name="info" />
            <div class="ca-checkout-section__guard-text">
              <!-- The checkout sections guard text, shown when blocked -->
              <slot name="guard" />
            </div>
          </div>
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
      default: true,
    },
    // Is the section loading?
    loading: {
      type: Boolean,
      default: false,
    },
    // Block this section
    blocked: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-checkout-section--arrow': this.bottomArrow,
        'ca-checkout-section--loading': this.loading,
      };
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-checkout-section';
</style>
