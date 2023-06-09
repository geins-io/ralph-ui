<template>
  <nav ref="menu" class="ca-header-navigation" :class="modifiers">
    <ul v-if="menu" class="ca-header-navigation__items">
      <li
        v-for="item in menu.menuItems"
        :key="item.id"
        class="ca-header-navigation__item"
        :class="{
          'ca-header-navigation__item--open':
            open === item.id && item.children.length
        }"
        @mouseover="handleMouseOver(item.id)"
        @mouseleave="handleMouseLeave"
        @click="handleClick(item.id)"
      >
        <component
          :is="getElem(item)"
          v-bind="getAttrs(item)"
          class="ca-header-navigation__link"
          @click.native="clickHandler(item)"
        >
          <CaIconAndText
            v-if="item.children.length"
            icon-name="chevron-down"
            icon-position="right"
            class="ca-header-navigation__link-label"
          >
            {{ getLabel(item) }}
          </CaIconAndText>
          <span v-else class="ca-header-navigation__link-label">
            {{ getLabel(item) }}
          </span>
        </component>
        <div v-if="item.children.length" class="ca-header-navigation__children">
          <component
            :is="containerElem"
            class="ca-header-navigation__children-container"
          >
            <component
              :is="getBaseElem(item)"
              v-if="menuState === 'click' && showAllLink"
              v-bind="getAttributes(item)"
              class="ca-header-navigation__children-show-all only-computer"
              @click.native="clickHandler(item)"
            >
              {{ $t('NAVIGATION_ALL_IN') }} {{ getLabel(item) }}
            </component>
            <ul class="ca-header-navigation__children-list">
              <li
                v-for="childItem in item.children"
                :key="childItem.id"
                class="ca-header-navigation__child-item"
                :class="{
                  'ca-header-navigation__child-item--parent':
                    childItem.children.length > 0
                }"
              >
                <component
                  :is="getBaseElem(childItem)"
                  v-bind="getAttributes(childItem)"
                  class="ca-header-navigation__child-link"
                  @click.native="clickHandler(childItem)"
                >
                  {{ getLabel(childItem) }}
                </component>
                <CaIcon
                  v-if="childItem.children.length && type === 'boxed'"
                  name="chevron-right"
                  class="ca-header-navigation__icon"
                />
                <ul
                  v-if="childItem.children.length"
                  class="ca-header-navigation__grand-children"
                >
                  <li
                    v-for="grandChildItem in childItem.children"
                    :key="grandChildItem.id"
                    class="ca-header-navigation__grand-child-item"
                  >
                    <component
                      :is="getBaseElem(grandChildItem)"
                      v-bind="getAttributes(grandChildItem)"
                      class="ca-header-navigation__grand-child-link"
                      @click.native="clickHandler(grandChildItem)"
                    >
                      {{ getLabel(grandChildItem) }}
                    </component>
                  </li>
                </ul>
              </li>
            </ul>
          </component>
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
import MixMenu from 'MixMenu';
// @group Molecules
// @vuese
// Navigation fitting for the header. Supports three levels<br><br>
// **SASS-path:** _./styles/components/molecules/ca-header-navigation.scss_
export default {
  name: 'CaHeaderNavigation',
  mixins: [MixMenu],
  props: {
    // What type/style of menu should be displayed
    type: {
      // `full-width` / `boxed`
      type: String,
      default: 'full-width'
    },
    // Choose between hover or click to open menu
    menuState: {
      type: String,
      default: 'hover',
      validator(value) {
        return ['click', 'hover'].includes(value);
      }
    },
    // Show the "show all" link in the menu
    showAllLink: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    open: 0
  }),
  computed: {
    modifiers() {
      return 'ca-header-navigation--' + this.type;
    },
    containerElem() {
      return this.type === 'full-width' ? 'CaContainer' : 'div';
    }
  },
  watch: {},
  mounted() {
    document.body.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    openMenu(id) {
      this.open = id;
    },
    closeMenu() {
      this.open = 0;
    },
    toggleMenu(id) {
      if (this.open !== id) {
        this.closeMenu();
        this.openMenu(id);
      } else {
        this.closeMenu();
      }
    },
    handleClick(id) {
      if (this.menuState === 'click') {
        this.toggleMenu(id);
      } else {
        this.closeMenu();
      }
    },
    handleMouseOver(id) {
      if (this.menuState === 'hover') {
        this.openMenu(id);
      }
    },
    handleMouseLeave() {
      if (this.menuState === 'hover') {
        this.closeMenu();
      }
    },
    getElem(item) {
      if (this.menuState === 'hover') {
        return this.getBaseElem(item);
      }
      return item.children.length ? 'button' : this.getBaseElem(item);
    },
    getAttrs(item) {
      if (this.menuState === 'hover') {
        return this.getAttributes(item);
      }
      return item.children.length
        ? {
            type: 'button',
            'aria-expanded': this.open === item.id
          }
        : this.getAttributes(item);
    },
    handleClickOutside(e) {
      const menuRef = this.$refs.menu;
      const isMenuClicked = menuRef && menuRef.contains(e.target);

      if (!isMenuClicked) {
        this.closeMenu();
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-header-navigation';
</style>
