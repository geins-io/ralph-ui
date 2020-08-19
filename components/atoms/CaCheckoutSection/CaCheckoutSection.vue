<template>
  <div class="ca-checkout-section">
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
// Used to wrap a section on the checkout page. Used for both the cart and the different steps of the checkout
export default {
  name: 'CaCheckoutSection',
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-checkout-section {
  $block: &;
  margin-top: $px32;
  &__title {
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
    line-height: 2;
    margin-bottom: $px4;
    text-align: center;
    margin-top: $px32;
    @include bp(laptop) {
      font-size: $font-size-l;
      margin-bottom: $px12;
    }
  }
  &__content {
    background: $c-white;
    padding: $px20 $px12;
    position: relative;

    @include bp(tablet) {
      padding: $px32;
    }
  }
  &:not(:last-child) #{$block}__content:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    border-top: 18px solid $c-white;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
  }
}
</style>
