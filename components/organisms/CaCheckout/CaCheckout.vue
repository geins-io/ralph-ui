<template>
  <div class="ca-checkout">
    <CaCheckoutHeader :title="$t('CHECKOUT')" />
    <CaCart />
    <CaCheckoutKlarna />
  </div>
</template>
<script>
import CaCheckoutHeader from 'CaCheckoutHeader';
import CaCart from 'CaCart';
import CaCheckoutKlarna from 'CaCheckoutKlarna';
// @group Organisms
// @vuese
export default {
  name: 'CaCheckout',
  components: { CaCheckoutHeader, CaCart, CaCheckoutKlarna },
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
}
</style>
