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
      v-if="initValueSet"
      v-model="currentSelection"
      tooltip="always"
      :enable-cross="false"
      :min="values.lowest"
      :max="values.highest"
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
// Range type filter
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
      }
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
      }
    }
  },
  data: () => ({
    currentSelection: [0, 0],
    initValueSet: false,
    newValue: {
      lowest: 0,
      highest: 0
    },
    draggingTimeout: null
  }),
  computed: {},
  watch: {
    selection: {
      deep: true,
      handler() {
        this.setCurrentSelection();
      }
    }
  },
  mounted() {
    this.setCurrentSelection();
    this.initValueSet = true;
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
      this.currentSelection[0] = this.selection.lowest;
      this.currentSelection[1] = this.selection.highest;
    }
  }
};
</script>
<style lang="scss">
$themeColor: $c-darkest-gray;
$bgColor: lighten($c-darkest-gray, 43%);
@import '~vue-slider-component/lib/theme/material.scss';
.ca-filter-range {
  padding: $px48 $px16 $px12;
  &__current {
    display: flex;
    justify-content: space-between;
    margin: 0 0 $px12;
  }
  &__value {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
  }
}
</style>
