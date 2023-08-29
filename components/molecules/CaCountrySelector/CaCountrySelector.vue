<template>
  <div class="ca-country-selector">
    <CaInputSelect
      v-model="selection"
      :options="data"
      :placeholder="$t('CHECKOUT_CHOOSE_COUNTRY')"
      class="ca-country-selector__input"
      @input="getSelected($event)"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex';
// @group Molecules
// @vuese
// A country selector for checkout<br><br>
// **SASS-path:** _./styles/components/molecules/ca-country-selector.scss_
export default {
  name: 'CaCountrySelector',
  props: {
    // Data for select options
    data: {
      type: Array,
      required: true,
    },
    // Is the Country selector used in checkout?
    inCheckout: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    selection: '',
  }),
  computed: {
    ...mapState({
      currentMarket: (state) => state.channel.currentMarket,
      checkoutMarket: (state) => state.channel.checkoutMarket,
    }),
  },
  watch: {
    currentMarket() {
      if (this.inCheckout) {
        return;
      }
      this.selection = this.currentMarket;
    },
    checkoutMarket() {
      if (!this.inCheckout) {
        return;
      }
      this.selection = this.checkoutMarket;
    },
  },
  mounted() {
    this.selection = this.inCheckout ? this.checkoutMarket : this.currentMarket;
  },
  methods: {
    getSelected(value) {
      this.selection = value;
      this.$emit('input', value);
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-country-selector';
</style>
