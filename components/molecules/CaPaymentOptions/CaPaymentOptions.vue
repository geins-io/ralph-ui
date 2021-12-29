<template>
  <ul class="ca-payment-options">
    <li
      v-for="(option, index) in options"
      :key="index"
      class="ca-payment-options__item"
    >
      <button
        class="ca-payment-options__option"
        :class="{
          'ca-payment-options__option--selected': option.id === selectedId
        }"
        type="button"
        @click="selectOption(option.id)"
      >
        <CaSvgAsset
          v-if="option.logo"
          class="ca-payment-options__logo"
          folder="logos"
          :filename="option.logo"
          :alt="option.displayName + ' logo'"
        />
        <span class="ca-payment-options__name">
          {{ option.displayName }}
        </span>
      </button>
    </li>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
// List of payment options<br><br>
// **SASS-path:** _./styles/components/molecules/ca-payment-options.scss_
export default {
  name: 'CaPaymentOptions',
  mixins: [],
  props: {
    // List of options
    options: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    selectedId: null
  }),
  computed: {
    selectedOption() {
      return this.options.find(i => i.isSelected);
    }
  },
  watch: {
    options: {
      deep: true,
      handler() {
        this.setSelected();
      }
    }
  },
  mounted() {
    this.setSelected();
  },
  methods: {
    setSelected(id = null) {
      this.selectedId = id || this.selectedOption?.id;
    },
    selectOption(id) {
      this.setSelected(id);
      this.$emit('selection', id);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-payment-options';
</style>
