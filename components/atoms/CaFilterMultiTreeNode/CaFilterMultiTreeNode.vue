<template>
  <ul class="ca-filter-multi-tree-view__list">
    <li
      v-for="(item, index) in values"
      :key="index"
      class="ca-filter-multi-tree-view__value"
      :class="{
        'ca-filter-multi-tree-view__value--selected': item.selected,
        'ca-filter-multi-tree-view__value--disabled': item.count === 0,
        'ca-filter-multi-tree-view__value--hidden': item.label === '-'
      }"
      @click.stop="
        propagateData(
          item.children && item.children.length ? item.children : false,
          item.facetId,
          item.label,
          item.selected,
          item.parentId && item.parentId ? item.parentId : false
        ),
          toggle(item.facetId)
      "
    >
      <CaIcon class="ca-filter-multi-tree-view__check" name="check" />
      <span class="ca-filter-multi-tree-view__label">{{ item.label }} </span>
      <span class="ca-filter-multi-tree-view__count">{{ item.count }}</span>

      <button
        v-if="item.children && item.children.length"
        class="ca-filter-multi-tree-view__toggle"
        aria-label="Expand Category Filters"
        @click.stop="toggle(item.facetId)"
      >
        <CaIcon
          :name="
            isOpen === item.facetId || selectedChildren(item) ? 'minus' : 'plus'
          "
        />
      </button>
      <SlideUpDown
        v-if="item.children && item.children.length"
        tag="div"
        :active="isOpen === item.facetId || selectedChildren(item)"
        :duration="200"
        class="ca-filter-multi-tree-view__list ca-filter-multi-tree-view__list--sub"
      >
        <CaFilterMultiTreeNode
          :values="item.children"
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
    values: {
      default: () => [],
      type: Array
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
  methods: {
    // @vuese
    // Converts the object to a string and searches if any child is selected to toggle parent and children
    // @arg value (Object)
    selectedChildren(value) {
      const str = JSON.stringify(value);
      const filter = str.search('"selected":true');
      return filter !== -1;
    },
    // @vuese
    // Toggle the selected accordion by id
    // @arg id (String)
    toggle(id) {
      if (this.isOpen !== id) {
        this.isOpen = id;
      } else {
        this.isOpen = false;
      }
    }
  }
};
</script>
