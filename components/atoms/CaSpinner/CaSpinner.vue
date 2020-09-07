<template>
  <div v-if="loading" class="ca-spinner"></div>
</template>
<script>
// @group Atoms
// @vuese
export default {
  name: 'CaSpinner',
  components: {},
  mixins: [],
  props: {
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
.ca-spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid $c-white;
  border-top: none;
  border-right: none;
  animation: spin 500ms infinite linear;
}
</style>
