<template>
  <div class="ca-checkout">
    <CaCheckoutHeader :title="$t('CHECKOUT')" />
    <CaCheckoutSection>
      <template v-slot:title>
        Kundvagn ({{ $store.state.cart.items.length }})
      </template>
      <CaCart />
    </CaCheckoutSection>
    <CaCheckoutSection>
      <template v-slot:title>
        Slutför köp
      </template>
      <CaCheckoutKlarna />
    </CaCheckoutSection>
  </div>
</template>
<script>
import CaCheckoutHeader from 'CaCheckoutHeader';
import CaCheckoutSection from 'CaCheckoutSection';
import CaCart from 'CaCart';
import CaCheckoutKlarna from 'CaCheckoutKlarna';
// @group Organisms
// @vuese
export default {
  name: 'CaCheckout',
  components: { CaCheckoutHeader, CaCheckoutSection, CaCart, CaCheckoutKlarna },
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
.ca-checkout {
  max-width: $checkout-width;
  margin: 0 auto;
  padding-bottom: $px32;
}
</style>
