<template>
  <div class="ca-filter-multi">
    <ul class="ca-filter-multi__list">
      <li
        v-for="(value, index) in valuesWithSelected"
        :key="index"
        class="ca-filter-multi__value"
        :class="{
          'ca-filter-multi__value--selected': value.selected,
          'ca-filter-multi__value--disabled': value.count === 0
        }"
        @click="
          toggleFilterValue(
            { id: value.facetId, label: value.label },
            !value.selected
          )
        "
      >
        <CaIcon class="ca-filter-multi__check" name="check" />
        {{ value.label }} ({{ value.count }})
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
    }
  },
  data: () => ({
    currentSelection: []
  }),
  computed: {
    valuesWithSelected() {
      if (this.values && this.values.length && this.selection) {
        return this.values.map(item => {
          const isSelected = this.currentSelection.some(
            el => el.id === item.facetId
          );
          this.$set(item, 'selected', isSelected);
          return item;
        });
      } else return [];
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
    // Toggle the value of a filter and emit the updated selection
    // @arg filter (Object) and selected (Boolean)
    toggleFilterValue(filter, selected) {
      if (selected) {
        this.currentSelection.push(filter);
      } else {
        const index = this.currentSelection.findIndex(
          i => i.id === filter.facetId
        );
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
