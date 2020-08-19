<template>
  <div class="ca-vat-toggle">
    <a
      class="ca-vat-toggle__link"
      :class="{ 'ca-vat-toggle__link--active': vatIncluded }"
      href="javascript:;"
      @click="setVATIncluded(true)"
      >{{ $t('VAT_TOGGLE_LABEL_INC') }}</a
    >
    <a
      class="ca-vat-toggle__link"
      :class="{ 'ca-vat-toggle__link--active': !vatIncluded }"
      href="javascript:;"
      @click="setVATIncluded(false)"
      >{{ $t('VAT_TOGGLE_LABEL_EX') }}</a
    >
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Used to toggle globally if prices should include VAT or not
export default {
  name: 'CaVatToggle',
  components: {},
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    vatIncluded() {
      return this.$store.state.VATincluded;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Set global state
    // @arg Boolean
    setVATIncluded(vatincluded) {
      this.$store.commit('setVATincluded', vatincluded);
    }
  }
};
</script>
<style lang="scss">
.ca-vat-toggle {
  display: flex;
  &__link {
    &:not(:last-child) {
      margin-right: $px8;
    }
    &--active {
      font-weight: $font-weight-bold;
    }
  }
}
</style>
