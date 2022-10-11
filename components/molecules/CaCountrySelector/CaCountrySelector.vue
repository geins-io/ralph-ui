<template>
  <div class="ca-country-selector">
    <CaInputSelect
      v-model="selection"
      :options="data"
      :placeholder="$t('CHOOSE')"
      class="ca-country-selector__input"
      @input="getSelected($event)"
    />
  </div>
</template>
<script>
// @group Molecules
// @vuese
// (Description of component)<br><br>
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
  methods: {
    getSelected(value) {
      this.$emit('input', value);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-country-selector';
</style>
