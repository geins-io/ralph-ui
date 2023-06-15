<template>
  <div class="ca-cart-product" :class="modifiers">
    <div class="ca-cart-product__image-wrap">
      <NuxtLink class="ca-cart-product__image-link" :to="product.canonicalUrl">
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
        @clicked="removeItem"
      />
      <NuxtLink :to="product.canonicalUrl">
        <CaBrandAndName
          :brand="product.brand.name"
          :name="product.name"
          name-tag="h3"
        />
        <p
          v-if="skuValue && !$config.cart.hiddenSkuValues.includes(skuValue)"
          class="ca-cart-product__variant"
        >
          {{ skuValue }}
        </p>
        <ul
          v-if="
            item.campaign &&
              item.campaign.prices &&
              item.campaign.prices.length > 1
          "
          class="ca-cart-product__price-group"
        >
          <li
            v-for="(price, index) in item.campaign.prices"
            :key="index"
            class="ca-cart-product__price-group-item"
          >
            <span class="ca-cart-product__price-group-quantity">
              {{ price.quantity }} x
            </span>
            <span class="ca-cart-product__price-group-spacer" />
            <CaPrice
              class="ca-cart-product__price-group-price"
              :price="price.price"
            />
          </li>
        </ul>
        <CaPrice
          v-else
          class="ca-cart-product__price"
          :price="item.unitPrice"
        />
        <CaProductPackageSelectedOptionsList
          v-if="
            productPackage &&
              productPackageSelectedOptions &&
              productPackageSelectedOptions.length
          "
          class="ca-product-page__product-package-selected-options-list"
          :options="productPackageSelectedOptions"
        />
        <CaCampaigns
          v-if="
            item.campaign &&
              item.campaign.appliedCampaigns &&
              item.campaign.appliedCampaigns.length
          "
          class="ca-cart-product__campaigns"
          :campaigns="item.campaign.appliedCampaigns"
        />
        <CaStockDisplay
          v-if="mode === 'default'"
          class="ca-cart-product__stock-display"
          :stock="currentStock"
          :product-quantity="quantity"
          :show-delivery-time="true"
        />
      </NuxtLink>
      <div class="ca-cart-product__bottom">
        <CaProductQuantity
          v-if="mode === 'default'"
          :quantity="item.quantity"
          :max-quantity="skuStock.totalStock"
          :type="$config.cart.quantityChangerType"
          @changed="onQuantityChange"
        />
        <div v-else class="ca-cart-product__static-quantity">
          {{ $t('QUANTITY') }}: {{ item.quantity }}
        </div>
        <div v-if="item.totalPrice" class="ca-cart-product__total">
          {{ $store.getters.getSellingPrice(item.totalPrice) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MixUpdateCart from 'MixUpdateCart';
import MixStockHandler from 'MixStockHandler';
// @group Molecules
// @vuese
// A product displayed in the cart<br><br>
// **SASS-path:** _./styles/components/molecules/ca-cart-product.scss_
export default {
  name: 'CaCartProduct',
  mixins: [MixUpdateCart, MixStockHandler],
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
    },
    // Group key for product packages
    packageGroupKey: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    quantity: 1
  }),
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
    skuStock() {
      return (
        this.product.skus.filter(i => i.skuId === this.item.skuId)[0].stock ||
        this.defaultStock
      );
    },
    currentStock() {
      return this.skuStock;
    },
    updateId() {
      return this.item.skuId;
    },
    productPackage() {
      return this.item.product?.productPackage;
    },
    productPackageGroups() {
      return this.productPackage?.groups;
    },
    // Array of selected options based on the product package groups
    productPackageSelectedOptions() {
      const items = [];

      if (!this.productPackageGroups) {
        return items;
      }

      this.productPackageGroups.forEach(group => {
        group.options.forEach(option => {
          if (option.isSelected) {
            items.push({
              quantity: option.quantity,
              product: option.product
            });
          }
        });
      });
      return items;
    }
  },
  watch: {
    stockStatus(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.emitStockStatus();
      }
    }
  },
  mounted() {
    this.quantity = this.item.quantity;
    this.emitStockStatus();
  },
  methods: {
    // @vuese
    // Quantity change handler
    // @arg value (Number)
    onQuantityChange(value) {
      this.quantity = value;
      this.updateCart(this.updateId, value);
    },
    // @vuese
    // Emitting stock status change
    emitStockStatus() {
      this.$emit('stock-status-change', {
        skuId: this.item.skuId,
        stockStatus: this.stockStatus
      });
    },
    // @vuese
    // Removing item and emitting "remove"
    removeItem() {
      this.$emit('remove', this.item.skuId);
      this.updateCart(this.updateId, 0);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-cart-product';
</style>
