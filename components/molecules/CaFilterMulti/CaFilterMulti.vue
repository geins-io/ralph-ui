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
        @click="toggleFilterValue(value.name, !value.selected)"
      >
        <CaIcon class="ca-filter-multi__check" name="check" />
        {{ value.name }} ({{ value.count }})
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
          const isSelected = this.currentSelection.some(el => el === item.name);
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
    // @arg name (String) and selected (Boolean)
    toggleFilterValue(name, selected) {
      if (selected) {
        this.currentSelection.push(name);
      } else {
        this.currentSelection.splice(this.currentSelection.indexOf(name), 1);
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
