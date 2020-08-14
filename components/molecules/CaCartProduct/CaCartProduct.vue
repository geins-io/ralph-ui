<template>
  <div class="ca-cart-product">
    <div class="ca-cart-product__image-wrap">
      <NuxtLink class="ca-cart-product__image-link" :to="'/p/' + product.alias">
        <CaImage
          v-if="product.images !== null && product.images.length > 0"
          class="ca-cart-product__image"
          type="product"
          size="90f90"
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
      <NuxtLink :to="'/p/' + product.alias">
        <CaBrandAndName
          :brand="product.brandName"
          :name="product.name"
          name-tag="h3"
        />
        <CaPrice class="ca-cart-product__price" :price="product.price" />
      </NuxtLink>
    </div>
  </div>
</template>
<script>
import CaImage from 'CaImage';
import CaBrandAndName from 'CaBrandAndName';
import CaPrice from 'CaPrice';
// @group Molecules
// @vuese
export default {
  name: 'CaCartProduct',
  components: { CaImage, CaBrandAndName, CaPrice },
  mixins: [],
  props: {
    product: {
      type: Object,
      required: true
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
.ca-cart-product {
}
</style>
