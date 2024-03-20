<template>
  <div class="ca-filter" :class="modifiers">
    <div class="ca-filter__title" @click="() => (open = !open)">
      {{ title }}
      <span v-if="selectionMade" class="ca-filter__chosen-amount">
        ({{ currentSelection.length }})
      </span>
      <CaIcon class="ca-filter__arrow" name="chevron-down" />
    </div>
    <SlideUpDown class="ca-filter__values" :active="open" :duration="200">
      <LazyCaFilterMulti
        v-if="!typeRange"
        :values="values"
        :selection="currentSelection"
        @selectionchange="$emit('selectionchange', $event)"
      />
    </SlideUpDown>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Used to make a filter section in the filter panel<br><br>
// **SASS-path:** _./styles/components/molecules/ca-filter.scss_
export default {
  name: 'CaFilter',
  components: {
    SlideUpDown: () => import('vue-slide-up-down'),
  },
  mixins: [],
  props: {
    title: {
      type: String,
      required: true,
    },
    values: {
      type: [Array, Object],
      required: true,
    },
    selection: {
      type: [Array],
      required: true,
    },
    type: {
      // 'multi', 'range'
      type: String,
      default: 'multi', // 'range'
      validator(value) {
        return ['multi', 'range'].includes(value);
      },
    },
  },
  data: () => ({
    open: false,
    currentSelection: [],
  }),
  computed: {
    modifiers() {
      return {
        'ca-filter--open': this.open,
        'ca-filter--chosen': this.selectionMade,
      };
    },
    typeRange() {
      return this.type === 'range';
    },
    selectionMade() {
      return this.currentSelection.length > 0;
    },
  },
  watch: {
    selection: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.currentSelection = this.selection;
        }
      },
    },
  },
  mounted() {
    this.currentSelection = this.selection;
  },
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-filter';
</style>
