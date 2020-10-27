<template>
  <div class="ca-cart-product" :class="modifiers">
    <div class="ca-cart-product__image-wrap">
      <NuxtLink class="ca-cart-product__image-link" :to="'/p/' + product.alias">
        <CaImage
          v-if="product.images !== null && product.images.length > 0"
          class="ca-cart-product__image"
          type="product"
          size="200f200"
          :alt="product.name"
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
        v-if="mode === 'default'"
        class="ca-cart-product__remove"
        icon-name="x"
        aria-label="Close"
        @clicked="updateCart(item.skuId, 0)"
      />

      <NuxtLink :to="'/p/' + product.alias">
        <CaBrandAndName
          :brand="product.brand.name"
          :name="product.name"
          name-tag="h3"
        />
        <CaPrice class="ca-cart-product__price" :price="product.unitPrice" />
        <!-- TODO: replace with variant info -->
        <p class="ca-cart-product__variant">{{ item.skuId }}</p>
      </NuxtLink>
      <div class="ca-cart-product__bottom">
        <CaProductQuantity
          v-if="mode === 'default'"
          :quantity="item.quantity"
          :max-quantity="10"
          @changed="onQuantityChange"
        />
        <div v-else class="ca-cart-product__static-quantity">
          {{ $t('QUANTITY') }}: {{ item.quantity }}
        </div>
        <div class="ca-cart-product__total">
          {{ $store.getters.getSellingPrice(item.totalPrice) }}
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
// A product displayed in the cart<br><br>
// **SASS-path:** _./styles/components/molecules/ca-cart-product.scss_
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
    item: {
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
    product() {
      return this.item.product;
    },
    modifiers() {
      return {
        'ca-cart-product--display': this.mode === 'display'
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Quantity change handler
    // @arg value (Number)
    onQuantityChange(value) {
      this.updateCart(this.item.skuId, value);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-cart-product';
</style>
