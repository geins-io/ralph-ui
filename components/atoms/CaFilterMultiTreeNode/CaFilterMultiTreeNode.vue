<template>
  <ul class="ca-filter-multi-tree-view__list">
    <li
      class="ca-filter-multi-tree-view__value"
      :class="{
        'ca-filter-multi-tree-view__value--selected': value.selected,
        'ca-filter-multi-tree-view__value--disabled': value.count === 0,
        'ca-filter-multi-tree-view__value--hidden': value.label === '-'
      }"
      @click.stop="
        propagateData(
          value.children && value.children.length ? value.children : false,
          value.facetId,
          value.label,
          value.selected,
          value.parentId && value.parentId ? value.parentId : false
        ),
          toggle
      "
    >
      <CaIcon class="ca-filter-multi-tree-view__check" name="check" />
      <span class="ca-filter-multi-tree-view__label">{{ value.label }}</span>
      <span class="ca-filter-multi-tree-view__count">{{ value.count }}</span>

      <button
        v-if="value.children && value.children.length"
        class="ca-filter-multi-tree-view__toggle"
        aria-label="Expand Category Filters"
        @click.stop="toggle"
      >
        <CaIcon :name="isOpen ? 'minus' : 'plus'" />
      </button>
      <SlideUpDown
        v-if="value.children && value.children.length"
        tag="div"
        :active="isOpen"
        :duration="200"
        class="ca-filter-multi-tree-view__list ca-filter-multi-tree-view__list--sub"
      >
        <CaFilterMultiTreeNode
          v-for="(child, index) in value.children"
          :key="index"
          :value="child"
          :propagate-data="propagateData"
        />
      </SlideUpDown>
    </li>
  </ul>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down';
// @group Atoms
// @vuese
// Tree node child component for the Multi Choise Tree view component<br><br>
// **SASS-path:** _./styles/components/atoms/ca-filter-multi-tree-node.scss_
export default {
  name: 'CaFilterMultiTreeNode',
  components: { SlideUpDown },
  props: {
    // Gets the updated selectable values with children
    value: {
      default: () => {},
      type: Object
    },
    // Propagates the data to the parent
    propagateData: {
      type: Function,
      default: () => ({})
    }
  },
  data: () => ({
    isOpen: false
  }),
  watch: {
    value: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.selectedChildren(this.value);
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.selectedChildren(this.value);
    });
  },
  methods: {
    // @vuese
    // Converts the object to a string and searches if any child is selected to toggle parent and children
    // @arg value (Object)
    selectedChildren(value) {
      if (value) {
        const str = JSON.stringify(value);
        const filter = str.search('"selected":true');
        this.isOpen = filter !== -1;
      }
    },
    // @vuese
    // Toggle the selected accordion by id
    // @arg id (String)
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
