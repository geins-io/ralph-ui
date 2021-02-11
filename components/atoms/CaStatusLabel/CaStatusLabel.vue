<template>
  <div class="ca-status-label" :class="typeClass">{{ text }}</div>
</template>
<script>
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-status-label.scss_
export default {
  name: 'CaStatusLabel',
  mixins: [],
  props: {
    type: {
      type: String,
      default: 'inactive' // active, completed, cancelled
    },
    text: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    typeClass() {
      return 'ca-status-label--' + this.type;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-status-label';
</style>
