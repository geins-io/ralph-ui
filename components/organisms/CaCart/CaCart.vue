<template>
  <div v-if="cartItems.length" class="ca-cart">
    <CaCartProduct
      v-for="(product, index) in cartItems"
      :key="index"
      class="ca-cart__product"
      :product="product"
      :mode="mode"
    />
    <CaCartTotal class="ca-cart__total" :cart-total="cart.total" />
  </div>
  <div v-else class="ca-cart ca-cart--empty">
    {{ $t('CART_EMPTY') }}
  </div>
</template>
<script>
import CaCartProduct from 'CaCartProduct';
import CaCartTotal from 'CaCartTotal';
// @group Organisms
// @vuese
// Displaying the products in the cart, discount code field and cart summary<br><br>
// **SASS-path:** _./styles/components/organisms/ca-cart.scss_
export default {
  name: 'CaCart',
  components: { CaCartProduct, CaCartTotal },
  mixins: [],
  props: {
    // Cart data object
    cart: {
      type: Object,
      required: true
    },
    // Set to display mode to show a non interactable cart
    mode: {
      // 'default', 'display'
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'display'].includes(value);
      }
    }
  },
  data: () => ({}),
  computed: {
    cartItems() {
      return this.cart.items ? this.cart.items : [];
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'organisms/ca-cart';
</style>
