<template>
  <nav class="ca-footer-navigation">
    <h2 v-if="menu.title" class="ca-footer-navigation__title">
      {{ menu.title }}
    </h2>
    <ul v-if="menu" class="ca-footer-navigation__list">
      <li
        v-for="item in menu.menuItems"
        :key="item.id"
        class="ca-footer-navigation__item"
      >
        <component
          :is="getBaseElem(item)"
          v-bind="getAttributes(item)"
          class="ca-footer-navigation__link"
        >
          {{ getLabel(item) }}
        </component>
      </li>
    </ul>
  </nav>
</template>
<script>
import MixMenu from 'MixMenu';
// @group Atoms
// @vuese
// A navigation fitting for a footer column. Supports one level<br><br>
// **SASS-path:** _./styles/components/atoms/ca-footer-navigation.scss_
export default {
  name: 'CaFooterNavigation',
  mixins: [MixMenu],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-footer-navigation';
</style>
