<template>
  <div class="ca-cart-product" :class="modifiers">
    <div class="ca-cart-product__image-wrap">
      <NuxtLink class="ca-cart-product__image-link" :to="'/p/' + product.alias">
        <CaImage
          v-if="product.images !== null && product.images.length > 0"
          class="ca-cart-product__image"
          type="product"
          :size-array="
            $config.imageSizes.product.filter(
              item => parseInt(item.descriptor) <= 180
            )
          "
          :alt="product.name"
          :filename="product.images[0]"
          :ratio="$config.productImageRatio"
          sizes="(min-width: 768px) 90px, 60px"
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
        <p v-if="skuValue" class="ca-cart-product__variant">{{ skuValue }}</p>
      </NuxtLink>
      <div class="ca-cart-product__bottom">
        <CaProductQuantity
          v-if="mode === 'default'"
          :quantity="item.quantity"
          :max-quantity="skuQuantity"
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
import MixUpdateCart from 'MixUpdateCart';
// @group Molecules
// @vuese
// A product displayed in the cart<br><br>
// **SASS-path:** _./styles/components/molecules/ca-cart-product.scss_
export default {
  name: 'CaCartProduct',
  mixins: [MixUpdateCart],
  props: {
    // The cart product item
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
    },
    skuValue() {
      return (
        this.product.skus.filter(i => i.skuId === this.item.skuId)[0].name || ''
      );
    },
    skuQuantity() {
      return (
        this.product.skus.filter(i => i.skuId === this.item.skuId)[0].stock
          .totalStock || 0
      );
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
