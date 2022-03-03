<template>
  <div class="ca-customer-type-toggle">
    <div
      v-if="!$store.getters['auth/authenticated']"
      class="ca-customer-type-toggle__toggles"
    >
      <CaClickable
        v-for="(type, index) in $config.customerTypes"
        :key="index"
        class="ca-customer-type-toggle__link"
        :class="getActiveClass(type.type)"
        @clicked="setCustomerType(type.type)"
      >
        {{ getLabel(type.type) }}
      </CaClickable>
    </div>
    <div v-else class="ca-customer-type-toggle__authenticated">
      Inloggad som: {{ getLabel(currentType.type) }} ({{
        getVatDisplay(currentType.vat)
      }})
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Used to toggle globally what customer type should be current (showing prices with or without VAT)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-customer-type-toggle.scss_
export default {
  name: 'CaCustomerTypeToggle',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    currentType() {
      return this.$config.customerTypes.find(
        i => i.type === this.$store.state.customerType
      );
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Set customer type in state
    // @arg String
    setCustomerType(typeName) {
      this.$store.dispatch('changeCustomerType', typeName);
    },
    // @vuese
    // Get active class for toggle
    // @arg String
    getActiveClass(typeName) {
      return this.$store.state.customerType === typeName
        ? 'ca-customer-type-toggle__link--active'
        : '';
    },
    // @vuese
    // Get label for toggle
    // @arg String
    getLabel(typeName) {
      const langString = 'CUSTOMER_TYPE_' + typeName;
      return this.$t(langString);
    },
    // @vuese
    // Get label for toggle
    // @arg Boolean
    getVatDisplay(vat) {
      return vat ? this.$t('INC_VAT') : this.$t('EX_VAT');
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-customer-type-toggle';
</style>
