<template>
  <div class="ca-filter-multi">
    <ul class="ca-filter-multi__list">
      <li
        v-for="(value, index) in sortByOrder(filterValues)"
        :key="index"
        class="ca-filter-multi__value"
        :class="{
          'ca-filter-multi__value--selected': value.selected,
          'ca-filter-multi__value--disabled': value.count === 0,
          'ca-filter-multi__value--hidden': value.label === '-'
        }"
        @click="
          toggleFilterValue(
            { id: value.facetId, label: value.label },
            !value.selected
          )
        "
      >
        <CaIcon class="ca-filter-multi__check" name="check" />
        <span class="ca-filter-multi__label">{{ value.label }}</span>
        <span class="ca-filter-multi__count">{{ value.count }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Multi choice filter<br><br>
// **SASS-path:** _./styles/components/molecules/ca-filter-multi.scss_
export default {
  name: 'CaFilterMulti',
  mixins: [],
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
    // Option to hide values
    hideValues: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    currentSelection: []
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
    valuesExcludeHidden() {
      return this.valuesWithSelected.filter(el => !el.hidden);
    },
    filterValues() {
      return !this.hideValues
        ? this.valuesWithSelected
        : this.valuesExcludeHidden;
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
    // Orders the data by its order prop
    // @arg data (Array)
    sortByOrder(data) {
      const ordered = data.sort((a, b) => {
        return a.order - b.order || a.facetId.localeCompare(b.facetId);
      });

      return ordered;
    },
    // @vuese
    // Toggle the value of a filter and emit the updated selection
    // @arg filter (Object) and selected (Boolean)
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
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-filter-multi';
</style>
