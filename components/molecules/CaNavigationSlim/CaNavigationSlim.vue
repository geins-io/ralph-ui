<template>
  <nav class="ca-navigation-slim">
    <ul class="ca-navigation-slim__list">
      <li
        v-for="(category, index) in topLevelCategories"
        :key="index"
        class="ca-navigation-slim__item"
      >
        <LazyCaAccordionItem
          v-if="getSubLevelCategories(category.categoryId).length"
          class="ca-navigation-slim__parent"
        >
          <template #toggle-text>
            {{ category.name }}
          </template>
          <ul class="ca-navigation-slim__level ca-navigation-slim__level--2">
            <li class="ca-navigation-mobile__sub-item">
              <NuxtLink
                class="ca-navigation-slim__sub-link ca-navigation-slim__show-all"
                :to="category.canonicalUrl"
              >
                {{ $t('NAVIGATION_ALL_IN') }} {{ category.name }}
              </NuxtLink>
            </li>
            <li
              v-for="(subcategory, subindex) in getSubLevelCategories(
                category.categoryId,
              )"
              :key="subindex"
              class="ca-navigation-slim__sub-item"
            >
              <NuxtLink
                :to="subcategory.canonicalUrl"
                class="ca-navigation-slim__sub-link"
              >
                {{ subcategory.name }}
              </NuxtLink>
            </li>
          </ul>
        </LazyCaAccordionItem>
        <NuxtLink
          v-else
          class="ca-navigation-slim__link"
          :to="category.canonicalUrl"
        >
          {{ category.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script>
// @group Molecules
// @vuese
// Slim version of the navigation. Made to be used in the content panel<br><br>
// **SASS-path:** _./styles/components/molecules/ca-navigation-slim.scss_
export default {
  name: 'CaNavigationSlim',
  mixins: [],
  props: {
    // Provide an Array of categories
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    topLevelCategories() {
      return this.categories
        ? this.categories
            .filter((i) => i.parentCategoryId === 0)
            .sort((a, b) => {
              return a.order - b.order;
            })
        : [];
    },
  },
  watch: {},
  mounted() {},
  methods: {
    // Get the sublevel categories of current category
    // @arg Category id (Number)
    getSubLevelCategories(id) {
      return this.categories
        .filter((i) => i.parentCategoryId === id)
        .sort((a, b) => {
          return a.order - b.order;
        });
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-navigation-slim';
</style>
