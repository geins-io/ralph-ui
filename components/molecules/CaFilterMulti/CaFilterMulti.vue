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
import CaIcon from 'CaIcon';
// @group Molecules
// @vuese
// Multi choice filter
export default {
  name: 'CaFilterMulti',
  components: { CaIcon },
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
.ca-filter-multi {
  background: $c-lightest-gray;
  padding: $px12 $px16;
  @include bp(laptop) {
    background: transparent;
    padding: 0;
  }
  &__value {
    padding-left: $px24;
    position: relative;
    line-height: 2;
    cursor: pointer;
    &:before {
      width: 18px;
      height: 18px;
      content: '';
      display: block;
      background: $c-white;
      border: $border-light;
      @include valign;
      left: 0;
    }
    &--selected {
      font-weight: $font-weight-bold;
      .ca-filter-multi__check {
        opacity: 1;
      }
    }
    &--disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }
  &__check {
    opacity: 0;
    @include valign;
    left: 2px;
    transition: opacity 200ms ease;
    color: $c-success;
  }
}
</style>
