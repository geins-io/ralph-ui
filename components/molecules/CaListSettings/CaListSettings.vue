<template>
  <div class="ca-list-settings">
    <CaClickable
      class="ca-list-settings__filter-toggle only-mobile"
      @clicked="
        $store.commit('contentpanel/open', {
          name: 'filters',
        })
      "
    >
      <CaIconAndText
        class="ca-list-settings__icon-text"
        icon-name="chevron-right"
        icon-position="right"
        base-element="div"
      >
        <div class="ca-list-settings__filter-button-wrap">
          {{ $t('FILTERS') }}
          <CaNotificationBadge
            :number="activeFilters"
            :positioned="false"
            class="ca-list-settings__active-filters"
          />
        </div>
      </CaIconAndText>
    </CaClickable>
    <div class="ca-list-settings__sort">
      <span class="ca-list-settings__title only-computer">
        {{ $t('SORT_TITLE') }}:
      </span>
      <CaInputSelect
        v-if="sort"
        v-model="sort"
        class="ca-list-settings__sort-select"
        :options="sortOptions"
      />
    </div>
    <div class="ca-list-settings__active-products">
      <strong>{{ activeProducts }}</strong>
      {{ $tc('PRODUCT_LOWERCASE', activeProducts) }}
    </div>
  </div>
</template>
<script>
import MixProductListSort from 'MixProductListSort';
// @group Molecules
// @vuese
// The list settings for the list page. Through the mixin `MixProductListSort` there is a prop available to set custom default sort options<br><br>
// **SASS-path:** _./styles/components/molecules/ca-list-settings.scss_
export default {
  name: 'CaListSettings',
  mixins: [MixProductListSort],
  props: {
    activeProducts: {
      type: Number,
      required: true,
    },
    activeFilters: {
      type: Number,
      required: true,
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
@import 'molecules/ca-list-settings';
</style>
