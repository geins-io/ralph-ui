<template>
  <div class="ca-mini-cart">
    <div class="ca-mini-cart__wrap">
      <CaIcon :name="cartIcon" class="ca-mini-cart__icon" />
      <CaNotificationBadge class="ca-minicart__qty" :number="cartQty" />
    </div>
    <div class="ca-mini-cart__value only-desktop">{{ cartValue }}</div>
  </div>
</template>
<script>
import { CaIcon, CaNotificationBadge } from '@ralph/ralph-ui';
// @group Molecules
// The cart displayed in the header
export default {
  name: 'CaMiniCart',
  components: { CaIcon, CaNotificationBadge },
  mixins: [],
  props: {
    // Name for the icon to be used. See documentation for [CaIcon](/components/CaIcon) to learn more.
    cartIcon: {
      type: String,
      default: 'shopping-bag'
    }
  },
  data: () => ({
    cartValue: '399 kr',
    cartQty: 2
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-mini-cart {
  margin-right: $px4;
  @include bp(laptop) {
    @include flex-valign;
  }
  &__wrap {
    position: relative;
  }
  &__icon {
    font-size: 24px;
  }
  &__value {
    font-weight: $font-weight-bold;
    margin-left: $px12;
  }
}
</style>
