<template>
  <div class="ca-filter-multi-tree-view">
    <ul class="ca-filter-multi-tree-view__list">
      <li
        v-for="(parent, index) in parentCategories"
        :key="index"
        class="ca-filter-multi-tree-view__value"
        :class="{
          'ca-filter-multi-tree-view__value--selected': parent.selected,
          'ca-filter-multi-tree-view__value--disabled': parent.count === 0,
          'ca-filter-multi-tree-view__value--hidden': parent.label === '-'
        }"
        @click="
          toggleParentCategoryFilter(
            parent.facetId,
            parent.label,
            !parent.selected,
            index
          )
        "
      >
        <CaIcon class="ca-filter-multi-tree-view__check" name="check" />
        <span class="ca-filter-multi-tree-view__label">{{ parent.label }}</span>
        <span class="ca-filter-multi-tree-view__count">{{ parent.count }}</span>
        <button
          v-if="
            filterChildByFacetId(parent.facetId) &&
              filterChildByFacetId(parent.facetId).length
          "
          class="ca-filter-multi-tree-view__toggle"
          aria-label="Expand Category Filters"
          @click.stop="toggleSubCategory(index)"
        >
          <CaIcon :name="open === index ? 'minus' : 'plus'" />
        </button>
        <SlideUpDown
          v-if="
            filterChildByFacetId(parent.facetId) &&
              filterChildByFacetId(parent.facetId).length
          "
          tag="ul"
          :active="open === index"
          :duration="200"
          class="ca-filter-multi-tree-view__list ca-filter-multi-tree-view__list--sub"
        >
          <li
            v-for="child in filterChildByFacetId(parent.facetId)"
            :key="child.id"
            class="ca-filter-multi-tree-view__value"
            :class="{
              'ca-filter-multi-tree-view__value--selected': child.selected,
              'ca-filter-multi-tree-view__value--disabled': child.count === 0,
              'ca-filter-multi-tree-view__value--hidden': child.label === '-'
            }"
            @click.stop="
              toggleFilterValue(
                { id: child.facetId, label: child.label },
                !child.selected
              )
            "
          >
            <CaIcon class="ca-filter-multi-tree-view__check" name="check" />
            <span class="ca-filter-multi-tree-view__label">
              {{ child.label }}
            </span>
            <span class="ca-filter-multi-tree-view__count">
              {{ child.count }}
            </span>
          </li>
        </SlideUpDown>
      </li>
    </ul>
  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down';
// @group Molecules
// @vuese
// Multi choice tree view filter<br><br>
// **SASS-path:** _./styles/components/molecules/ca-filter-multi-tree-view.scss_
export default {
  name: 'CaFilterMultiTreeView',
  components: { SlideUpDown },
  props: {
    // The selectable values
    values: {
      type: Array,
      required: true
    },
    // The current selection
    selection: {
      type: Array,
      required: true
    },
    // Should it load tree view by default?
    displayTreeView: {
      type: Boolean,
      // `false`
      default: false
    }
  },
  data: () => ({
    currentSelection: [],
    open: false
  }),
  computed: {
    valuesWithSelected() {
      if (this.values && this.values.length && this.selection) {
        return this.values.map(item => {
          let isSelected = this.currentSelection.some(
            el => el.id === item.facetId
          );
          if (item.count === 0) {
            isSelected = false;
          }
          this.$set(item, 'selected', isSelected);
          return item;
        });
      } else {
        return [];
      }
    },
    parentCategories() {
      if (this.valuesWithSelected && this.valuesWithSelected.length) {
        return this.valuesWithSelected.filter(item => !item.parentId);
      } else {
        return false;
      }
    }
  },
  watch: {
    selection: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.currentSelection = this.selection;
        }
      }
    }
  },
  mounted() {
    this.currentSelection = this.selection;
  },
  methods: {
    // @vuese
    // Toggle the value of a parent category and its children filter, emit the updated selection and expand the sub category view
    // @arg facetId (String), name (String), selected (Boolean), index (Number)
    toggleParentCategoryFilter(facetId, name, selected, index) {
      const filterData = this.filterChildByFacetId(facetId);
      const filters = [{ id: facetId, label: name }];
      filterData.forEach(item => {
        filters.push({ id: item.facetId, label: item.label });
      });
      if (selected) {
        this.open = index;
        filters.forEach(item => {
          const index = this.currentSelection.findIndex(i => i.id === item.id);
          if (index === -1) {
            this.currentSelection.push({ id: item.id, label: item.label });
          }
        });
      } else {
        this.open = false;
        filters.forEach(item => {
          const index = this.currentSelection.findIndex(i => i.id === item.id);
          this.currentSelection.splice(index, 1);
        });
      }
      this.$emit('selectionchange', this.currentSelection);
    },
    // @vuese
    // Toggle the value of a filter, emit the updated selection and expand the sub category view
    // @arg filter (Object), selected (Boolean)
    toggleFilterValue(filter, selected) {
      if (selected) {
        this.currentSelection.push(filter);
      } else {
        const index = this.currentSelection.findIndex(i => i.id === filter.id);
        this.currentSelection.splice(index, 1);
      }
      // The selection has changed
      // @arg Updated selection (Array)
      this.$emit('selectionchange', this.currentSelection);
    },
    // @vuese
    // Filter the child categories by facetId
    // @arg facetId (string)
    filterChildByFacetId(facetId) {
      if (this.values && this.values.length && this.selection) {
        return this.values.filter(item => item.parentId === facetId);
      } else {
        return false;
      }
    },
    // @vuese
    // Toggle the tree view categories
    // @arg index (Number)
    toggleSubCategory(index) {
      this.open !== index ? (this.open = index) : (this.open = false);
    }
  }
};
</script>

<style lang="scss">
@import 'molecules/ca-filter-multi-tree-view';
</style>
