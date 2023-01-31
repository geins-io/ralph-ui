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
      required: true
    }
  },
  data: () => ({
    selection: ''
  }),
  computed: {
    ...mapState(['marketId'])
  },
  watch: {
    marketId() {
      this.selection = this.marketId;
    }
  },
  mounted() {
    this.selection = this.marketId;
  },
  methods: {
    getSelected(value) {
      this.selection = value;
      this.$emit('input', value);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-country-selector';
</style>
