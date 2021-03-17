<template>
  <div class="ca-status-label" :class="typeClass">
    {{ text }}
  </div>
</template>
<script>
// @group Atoms
// @vuese
// A status label/tag. Gets modifier class of provided type<br><br>
// **SASS-path:** _./styles/components/atoms/ca-status-label.scss_
export default {
  name: 'CaStatusLabel',
  mixins: [],
  props: {
    // The status
    type: {
      type: String,
      default: 'inactive'
    },
    // The status display text
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
