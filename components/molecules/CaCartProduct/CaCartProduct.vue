<template>
  <div class="ca-cart-product">
    <div class="ca-cart-product__image-wrap">
      <NuxtLink class="ca-cart-product__image-link" :to="'/p/' + product.alias">
        <CaImage
          v-if="product.images !== null && product.images.length > 0"
          class="ca-cart-product__image"
          type="product"
          size="200f200"
          :filename="product.images[0]"
          :placeholder="
            require('~/assets/placeholders/product-image-square.png')
          "
        />
        <img
          v-else
          class="ca-cart-product__image"
          :src="require('~/assets/placeholders/product-image-square.png')"
        />
      </NuxtLink>
    </div>
    <div class="ca-cart-product__info">
      <CaIconButton
        class="ca-cart-product__remove"
        icon-name="x"
        aria-label="Close"
        @clicked="updateCart(product.alias, 0)"
      />

      <NuxtLink :to="'/p/' + product.alias">
        <CaBrandAndName
          :brand="product.brandName"
          :name="product.name"
          name-tag="h3"
        />
        <CaPrice class="ca-cart-product__price" :price="product.price" />
      </NuxtLink>
      <div class="ca-cart-product__bottom">
        <CaProductQuantity
          :quantity="product.quantity"
          :max-quantity="10"
          @changed="onQuantityChange"
        />
        <div class="ca-cart-product__total">
          {{ totalSellingPrice }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CaImage from 'CaImage';
import CaBrandAndName from 'CaBrandAndName';
import CaPrice from 'CaPrice';
import CaIconButton from 'CaIconButton';
import CaProductQuantity from 'CaProductQuantity';
import MixUpdateCart from 'MixUpdateCart';
// @group Molecules
// @vuese
// A product displayed in the cart
export default {
  name: 'CaCartProduct',
  components: {
    CaImage,
    CaBrandAndName,
    CaPrice,
    CaIconButton,
    CaProductQuantity
  },
  mixins: [MixUpdateCart],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    totalSellingPrice() {
      return this.$store.state.VATincluded
        ? this.product.total.sellingPriceIncVatFormatted
        : this.product.total.sellingPriceExVatFormatted;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Quantity change handler
    // @arg value (Number)
    onQuantityChange(value) {
      this.updateCart(this.product.alias, value);
    }
  }
};
</script>
<style lang="scss">
.ca-cart-product {
  display: flex;

  &__image {
    max-width: 60px;
    margin-right: $px12;
    @include bp(tablet) {
      max-width: 90px;
    }
  }
  &__price {
    margin-top: 5px;
  }

  &__info {
    position: relative;
    flex: 1;
  }

  &__remove {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: $px12;
  }
  &__total {
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
  }
}
</style>
