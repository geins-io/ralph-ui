<template>
  <ul class="ca-shipping-options">
    <li
      v-for="(option, index) in options"
      :key="index"
      class="ca-shipping-options__item"
    >
      <button
        class="ca-shipping-options__option"
        :class="{
          'ca-shipping-options__option--selected': option.id === selectedId
        }"
        type="button"
        @click="selectOption(option.id)"
      >
        <CaSvgAsset
          v-if="option.logo"
          class="ca-shipping-options__logo"
          folder="logos"
          :filename="option.logo"
          :alt="option.displayName + ' logo'"
        />
        <span class="ca-shipping-options__name">
          {{ option.displayName }}
        </span>
        <span class="ca-shipping-options__price">
          {{
            $store.state.vatIncluded
              ? option.feeIncVatFormatted
              : option.feeExVatFormatted
          }}
        </span>
      </button>
    </li>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
// Displaying available shipping options<br><br>
// **SASS-path:** _./styles/components/molecules/ca-shipping-options.scss_
export default {
  name: 'CaShippingOptions',
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
    // @vuese
    // Currently selected option
    // @type Object
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
    // @vuese
    // Sets selected to either the given id or the id of selectedOption
    // @arg id (Number, null)
    setSelected(id = null) {
      this.selectedId = id || this.selectedOption?.id;
    },
    // @vuese
    // Selection click handler
    // @arg id (Number, null)
    selectOption(id) {
      this.setSelected(id);
      // @vuese
      // Selection has been made
      // @arg id (Number)
      this.$emit('selection', id);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-shipping-options';
</style>
