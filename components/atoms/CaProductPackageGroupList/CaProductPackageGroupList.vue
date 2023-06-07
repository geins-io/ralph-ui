<template>
  <ul class="ca-product-package-group-list">
    <li
      v-for="(option, i) in group.options"
      :key="i"
      class="ca-product-package-group-list__item"
    >
      <CaClickable
        @clicked="
          setSelectedOption(
            group.groupId,
            option.optionId,
            option.product.skus[0].skuId
          )
        "
      >
        <CaInputRadio
          v-model="selection.optionId"
          :label="option.product.name"
          :value="option.optionId"
        />
      </CaClickable>
    </li>
  </ul>
</template>
<script>
/*
  (Description of component)
*/
export default {
  name: 'CaProductPackageGroupList',
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    selection: {
      groupId: null,
      optionId: null,
      skuId: null
    }
  }),
  computed: {
    options() {
      return this.group.options;
    },
    selectedOption() {
      return this.options.find(option => option.isSelected === true);
    },
    selectedOptionId() {
      return this.selectedOption?.optionId;
    },
    selectedSkuId() {
      return this.selectedOption?.product.skus[0].skuId;
    }
  },
  watch: {
    group: {
      handler() {
        this.setSelectedOption(
          this.group.groupId,
          this.selectedOptionId,
          this.selectedSkuId
        );
      },
      immediate: true
    }
  },
  methods: {
    setSelectedOption(groupId, optionId, skuId) {
      if (this.selection.skuId === skuId) {
        return;
      }

      this.selection.groupId = groupId;
      this.selection.optionId = optionId;
      this.selection.skuId = skuId;
      this.$emit('add-package-option', this.selection);
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-product-package-group-list';
</style>
