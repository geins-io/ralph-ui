<template>
  <div
    v-if="packageGroups && packageGroups.length > 0"
    class="ca-product-package-list"
  >
    <ul
      v-for="(group, index) in packageGroups"
      :key="index"
      class="ca-product-package-list__list"
    >
      <li
        v-if="group.options.length && group.name !== ':dold:'"
        class="ca-product-package-list__item"
      >
        <h3 class="ca-product-package-list__item-label">
          {{ group.name }}
        </h3>
        <CaProductPackageGroupList
          :group="group"
          @add-package-option="addPackageOption"
        />
      </li>
    </ul>
  </div>
</template>
<script>
/*
  (Description of component)
*/
export default {
  name: 'CaProductPackageList',
  props: {
    product: {
      type: Object,
      required: true
    },
    packageGroups: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    packageSelection: []
  }),
  methods: {
    addPackageOption(option) {
      if (!option.skuId) {
        return;
      }

      // Check if product already exists in selection
      const existingProduct = this.packageSelection.find(
        item => item.skuId === option.skuId
      );

      if (existingProduct) {
        return;
      }

      this.packageSelection.push(option);
      this.$emit('add-package-option', this.packageSelection);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-product-package-list';
</style>
