<template>
  <nav class="ca-navigation-slim">
    <ul class="ca-navigation-slim__list">
      <li
        v-for="(category, index) in topLevelCategories"
        :key="index"
        class="ca-navigation-slim__item"
      >
        <CaAccordionItem
          v-if="getSubLevelCategories(category.categoryId).length"
          class="ca-navigation-slim__parent"
        >
          <template v-slot:toggle>
            {{ category.name }}
          </template>
          <ul class="ca-navigation-slim__level ca-navigation-slim__level--2">
            <li class="ca-navigation-mobile__sub-item" @click="navClickHandler">
              <NuxtLink
                class="ca-navigation-slim__sub-link ca-navigation-slim__show-all"
                :to="'/c/' + category.alias"
              >
                Visa allt {{ category.name }}
              </NuxtLink>
            </li>
            <li
              v-for="(subcategory, subindex) in getSubLevelCategories(
                category.categoryId
              )"
              :key="subindex"
              class="ca-navigation-slim__sub-item"
              @click="navClickHandler"
            >
              <NuxtLink
                :to="'/c/' + subcategory.alias"
                class="ca-navigation-slim__sub-link"
              >
                {{ subcategory.name }}
              </NuxtLink>
            </li>
          </ul>
        </CaAccordionItem>
        <NuxtLink
          v-else
          class="ca-navigation-slim__link"
          :to="'/c/' + category.alias"
        >
          {{ category.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script>
import CaAccordionItem from 'CaAccordionItem';

import eventbus from '~/plugins/event-bus.js';

// @group Molecules
// @vuese
// Slim version of the navigation. Made to be used in the content panel
export default {
  name: 'CaNavigationSlim',
  components: { CaAccordionItem },
  mixins: [],
  props: {
    // Provide an Array of categories
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    activeCategories() {
      return this.categories
        ? this.categories.filter(item => item.activeProducts !== 0)
        : [];
    },
    topLevelCategories() {
      return this.categories
        ? this.activeCategories.filter(i => i.parentCategoryId === 0)
        : [];
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // Get the sublevel categories of current category
    // @arg Category id (Number)
    getSubLevelCategories(id) {
      return this.activeCategories.filter(i => i.parentCategoryId === id);
    },
    // Handle navigation link clicks
    navClickHandler() {
      eventbus.$emit('close-content-panel');
    }
  }
};
</script>
<style lang="scss">
.ca-navigation-slim {
  &__link {
    padding: $px16;
    display: block;
    font-size: $font-size-m;
    font-weight: $font-weight-bold;
  }
  &__level {
    background-color: $c-lightest-gray;
    padding: $px12 0;
  }
  &__sub-link {
    display: block;
    padding: $px12 $px24;
    font-size: $font-size-s;
  }
}
</style>
