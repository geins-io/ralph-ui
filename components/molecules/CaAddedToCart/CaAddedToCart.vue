<template>
  <div
    class="ca-added-to-cart"
    :class="{ 'ca-added-to-cart--scrolled': !$store.getters.siteIsAtTop }"
  >
    <CaOverlay
      class="ca-added-to-cart__overlay"
      :visible="visible"
      @clicked="close"
    />
    <CaContainer class="ca-added-to-cart__container">
      <div
        class="ca-added-to-cart__box"
        :class="{ 'ca-added-to-cart__box--visible': visible }"
      >
        <div class="ca-added-to-cart__header">
          <div class="ca-added-to-cart__title">
            {{ $tc('CART_ITEM_ADDED', quantity) }}
          </div>
          <CaIconButton
            class="ca-added-to-cart__close"
            icon-name="x"
            :aria-label="$t('CLOSE')"
            @clicked="close"
          />
        </div>
        <div class="ca-added-to-cart__body">
          <transition name="fade">
            <CaCartProduct
              v-if="visible"
              class="ca-added-to-cart__product"
              :item="cart.added"
              mode="display"
            />
          </transition>
          <div @click="close">
            <CaButton type="full-width" size="m" href="checkout">
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
        </div>
      </div>
    </CaContainer>
  </div>
</template>
<script>
import { mapState } from 'vuex';
// @group Molecules
// @vuese
// Added to cart notification<br><br>
// **SASS-path:** _./styles/components/molecules/ca-added-to-cart.scss_
export default {
  name: 'CaAddedToCart',
  mixins: [],
  props: {
    buttonIcon: {
      type: String,
      default: '',
    },
  },
  data: () => ({}),
  computed: {
    // @vuese
    // Is the notification visible
    // @type Boolean
    visible() {
      return this.cart.added !== null;
    },
    // @vuese
    // How many was added?
    // @type Number
    quantity() {
      return this.visible ? this.cart.added.quantity : 1;
    },
    ...mapState(['cart']),
  },
  watch: {},
  mounted() {
    this.$ralphBus.$on('route-change', this.close);
  },
  methods: {
    // @vuese
    // Close the notification
    close() {
      this.$store.dispatch('cart/removeAddedNotification');
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-added-to-cart';
</style>
