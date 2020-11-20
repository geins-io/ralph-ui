<template>
  <div class="ca-skeleton" :style="'padding-bottom:' + paddingPercentage"></div>
</template>
<script>
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-skeleton.scss_
export default {
  name: 'CaSkeleton',
  components: {},
  mixins: [],
  props: {
    ratio: {
      type: Number,
      default: null
    }
  },
  data: () => ({}),
  computed: {
    paddingPercentage() {
      return Math.round((this.ratio + Number.EPSILON) * 100) + '%';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-skeleton';
</style>
