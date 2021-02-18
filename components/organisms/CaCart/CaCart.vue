<template>
  <div v-if="cartItemsMod.length" class="ca-cart">
    <CaCartProduct
      v-for="(item, index) in cartItemsMod"
      :key="index"
      class="ca-cart__product"
      :item="item"
      :mode="mode"
    />
    <CaPromoCode
      v-if="mode !== 'display'"
      class="ca-cart__promo-code"
      :active-promo-code="cart.promoCode ? cart.promoCode : ''"
    />
    <CaCartTotal class="ca-cart__total" :cart-total="cart.total" />
  </div>
  <div v-else class="ca-cart ca-cart--empty">
    {{ $t('CART_EMPTY') }}
  </div>
</template>
<script>
// @group Organisms
// @vuese
// Displaying the products in the cart, discount code field and cart summary<br><br>
// **SASS-path:** _./styles/components/organisms/ca-cart.scss_
export default {
  name: 'CaCart',
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
    },
    cartItemsMod() {
      function getOccurrence(array, value) {
        let count = 0;
        array.forEach(v => v === value && count++);
        return count;
      }
      const newArray = this.cart.items.map(item => {
        return item.skuId;
      });
      let skuid = '';
      const idsWithDuplicates = newArray.filter(item => {
        if (getOccurrence(newArray, item) > 1) {
          return item;
        }
      });
      console.log(idsWithDuplicates);

      let indexxxx = 0;
      const indexOfCopies = [];
      this.cart.items.forEach((i, index) => {
        if (i.skuId === skuid) {
          indexOfCopies.push({
            original: indexxxx,
            copy: index
          });
        }
        skuid = i.skuId;
        indexxxx = index;
      });
      console.log(indexOfCopies);

      return this.cartItems;
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
