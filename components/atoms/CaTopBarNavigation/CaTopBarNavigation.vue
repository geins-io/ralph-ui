<template>
  <ul v-if="menu" class="ca-top-bar-navigation">
    <li v-for="item in menu.menuItems" :key="item.id">
      <component
        :is="getBaseElem(item)"
        v-bind="getAttributes(item)"
        class="ca-top-bar-navigation__link"
      >
        {{ getLabel(item) }}
      </component>
    </li>
  </ul>
</template>
<script>
import MixMenu from 'MixMenu';
// @group Atoms
// @vuese
// A navigation fitting for the top bar. Supports one level<br><br>
// **SASS-path:** _./styles/components/atoms/ca-top-bar-navigation.scss_
export default {
  name: 'CaTopBarNavigation',
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
@import 'atoms/ca-top-bar-navigation';
</style>
