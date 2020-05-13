<template>
  <div class="ca-image">
    <img
      v-show="loaded"
      class="ca-image__img"
      :src="imageUrl"
      @load="loadedAction"
    />
    <img v-if="!loaded" class="ca-image__img" :src="placeholder" />
  </div>
</template>
<script>
// @group Atoms
// @vuese
export default {
  name: 'CaImage',
  components: {},
  mixins: [],
  props: {
    size: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loaded: false
  }),
  computed: {
    imageUrl() {
      return (
        process.env.IMAGE_SERVER +
        '/' +
        this.type +
        '/' +
        this.size +
        '/' +
        this.filename
      );
    }
  },
  watch: {},
  mounted() {},
  methods: {
    loadedAction() {
      this.loaded = true;
      this.$emit('loaded');
    }
  }
};
</script>
<style lang="scss">
.ca-image {
}
</style>
