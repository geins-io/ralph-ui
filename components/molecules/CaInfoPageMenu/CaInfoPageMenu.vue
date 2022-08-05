<template>
  <div class="ca-info-page-menu">
    <ul v-if="menu" class="ca-info-page-menu__list">
      <li
        v-for="item in menu.menuItems"
        :key="item.id"
        class="ca-info-page-menu__item"
      >
        <component
          :is="getBaseElem(item)"
          v-bind="getAttributes(item)"
          class="ca-info-page-menu__link"
        >
          {{ getLabel(item) }}
          <CaIcon class="ca-info-page-menu__link-icon" name="chevron-right" />
        </component>
      </li>
    </ul>
  </div>
</template>
<script>
import MixMenu from 'MixMenu';
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-info-page-menu.scss_
export default {
  name: 'CaInfoPageMenu',
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
@import 'molecules/ca-info-page-menu';
</style>
