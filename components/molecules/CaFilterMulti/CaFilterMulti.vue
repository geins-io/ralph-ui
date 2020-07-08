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
export default {
  name: 'CaFilterMulti',
  components: { CaIcon },
  mixins: [],
  props: {
    values: {
      type: Array,
      required: true
    },
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
    selection() {
      if (!this.currentSelection.length) {
        this.currentSelection = this.selection;
      }
    }
  },
  mounted() {
    this.currentSelection = this.selection;
  },
  methods: {
    toggleFilterValue(name, selected) {
      if (selected) {
        this.currentSelection.push(name);
      } else {
        this.currentSelection.splice(this.currentSelection.indexOf(name), 1);
      }
      this.$emit('selectionchange', this.currentSelection);
    }
  }
};
</script>
<style lang="scss">
.ca-filter-multi {
}
</style>
