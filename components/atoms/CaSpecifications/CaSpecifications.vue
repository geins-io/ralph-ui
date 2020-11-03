<template>
  <div class="ca-specifications">
    <div
      v-for="(group, index) in specificationGroups"
      :key="index"
      class="ca-specifications__group"
    >
      <component :is="groupNameTagName" class="ca-specifications__group-name">
        {{ group.name }}
      </component>
      <ul class="ca-specifications__list">
        <li
          v-for="(item, index1) in group.parameters"
          :key="index1"
          class="ca-specifications__item"
        >
          <span class="ca-specifications__label">{{ item.name }}</span>
          <span class="ca-specifications__value">{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// This is used to display product specifications in a table like format<br><br>
// **SASS-path:** _./styles/components/atoms/ca-specifications.scss_
export default {
  name: 'CaSpecifications',
  components: {},
  mixins: [],
  props: {
    // Array of parameter groups
    specificationGroups: {
      type: Array,
      required: true
    },
    // Tag name for group name
    groupNameTagName: {
      type: String,
      default: 'h3'
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-specifications';
</style>
