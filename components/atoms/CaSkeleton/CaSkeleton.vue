<template>
  <div class="ca-skeleton" :class="modifiers" :style="styles"></div>
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
    },
    radius: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '1.4em'
    }
  },
  data: () => ({}),
  computed: {
    ratioPadding() {
      return Math.round((this.ratio + Number.EPSILON) * 100) + '%';
    },
    modifiers() {
      return {
        'ca-skeleton--radius': this.radius
      };
    },
    styles() {
      const stylesObj = {};
      stylesObj.width = this.width;
      stylesObj.height = this.height;
      if (this.ratio) {
        stylesObj.padding = '0 0 ' + this.ratioPadding;
      }
      return stylesObj;
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
