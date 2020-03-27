<template>
  <span class="ca-icon" v-html="svgFile"> </span>
</template>
<script>
// @group Atoms
// Display an inline svg icon. Default icon library is [Feather icons](https://feathericons.com/).
export default {
  name: 'CaIcon',
  components: {},
  mixins: [],
  props: {
    // If you are using default setup, any name from [Feather icons](https://feathericons.com/) works. Otherwise use name of svg-file (without '.svg') in assets/icons library
    name: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    svgFile() {
      return require('!svg-inline-loader!~/assets/icons/' + this.name + '.svg');
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss"></style>
