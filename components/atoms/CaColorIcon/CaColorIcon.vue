<template>
  <div
    class="ca-color-icon"
    :class="modifiers"
    :style="'background-color:#' + hexColor"
  ></div>
</template>
<script>
// @group Atoms
// @vuese
// A circle of color<br><br>
// **SASS-path:** _./styles/components/atoms/ca-color-icon.scss_
export default {
  name: 'CaColorIcon',
  components: {},
  mixins: [],
  props: {
    // Hex color to be displayed
    hexColor: {
      type: String,
      required: true
    },
    // Size of circle
    size: {
      type: String,
      default: 'small',
      validator(value) {
        return ['small', 'big'].includes(value);
      }
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-color-icon--big': this.size === 'big'
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-color-icon';
</style>
