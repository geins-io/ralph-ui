<template>
  <nav class="ca-panel-navigation">
    <ul v-if="menu" class="ca-panel-navigation__items">
      <li
        v-for="item in menu.menuItems"
        :key="item.id"
        class="ca-panel-navigation__item"
      >
        <CaAccordionItem
          v-if="item.children.length"
          class="ca-panel-navigation__parent"
          icon-open="chevron-up"
          icon-closed="chevron-down"
          :styled="false"
        >
          <template #toggle-text>
            {{ getLabel(item) }}
          </template>
          <ul class="ca-panel-navigation__children">
            <li class="ca-panel-navigation__child-item">
              <component
                :is="getBaseElem(item)"
                v-bind="getAttributes(item)"
                class="ca-panel-navigation__child-link ca-panel-navigation__child-link--all"
                @click.native="clickHandler(item)"
              >
                {{ getParentLinkLabel(item) }}
              </component>
            </li>
            <li
              v-for="childItem in item.children"
              :key="childItem.id"
              class="ca-panel-navigation__child-item"
            >
              <CaAccordionItem
                v-if="childItem.children.length"
                class="ca-panel-navigation__child-parent"
                icon-open="chevron-up"
                icon-closed="chevron-down"
                :styled="false"
              >
                <template #toggle-text>
                  {{ getLabel(childItem) }}
                </template>
                <ul class="ca-panel-navigation__grand-children">
                  <li class="ca-panel-navigation__grand-child-item">
                    <component
                      :is="getBaseElem(childItem)"
                      v-bind="getAttributes(childItem)"
                      class="ca-panel-navigation__grand-child-link ca-panel-navigation__grand-child-link--all"
                      @click.native="clickHandler(childItem)"
                    >
                      {{ getParentLinkLabel(childItem) }}
                    </component>
                  </li>
                  <li
                    v-for="grandChildItem in childItem.children"
                    :key="grandChildItem.id"
                    class="ca-panel-navigation__grand-child-item"
                  >
                    <component
                      :is="getBaseElem(grandChildItem)"
                      v-bind="getAttributes(grandChildItem)"
                      class="ca-panel-navigation__grand-child-link"
                      @click.native="clickHandler(grandChildItem)"
                    >
                      {{ getLabel(grandChildItem) }}
                    </component>
                  </li>
                </ul>
              </CaAccordionItem>
              <component
                :is="getBaseElem(childItem)"
                v-else
                v-bind="getAttributes(childItem)"
                class="ca-panel-navigation__child-link"
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
          class="ca-panel-navigation__link"
          @click.native="clickHandler(item)"
        >
          {{ getLabel(item) }}
        </component>
      </li>
    </ul>
    <CaSpinner v-else class="ca-panel-navigation__spinner" :loading="true" />
  </nav>
</template>
<script>
import MixMenu from 'MixMenu';
// @group Molecules
// @vuese
// Navigation fitting for a panel. Supports three levels<br><br>
// **SASS-path:** _./styles/components/molecules/ca-panel-navigation.scss_
export default {
  name: 'CaPanelNavigation',
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
@import 'molecules/ca-panel-navigation';
</style>
