<template>
  <div
    v-if="valuesWithChildren && valuesWithChildren.length"
    class="ca-filter-multi-tree-view"
  >
    <CaFilterMultiTreeNode
      v-for="(item, index) in valuesWithChildren"
      :key="index"
      :value="item"
      :selected="item.selected"
      :propagate-data="filterProducts"
    />
  </div>
</template>

<script>
// @group Molecules
// @vuese
// Multi choice tree view filter<br><br>
// **SASS-path:** _./styles/components/molecules/ca-filter-multi-tree-view.scss_
export default {
  name: 'CaFilterMultiTreeView',
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
    currentSelection: []
  }),
  computed: {
    // @vuese
    // Adds selected property to the values returned from the api
    // @type Array
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
    // @vuese
    // Adds children properties created from child categories with parentId
    // @type Array
    valuesWithChildren() {
      const data = this.valuesWithSelected;
      const parentCategories = data.filter(item => !item.parentId);

      data.map(item => {
        item.children = data.filter(child => child.parentId === item.facetId);
      });

      return parentCategories;
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
    // Filter the prodcuts and emit the selection
    // @arg children (Array), facetId (String), label (String), Selected (Boolean), parentId (String)
    filterProducts(children, facetId, label, selected, parentId) {
      if (!selected) {
        this.pushSelection(facetId, label);

        if (children && children.length) {
          this.selectChildrenCategories(children, facetId, label, selected);
        }
      } else if (parentId) {
        this.removeParentCategories(facetId, parentId);
      } else {
        this.removeSelection(facetId);
      }

      this.$emit('selectionchange', this.currentSelection);
    },
    // @vuese
    // Push the selected filters
    // @arg facetId (String), itemLabel (string)
    pushSelection(facetId, itemLabel) {
      const index = this.currentSelection.findIndex(
        item => item.id === facetId
      );
      if (index === -1) {
        this.currentSelection.push({
          id: facetId,
          label: itemLabel
        });
      }
    },
    // @vuese
    // Select the children when a parent is selected
    // @arg array (Array)
    selectChildrenCategories(array) {
      array.forEach(item => {
        this.pushSelection(item.facetId, item.label);
        if (item.children && item.children.length) {
          this.selectChildrenCategories(item.children);
        }
      });
    },
    // @vuese
    // Remove selected filters
    // @arg facetId (String)
    removeSelection(facetId) {
      this.currentSelection = this.currentSelection.filter(
        item => item.id !== facetId
      );
    },
    // @vuese
    // Find the parents of the child category and deselct them
    // @arg facetId (String), parentId (string)
    removeParentCategories(facetId, parentId) {
      const parent = this.valuesWithSelected.find(
        item => item.facetId === parentId
      );
      if (parent) {
        this.removeSelection(parent.facetId);
        this.removeParentCategories(parent.parentId);
      }
      this.removeSelection(facetId);
    }
  }
};
</script>

<style lang="scss">
@import 'molecules/ca-filter-multi-tree-view';
</style>
