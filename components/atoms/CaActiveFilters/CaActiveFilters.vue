<template>
  <div class="ca-active-filters">
    <div
      v-for="category in currentSelection.categories"
      :key="category.id"
      class="ca-active-filters__filter"
    >
      <span class="ca-active-filters__label">{{ category.label }}</span>
      <CaIconButton
        class="ca-active-filters__remove"
        icon-name="x"
        aria-label="Remove filter"
        @clicked="removeFilter(category.id, 'categories')"
      />
    </div>
    <div
      v-for="brand in currentSelection.brands"
      :key="brand.id"
      class="ca-active-filters__filter"
    >
      <span class="ca-active-filters__label">{{ brand.label }}</span>
      <CaIconButton
        class="ca-active-filters__remove"
        icon-name="x"
        aria-label="Remove filter"
        @clicked="removeFilter(brand.id, 'brands')"
      />
    </div>
    <div
      v-for="sku in currentSelection.skus"
      :key="sku.id"
      class="ca-active-filters__filter"
    >
      <span class="ca-active-filters__label">{{ sku.label }}</span>
      <CaIconButton
        class="ca-active-filters__remove"
        icon-name="x"
        aria-label="Remove filter"
        @clicked="removeFilter(sku.id, 'skus')"
      />
    </div>
    <div
      v-for="param in selectedParameters"
      :key="param.id"
      class="ca-active-filters__filter"
    >
      <span class="ca-active-filters__label">{{ param.label }}</span>
      <CaIconButton
        class="ca-active-filters__remove"
        icon-name="x"
        aria-label="Remove filter"
        @clicked="removeFilter(param.id, 'parameters')"
      />
    </div>
    <button
      v-if="selectionActive"
      type="button"
      class="ca-active-filters__reset"
      @click="resetFilters"
    >
      <CaIconAndText class="ca-active-filters__reset-text" icon-name="x-circle">
        {{ $t('RESET_FILTER') }}
      </CaIconAndText>
    </button>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Displays the current active filters<br><br>
// **SASS-path:** _./styles/components/atoms/ca-active-filters.scss_
export default {
  name: 'CaActiveFilters',
  mixins: [],
  props: {
    selection: {
      type: Object,
      required: true
    },
    selectionActive: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    currentSelection: {}
  }),
  computed: {
    selectedParameters() {
      const selected = [];
      for (const group in this.currentSelection.parameters) {
        this.currentSelection.parameters[group].forEach(i => selected.push(i));
      }
      return selected;
    }
  },
  watch: {
    selection(newVal) {
      this.currentSelection = newVal;
    }
  },
  mounted() {
    this.currentSelection = this.selection;
  },
  methods: {
    resetFilters() {
      this.$emit('reset');
    },
    removeFilter(id, type) {
      if (type === 'parameters') {
        for (const group in this.currentSelection[type]) {
          const index = this.currentSelection[type][group].findIndex(
            i => i.id === id
          );
          if (index > -1) {
            this.currentSelection[type][group].splice(index, 1);
            this.$emit('selectionchange', this.currentSelection);
          }
        }
      } else {
        const index = this.currentSelection[type].findIndex(i => i.id === id);
        if (index > -1) {
          this.currentSelection[type].splice(index, 1);
          this.$emit('selectionchange', this.currentSelection);
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-active-filters';
</style>
