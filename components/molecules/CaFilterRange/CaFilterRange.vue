<template>
  <div class="ca-filter-range">
    <!-- <div class="ca-filter-range__current">
      <span class="ca-filter-range__value ca-filter-range__value--lowest">
        {{ currentSelection[0] }} kr
      </span>
      <span class="ca-filter-range__value">
        -
      </span>
      <span class="ca-filter-range__value ca-filter-range__value--highest">
        {{ currentSelection[1] }} kr
      </span>
    </div> -->
    <VueSlider
      v-if="initValuesSet"
      :key="sliderKey"
      v-model="currentSelection"
      tooltip="always"
      :enable-cross="false"
      :min="parseInt(storedValues.lowest)"
      :max="parseInt(storedValues.highest)"
      @drag-end="changeHandler"
    />
  </div>
</template>
<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
// import 'vue-slider-component/theme/material.css';

// @group Molecules
// @vuese
// Range type filter<br><br>
// **SASS-path:** _./styles/components/molecules/ca-filter-range.scss_
export default {
  name: 'CaFilterRange',
  components: { VueSlider },
  mixins: [],
  props: {
    // The filter values. Object that should hold the keys 'lowest' and 'highest'
    values: {
      type: Object,
      required: true,
      validator(value) {
        return (
          Object.prototype.hasOwnProperty.call(value, 'lowest') &&
          Object.prototype.hasOwnProperty.call(value, 'highest')
        );
      },
    },
    // The current selection. Object that should hold the keys 'lowest' and 'highest'
    selection: {
      type: Object,
      required: true,
      validator(value) {
        return (
          Object.prototype.hasOwnProperty.call(value, 'lowest') &&
          Object.prototype.hasOwnProperty.call(value, 'highest')
        );
      },
    },
  },
  data: () => ({
    currentSelection: [0, 0],
    initValuesSet: false,
    storedValues: {
      lowest: 0,
      highest: 0,
    },
    newValue: {
      lowest: 0,
      highest: 0,
    },
    draggingTimeout: null,
    sliderKey: 0,
  }),
  computed: {},
  watch: {
    selection: {
      deep: true,
      handler(val) {
        this.setCurrentSelection();
      },
    },
    values: {
      deep: true,
      handler(val) {
        if (this.currentSelection[0] < val.lowest) {
          this.currentSelection[0] = val.lowest;
        }
        if (this.currentSelection[1] > val.highest) {
          this.currentSelection[1] = val.highest;
        }
        this.setValues(val);
      },
    },
  },
  mounted() {
    this.setCurrentSelection();
    this.setValues(this.values);
  },
  methods: {
    // @vuese
    // Triggered when filter is changed
    changeHandler() {
      this.newValue.lowest = this.currentSelection[0];
      this.newValue.highest = this.currentSelection[1];
      // New selection is made
      // @arg new value (Object)
      this.$emit('selectionchange', this.newValue);
    },
    // @vuese
    // Used to set local data when mounted
    setCurrentSelection() {
      this.currentSelection[0] = parseInt(this.selection.lowest);
      this.currentSelection[1] = parseInt(this.selection.highest);
      this.sliderKey = !this.sliderKey;
    },
    // @vuese
    // Used to set local data when mounted
    setValues(values) {
      this.storedValues = values;
      this.initValuesSet = true;
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-filter-range';
</style>
