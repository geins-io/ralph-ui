<template>
  <div class="ca-quick-add-product">
    <client-only v-if="useProductCard">
      <CaProductCard :product="product" />
    </client-only>
    <div v-else class="ca-quick-add-product__card">
      <div class="ca-quick-add-product__image-wrap">
        <NuxtLink
          class="ca-quick-add-product__image-link"
          :to="product.canonicalUrl"
        >
          <CaImage
            v-if="product.images !== null && product.images.length > 0"
            class="ca-quick-add-product__image"
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
      <div class="ca-quick-add-product__info">
        <NuxtLink class="ca-quick-add-product__link" :to="product.canonicalUrl">
          <CaBrandAndName
            class="ca-quick-add-product__brand-name"
            :brand="product.brand.name"
            :name="product.name"
            name-tag="h3"
          />
          <CaPrice
            class="ca-quick-add-product__price"
            :price="product.unitPrice"
          />
          <CaCampaigns
            v-if="product.discountCampaigns && product.discountCampaigns.length"
            class="ca-quick-add-product__campaigns"
            :campaigns="product.discountCampaigns"
          />
        </NuxtLink>
      </div>
    </div>
    <CaButton
      class="ca-quick-add-product__button"
      :loading="addToCartLoading"
      size="s"
      @clicked="add"
    >
      {{ skuId ? $t('ADD') : $t('READ_MORE') }}
    </CaButton>
  </div>
</template>
<script>
import MixAddToCart from 'MixAddToCart';
// @group Atoms
// @vuese
// A summary of a product with a buy button<br><br>
// **SASS-path:** _./styles/components/atoms/ca-quick-add-product.scss_
export default {
  name: 'CaQuickAddProduct',
  mixins: [MixAddToCart],
  props: {
    // The product data
    product: {
      type: Object,
      required: true
    },
    // Product card design option
    useProductCard: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {
    // @vuese
    // The current skuId if only one, otherwise empty string
    // @type String
    skuId() {
      return this.product.skus.length > 1 ? '' : this.product.skus[0].skuId;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Add to cart if skuId is present, otherwise go to product
    add() {
      if (this.skuId) {
        this.addToCartLoading = true;
        this.addToCart(this.skuId, 1, this.product);
      } else {
        this.$router.push(this.product.canonicalUrl);
      }
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-quick-add-product';
</style>
