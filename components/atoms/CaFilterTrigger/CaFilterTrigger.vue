<template>
  <div class="ca-filter-trigger" :class="modifiers">
    <div class="ca-filter-trigger__title" @click="$emit('clicked')">
      {{ title }}
      <CaNotificationBadge
        :number="currentSelection.length"
        :positioned="false"
        class="ca-filter-trigger__amount"
      />
      <CaIcon class="ca-filter-trigger__arrow" name="chevron-down" />
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
    title: {
      type: String,
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
    modifiers() {
      return {
        'ca-filter--chosen': this.selectionMade
      };
    },
    selectionMade() {
      return this.currentSelection.length > 0;
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
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-filter-trigger';
</style>
