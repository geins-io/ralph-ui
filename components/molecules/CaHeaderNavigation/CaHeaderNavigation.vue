<template>
  <nav class="ca-header-navigation" :class="modifiers">
    <ul v-if="menu" class="ca-header-navigation__items">
      <li
        v-for="item in menu.menuItems"
        :key="item.id"
        class="ca-header-navigation__item"
      >
        <component
          :is="getBaseElem(item)"
          v-bind="getAttributes(item)"
          class="ca-header-navigation__link"
        >
          <CaIconAndText
            v-if="item.children.length"
            icon-name="chevron-down"
            icon-position="right"
          >
            {{ getLabel(item) }}
          </CaIconAndText>
          <span v-else>{{ getLabel(item) }}</span>
        </component>
        <div v-if="item.children.length" class="ca-header-navigation__children">
          <component
            :is="containerElem"
            class="ca-header-navigation__children-container"
          >
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
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return 'ca-header-navigation--' + this.type;
    },
    containerElem() {
      return this.type === 'full-width' ? 'CaContainer' : 'div';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-header-navigation';
</style>
