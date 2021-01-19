<template>
  <ul v-if="categories && categories.length" class="ca-category-display">
    <li
      v-for="(category, index) in categories"
      :key="index"
      class="ca-category-display__item"
    >
      <CaButton
        class="ca-category-display__button"
        :href="'/c/' + category.alias"
        size="s"
      >
        {{ category.name }}
      </CaButton>
    </li>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
// Display list of categories as buttons. Often used in list page headers<br><br>
// **SASS-path:** _./styles/components/molecules/ca-category-display.scss_
export default {
  name: 'CaCategoryDisplay',
  mixins: [],
  props: {
    // List of categories to display. Must include name and alias
    categories: {
      type: Array,
      required: true
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
@import 'molecules/ca-category-display';
</style>
