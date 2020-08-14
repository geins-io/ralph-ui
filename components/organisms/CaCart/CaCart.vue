<template>
  <div class="ca-cart">
    <CaCartProduct
      v-for="(product, index) in cartItems"
      :key="index"
      :product="product"
    />
  </div>
</template>
<script>
import CaCartProduct from 'CaCartProduct';
// @group Organisms
// @vuese
export default {
  name: 'CaCart',
  components: { CaCartProduct },
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    cartItems() {
      return this.$store.state.cart.items ? this.$store.state.cart.items : [];
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-cart {
}
</style>
