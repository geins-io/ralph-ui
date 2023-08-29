<template>
  <div class="ca-info-page-menu">
    <CaAccordionNavigation
      v-if="$store.getters.viewport === 'phone' && isAccordion"
      menu-location-id="info-pages"
    />
    <ul v-else-if="menu" class="ca-info-page-menu__list">
      <li
        v-for="item in menu.menuItems"
        :key="item.id"
        class="ca-info-page-menu__item"
      >
        <component
          :is="getBaseElem(item)"
          v-bind="getAttributes(item)"
          class="ca-info-page-menu__link"
          @click.native="clickHandler(item)"
        >
          {{ getLabel(item) }}
          <CaIcon class="ca-info-page-menu__link-icon" name="chevron-right" />
        </component>
        <ul v-if="item.children.length" class="ca-info-page-menu__submenu-list">
          <li
            v-for="childItem in item.children"
            :key="childItem.id"
            class="ca-info-page-menu__submenu-item"
          >
            <component
              :is="getBaseElem(childItem)"
              v-bind="getAttributes(childItem)"
              class="ca-info-page-menu__submenu-link"
              @click.native="clickHandler(childItem)"
            >
              {{ getLabel(childItem) }}
              <CaIcon
                class="ca-info-page-menu__link-icon"
                name="chevron-right"
              />
            </component>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import MixMenu from 'MixMenu';
// @group Molecules
// @vuese
// A menu suited for the info page sidebar<br><br>
// **SASS-path:** _./styles/components/molecules/ca-info-page-menu.scss_
export default {
  name: 'CaInfoPageMenu',
  mixins: [MixMenu],
  props: {
    // How to display info-menu in smaller devices
    phoneMode: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'accordion'].includes(value);
      },
    },
  },
  data: () => ({}),
  computed: {
    // @vuese
    // If the phone mode is an accordion
    // @type String
    isAccordion() {
      return this.phoneMode === 'accordion';
    },
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-info-page-menu';
</style>
