<template>
  <nav
    v-if="menu && menu.menuItems && menu.menuItems.length"
    class="ca-accordion-navigation"
  >
    <div
      v-for="item in menu.menuItems"
      :key="item.id"
      class="ca-accordion-navigation__inner"
    >
      <CaAccordionItem
        v-if="item.children.length"
        :icon-closed="iconClosed"
        :icon-open="iconOpen"
        :open-on-init="openWhenActive(item)"
        class="ca-accordion-navigation__item"
      >
        <template #toggle-text>
          <component
            :is="getBaseElem(item)"
            v-bind="getAttributes(item)"
            class="ca-accordion-navigation__link"
            @click.native="clickHandler(item)"
          >
            {{ getLabel(item) }}
          </component>
        </template>
        <ul class="ca-accordion-navigation__submenu-list">
          <li
            v-for="childItem in item.children"
            :key="childItem.id"
            class="ca-accordion-navigation__submenu-item"
          >
            <component
              :is="getBaseElem(childItem)"
              v-bind="getAttributes(childItem)"
              class="ca-accordion-navigation__submenu-link"
              @click.native="clickHandler(childItem)"
            >
              {{ getLabel(childItem) }}
            </component>
          </li>
        </ul>
      </CaAccordionItem>
      <component
        :is="getBaseElem(item)"
        v-else
        v-bind="getAttributes(item)"
        class="ca-accordion-navigation__link"
        @click.native="clickHandler(item)"
      >
        {{ getLabel(item) }}
      </component>
    </div>
  </nav>
</template>
<script>
import MixMenu from 'MixMenu';
// @group Molecules
// @vuese
// A component that displays a menu as an accordion<br><br>
// **SASS-path:** _./styles/components/molecules/ca-accordion-navigation.scss_
export default {
  name: 'CaAccordionNavigation',
  mixins: [MixMenu],
  props: {
    // Icon name for when accordion is open
    iconOpen: {
      type: String,
      default: 'chevron-up'
    },
    // Icon name for when accordion is open
    iconClosed: {
      type: String,
      default: 'chevron-down'
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // Keeps submenu in accordion open when url match one of its children
    // @arg url (String)
    openWhenActive(item) {
      const currentPage = this.$route?.path;

      return (
        encodeURI(item.canonicalUrl) === currentPage ||
        item.children.some(
          child => encodeURI(child.canonicalUrl) === currentPage
        )
      );
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-accordion-navigation';
</style>
