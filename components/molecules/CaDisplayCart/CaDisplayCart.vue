<template>
  <LazyCaContentPanel
    class="ca-display-cart"
    name="cart"
    :title="$t('CART') + ' (' + cartItems.length + ')'"
  >
    <div
      v-if="cart && cartItems && cartItems.length"
      class="ca-display-cart__products"
    >
      <div v-for="(item, index) in cartItems" :key="index">
        <CaCartProduct
          class="ca-display-cart__product"
          :item="!item.productPackage ? item : item.productPackage"
          :package-group-key="item.productPackage ? item.groupKey : ''"
        />
      </div>
    </div>
    <div v-else class="ca-display-cart__empty">
      {{ $t('CART_EMPTY') }}
    </div>
    <template v-if="cart && cart.data.items && cart.data.items.length" #footer>
      <div class="ca-display-cart__footer">
        <CaCartSummary
          class="ca-display-cart__summary"
          :summary="cart.data.summary"
          :simple="true"
        />
        <CaButton type="full-width" size="l" href="checkout">
          <CaIconAndText
            v-if="buttonIcon"
            :icon-name="buttonIcon"
            icon-position="right"
          >
            {{ $t('CART_TO_CHECKOUT') }}
          </CaIconAndText>
          <template v-else>
            {{ $t('CART_TO_CHECKOUT') }}
          </template>
        </CaButton>
      </div>
    </template>
  </LazyCaContentPanel>
</template>
<script>
import { mapState } from 'vuex';
// @group Molecules
// @vuese
// The cart panel. Displays the current cart content in a content panel<br><br>
// **SASS-path:** _./styles/components/molecules/ca-display-cart.scss_
export default {
  name: 'CaDisplayCart',
  props: {
    buttonIcon: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    hasItems() {
      return this.cart && this.cart.data.items && this.cart.data.items.length;
    },
    hasAnyProductPackage() {
      return this.cart?.productPackages?.length;
    },
    // Returns an array of items to display in the cart
    // Group items with the same packageId into one item
    cartItems() {
      const items = [];

      if (!this.hasItems) {
        return items;
      }

      if (!this.hasAnyProductPackage) {
        return this.cart.data.items;
      }

      this.cart.data.items.forEach(item => {
        if (!item?.productPackage) {
          items.push(item);
          return false;
        }

        // Find the package in items
        const pkg = items.find(
          pkg => pkg.packageId === item.productPackage.packageId
        );

        // If the package already exists, do nothing
        if (pkg) {
          return false;
        }

        // If the package doesn't exist, add it
        const productPackage = this.getProductPackageAsCartItem(
          item?.productPackage?.packageId
        );

        items.push({
          packageId: item.productPackage.packageId,
          groupKey: item.groupKey,
          productPackage
        });
      });

      return items;
    },
    packagesInCart() {
      return this.cart?.productPackages || [];
    }
  },
  methods: {
    // Find the corresponding package in packagesInCart by matching productId and
    // return an object with brand, image, url & price
    getProductPackageAsCartItem(packageId) {
      const productPackage = this.packagesInCart.find(
        item => item.product.productId === packageId
      );

      if (!productPackage) {
        return {};
      }

      return productPackage;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-display-cart';
</style>
