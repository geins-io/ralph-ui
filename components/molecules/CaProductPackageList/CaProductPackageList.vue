<template>
  <div
    v-if="requiredPackageGroups && requiredPackageGroups.length > 0"
    class="ca-product-package-list"
  >
    <ul
      v-for="(group, index) in requiredPackageGroups"
      :key="index"
      class="ca-product-package-list__list"
    >
      <li v-if="group.options.length" class="ca-product-package-list__item">
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
  computed: {
    requiredPackageGroups() {
      return this.packageGroups.filter(group => group.required === true);
    }
  },
  methods: {
    addPackageOption(option) {
      // Check if product already exists in selection
      const existingProduct = this.packageSelection.find(
        item => item.skuId === option.skuId
      );

      if (existingProduct) {
        return;
      }

      // If not existing, remove existing product with same group id and add new
      this.packageSelection = this.packageSelection.filter(
        item => item.groupId !== option.groupId
      );

      this.packageSelection.push(option);
      this.$emit('add-package-option', this.packageSelection);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-product-package-list';
</style>
