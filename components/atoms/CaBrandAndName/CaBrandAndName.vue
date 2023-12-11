<template>
  <div class="ca-brand-and-name">
    <div v-if="brand !== ''" class="ca-brand-and-name__brand">
      <NuxtLink
        v-if="brandAlias !== ''"
        class="ca-brand-and-name__brand-link"
        :to="brandAlias"
      >
        {{ brand }}
      </NuxtLink>
      <span v-else>
        {{ brand }}
      </span>
    </div>
    <component :is="nameTag" class="ca-brand-and-name__name">
      {{ name }}
    </component>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// The brand and name of the product. Used for example in product card, cart product and on PDP<br><br>
// **SASS-path:** _./styles/components/atoms/ca-brand-and-name.scss_
export default {
  name: 'CaBrandAndName',
  mixins: [],
  props: {
    // The brand name. Leave empty to not show brand
    brand: {
      type: String,
      default: '',
    },
    // The brand alias. If provided the brand name will be linked
    brandAlias: {
      type: String,
      default: '',
    },
    // The product name
    name: {
      type: String,
      required: true,
    },
    // The name html tag
    nameTag: {
      type: String,
      default: 'h2',
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
@import 'atoms/ca-brand-and-name';
</style>
