<template>
  <NuxtLink to="/checkout" class="ca-mini-cart">
    <div class="ca-mini-cart__wrap">
      <CaIcon :name="cartIcon" class="ca-mini-cart__icon" />
      <CaNotificationBadge
        v-if="$store.getters.cartSum > 0"
        class="ca-minicart__qty"
        :number="$store.getters.cartSum"
      />
    </div>
    <div
      v-if="$store.getters.cartSum > 0"
      class="ca-mini-cart__value only-desktop"
    >
      {{ formatCurrency($store.getters.cartTotal) }}
    </div>
  </NuxtLink>
</template>
<script>
import CaIcon from 'CaIcon';
import CaNotificationBadge from 'CaNotificationBadge';
import MixNumberFormat from 'MixNumberFormat';

// @group Molecules
// The cart displayed in the header
export default {
  name: 'CaMiniCart',
  components: { CaIcon, CaNotificationBadge },
  mixins: [MixNumberFormat],
  props: {
    // Name for the icon to be used. See documentation for [CaIcon](/components/CaIcon) to learn more.
    cartIcon: {
      type: String,
      default: 'shopping-bag'
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-mini-cart {
  margin-right: $px4;
  display: block;
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
