<template>
  <div class="ca-filter-trigger" :class="modifiers">
    <div class="ca-filter-trigger__title" @click="$emit('clicked')">
      {{ title }}
      <CaNotificationBadge
        :number="currentSelection.length"
        :positioned="false"
        class="ca-filter-trigger__amount"
      />
      <CaIcon class="ca-filter-trigger__arrow" :name="iconName" />
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Used to trigger the filter panel<br><br>
// **SASS-path:** _./styles/components/atoms/ca-filter-trigger.scss_
export default {
  name: 'CaFilterTrigger',
  mixins: [],
  props: {
    // The title of the filter
    title: {
      type: String,
      required: true,
    },
    // The current filter selection
    selection: {
      type: Array,
      required: true,
    },
    // The icon name. See documentation for [CaIcon](/components/CaIcon) to learn more.
    iconName: {
      type: String,
      default: 'filter',
    },
    // The filters array
    filters: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    currentSelection: [],
  }),
  computed: {
    modifiers() {
      return {
        'ca-filter-trigger--chosen': this.selectionMade,
      };
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
@import 'atoms/ca-filter-trigger';
</style>
