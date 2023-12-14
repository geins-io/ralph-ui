<template>
  <CaAccordionItem
    v-if="menu && menu.menuItems && menu.menuItems.length"
    class="ca-footer-navigation-accordion"
    :icon-closed="iconClosed"
    :icon-open="iconOpen"
  >
    <template #toggle-text>
      {{ menu.title }}
    </template>
    <nav>
      <ul class="ca-footer-navigation-accordion__list">
        <li
          v-for="item in menu.menuItems"
          :key="item.id"
          class="ca-footer-navigation-accordion__item"
        >
          <component
            :is="getBaseElem(item)"
            v-bind="getAttributes(item)"
            class="ca-footer-navigation-accordion__link"
            @click.native="clickHandler(item)"
          >
            {{ getLabel(item) }}
          </component>
        </li>
      </ul>
    </nav>
  </CaAccordionItem>
</template>
<script>
import MixMenu from 'MixMenu';
// @group Molecules
// @vuese
// A navigation in an accordion fitting for the footer on mobile devices. Supports one level<br><br>
// **SASS-path:** _./styles/components/molecules/ca-footer-navigation-accordion.scss_
export default {
  name: 'CaFooterNavigationAccordion',
  mixins: [MixMenu],
  props: {
    // Icon name for when accordion is open
    iconOpen: {
      type: String,
      default: 'chevron-up',
    },
    // Icon name for when accordion is open
    iconClosed: {
      type: String,
      default: 'chevron-down',
    },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-footer-navigation-accordion';
</style>
