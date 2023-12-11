<template>
  <div class="ca-list-top">
    <div v-if="type === 'search' || type === 'all'" class="ca-list-top__text">
      <h1 v-if="listInfo && listInfo.name" class="ca-list-top__title">
        {{ listInfo.name }}
      </h1>
    </div>
    <div v-else class="ca-list-top__text">
      <h1 v-if="listInfo && !listInfo.hideTitle" class="ca-list-top__title">
        {{ listInfo.name }}
      </h1>
      <CaSkeleton
        v-else-if="!listInfo"
        class="ca-list-top__title ca-list-top__title--skeleton"
        width="30%"
      />
      <CaReadMore
        v-if="
          listInfo && !!listInfo.primaryDescription && !listInfo.hideDescription
        "
        class="ca-list-top__description"
      >
        <CaHtml :content="listInfo.primaryDescription" />
      </CaReadMore>
      <div
        v-else-if="!listInfo"
        class="ca-list-top__description ca-list-top__description--skeleton"
      >
        <CaSkeleton width="70%" />
        <CaSkeleton />
        <CaSkeleton width="60%" />
      </div>
    </div>
    <CaCategoryDisplay
      v-if="listInfo && listInfo.subCategories"
      class="ca-list-top__subcategories"
      :categories="listInfo.subCategories"
    />
  </div>
</template>
<script>
// @group Molecules
// @vuese
// A component that displays the top of a list page, above the settings, filters and products.<br><br>
// **SASS-path:** _./styles/components/molecules/ca-list-top.scss_
export default {
  name: 'CaListTop',
  mixins: [],
  props: {
    // The type of list page
    type: {
      type: String,
      required: true,
    },
    // The list info object. For dynamic pages it is received from the api, otherwise a static object is passed
    listInfo: {
      type: Object,
      default: () => {},
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
@import 'molecules/ca-list-top';
</style>
