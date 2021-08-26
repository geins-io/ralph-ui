<template>
  <div class="ca-list-count-bar__wrapper" :style="cssVariables">
    <div class="ca-list-count-bar"></div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Component to visualize the amount of a product list currently visible <br><br>
// **SASS-path:** _./styles/components/atoms/ca-list-count-bar.scss_
export default {
  name: 'CaListCountBar',
  mixins: [],
  props: {
    // The lowest product number shown
    minCount: {
      type: Number,
      required: true
    },
    // The highest product number shown
    maxCount: {
      type: Number,
      required: true
    },
    // The total amount of products in list
    totalCount: {
      type: Number,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    cssVariables() {
      return {
        '--min-count': this.minCount - 1,
        '--product-count': this.maxCount - (this.minCount - 1),
        '--total-count': this.totalCount
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-list-count-bar';
</style>
