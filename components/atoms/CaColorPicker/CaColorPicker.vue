<template>
  <div class="ca-color-picker">
    <button
      v-for="(color, index) in colors"
      :key="index"
      :title="getColorName(color.label)"
      :style="'background-color:' + getColorHex(color.label)"
      :class="{
        'ca-color-picker__circle--current': color.label === currentColor
      }"
      class="ca-color-picker__circle"
      @click="colorChangeHandler(aliases[index])"
    ></button>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Used to change a color variant of a product.<br><br>
// **SASS-path:** _./styles/components/atoms/ca-color-picker.scss_
export default {
  name: 'CaColorPicker',
  components: {},
  mixins: [],
  props: {
    // A list of the available colors
    colors: {
      type: Array,
      required: true
    },
    // A String representing the current color chosen
    currentColor: {
      type: String,
      required: true
    },
    // A list of aliases matching the list of colors
    aliases: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    colorChangeHandler(alias) {
      this.$store.dispatch('startGlobalLoading');
      // @vuese
      // Color (product variant) is changed
      // @arg prod alias (String)
      this.$emit('changed', alias);
    },
    getColorName(value) {
      const name = value.split('#');
      return name[0];
    },
    getColorHex(value) {
      const hex = value.split('#');
      return '#' + hex[1];
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-color-picker';
</style>
