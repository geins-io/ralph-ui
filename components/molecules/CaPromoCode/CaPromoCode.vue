<template>
  <div class="ca-promo-code">
    <div v-if="activePromoCode" class="ca-promo-code__active">
      <i18n path="PROMO_CODE_ACTIVE" tag="p">
        <span class="ca-promo-code__active-code">{{ activePromoCode }}</span>
        <button
          type="button"
          class="ca-promo-code__remove"
          @click="removePromoCode"
        >
          {{ $t('PROMO_CODE_REMOVE') }}
        </button>
      </i18n>
    </div>
    <CaAccordionItem class="ca-promo-code__accordion">
      <template #toggle-text>
        <div>{{ $t('PROMO_CODE_TITLE') }}</div>
      </template>
      <div class="ca-promo-code__content">
        <LazyCaFeedback
          ref="feedback"
          class="ca-promo-code__feedback"
          :type="currentFeedback.type"
          :message="currentFeedback.message"
        />
        <div class="ca-promo-code__form">
          <CaInputText
            v-model="code"
            class="ca-promo-code__input"
            :label="$t('PROMO_CODE_LABEL')"
            :valid="codeValid"
            :error-message="errorMessage"
            @keyup.enter="setPromoCode"
          />
          <CaButton
            class="ca-promo-code__button"
            :loading="loading"
            :type="$store.getters.viewport === 'phone' ? 'full-width' : ''"
            @clicked="setPromoCode"
          >
            {{ $t('PROMO_CODE_BUTTON') }}
          </CaButton>
        </div>
      </div>
    </CaAccordionItem>
  </div>
</template>
<script>
import promoCodeMutation from 'cart/promo-code.graphql';
import MixFetch from 'MixFetch';
import { mapState } from 'vuex';
// @group Molecules
// @vuese
// Promo code block used mainly in checkout<br><br>
// **SASS-path:** _./styles/components/molecules/ca-promo-code.scss_
export default {
  name: 'CaPromoCode',
  mixins: [MixFetch],
  props: {
    // The active promo code, if any
    activePromoCode: {
      type: String,
      required: true,
    },
  },
  data: (vm) => ({
    code: '',
    loading: false,
    codeValid: true,
    errorMessage: '',
    currentFeedback: {
      type: 'info',
      message: '',
    },
    feedback: {
      codeActivated: {
        type: 'success',
        message: vm.$t('PROMO_CODE_ACTIVATED'),
      },
      requirementsNotMet: {
        type: 'error',
        message: vm.$t('PROMO_CODE_ERROR_REQUIREMENTS'),
      },
      invalid: {
        type: 'error',
        message: vm.$t('PROMO_CODE_ERROR_INVALID'),
      },
    },
  }),
  computed: {
    ...mapState({
      checkoutMarket: (state) => state.channel.checkoutMarket,
    }),
  },
  watch: {
    code(newVal, oldVal) {
      if (newVal !== oldVal && !this.codeValid) {
        this.codeValid = true;
      }
    },
  },
  mounted() {},
  methods: {
    // @vuese
    // Set a promo code for the cart. Performs a graphql mutation
    async setPromoCode(e, remove = false) {
      this.loading = true;
      const variables = {
        id: this.$store.getters['cart/id'],
        promoCode: this.code,
        checkoutMarketId: this.checkoutMarket,
      };
      const callback = (result) => {
        this.loading = false;
        this.$store.dispatch('cart/update', result.data.setCartPromoCode);
        if (!remove) {
          this.currentFeedback = this.feedback.codeActivated;
          this.$refs.feedback.show();
        }
      };
      const callbackError = (errors) => {
        this.loading = false;
        this.codeValid = false;
        this.currentFeedback =
          errors[0].extensions?.code === 'RequirementsNotMet'
            ? this.feedback.requirementsNotMet
            : this.feedback.invalid;
        this.$refs.feedback.show();
      };

      await this.mutateData(
        promoCodeMutation,
        callback,
        variables,
        callbackError,
      );
    },
    // @vuese
    // Remove the set promo code
    removePromoCode() {
      this.$refs.feedback.hide();
      this.code = '';
      this.setPromoCode(null, true);
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-promo-code';
</style>
