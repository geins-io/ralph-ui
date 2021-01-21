<template>
  <div v-if="loading" class="ca-spinner"></div>
</template>
<script>
// @group Atoms
// @vuese
// A little circle spinner used to show in loading state<br><br>
// **SASS-path:** _./styles/components/atoms/ca-spinner.scss_
export default {
  name: 'CaSpinner',
  mixins: [],
  props: {
    // Set true to show spinner
    loading: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-spinner';
</style>
