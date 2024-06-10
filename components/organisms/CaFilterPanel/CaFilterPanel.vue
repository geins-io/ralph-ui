<template>
  <LazyCaContentPanel
    v-if="filters"
    name="filters"
    enter-from="left"
    :title="$t('FILTERS')"
    class="ca-filter-panel"
  >
    <LazyCaAccordionItem
      v-if="
        filters.categories &&
        filters.categories.length &&
        $config.public.showCategoryFilter &&
        $config.public.showCategoryTreeViewFilter
      "
      class="ca-filter-panel__toggle"
      :open-on-init="contentpanel.frame === 'categories'"
    >
      <template #toggle-text>
        <div class="ca-filter-panel__toggle-content">
          <span class="ca-filter-panel__toggle-text">
            {{ $t('FILTER_LABEL_CATEGORIES') }}
          </span>
          <CaNotificationBadge
            :number="selection.categories.length"
            :positioned="false"
          />
        </div>
      </template>
      <LazyCaFilterMultiTreeView
        :values="filters.categories"
        :selection="selection.categories"
        @selectionchange="updateSelection($event, 'categories')"
      />
    </LazyCaAccordionItem>
    <LazyCaAccordionItem
      v-if="
        filters.categories &&
        filters.categories.length &&
        $config.public.showCategoryFilter &&
        !$config.public.showCategoryTreeViewFilter
      "
      class="ca-filter-panel__toggle"
      :open-on-init="contentpanel.frame === 'categories'"
    >
      <template #toggle-text>
        <div class="ca-filter-panel__toggle-content">
          <span class="ca-filter-panel__toggle-text">
            {{ $t('FILTER_LABEL_CATEGORIES') }}
          </span>
          <CaNotificationBadge
            :number="selection.categories.length"
            :positioned="false"
          />
        </div>
      </template>
      <LazyCaFilterMulti
        :values="filters.categories"
        :selection="selection.categories"
        @selectionchange="updateSelection($event, 'categories')"
      />
    </LazyCaAccordionItem>
    <LazyCaAccordionItem
      v-if="
        filters.brands &&
        filters.brands.length &&
        $config.public.showBrandsFilter
      "
      class="ca-filter-panel__toggle"
      :open-on-init="contentpanel.frame === 'brands'"
    >
      <template #toggle-text>
        <div class="ca-filter-panel__toggle-content">
          <span class="ca-filter-panel__toggle-text">
            {{ $t('FILTER_LABEL_BRANDS') }}
          </span>
          <CaNotificationBadge
            :number="selection.brands.length"
            :positioned="false"
          />
        </div>
      </template>
      <LazyCaFilterMulti
        :values="filters.brands"
        :selection="selection.brands"
        @selectionchange="updateSelection($event, 'brands')"
      />
    </LazyCaAccordionItem>
    <LazyCaAccordionItem
      v-if="filters.skus && filters.skus.length && $config.public.showSkuFilter"
      class="ca-filter-panel__toggle"
      :open-on-init="contentpanel.frame === 'skus'"
    >
      <template #toggle-text>
        <div class="ca-filter-panel__toggle-content">
          <span class="ca-filter-panel__toggle-text">
            {{ $t('FILTER_LABEL_SKUS') }}
          </span>
          <CaNotificationBadge
            :number="selection.skus.length"
            :positioned="false"
          />
        </div>
      </template>
      <LazyCaFilterMulti
        :values="filters.skus"
        :selection="selection.skus"
        @selectionchange="updateSelection($event, 'skus')"
      />
    </LazyCaAccordionItem>
    <LazyCaAccordionItem
      v-if="
        filters.price && filters.price.length && $config.public.showPriceFilter
      "
      class="ca-filter-panel__toggle"
      :open-on-init="contentpanel.frame === 'price'"
    >
      <template #toggle-text>
        <div class="ca-filter-panel__toggle-content">
          <span class="ca-filter-panel__toggle-text">
            {{ $t('FILTER_LABEL_PRICE') }}
          </span>
          <CaNotificationBadge
            :number="selection.price.length"
            :positioned="false"
          />
        </div>
      </template>
      <LazyCaFilterMulti
        :values="filters.price"
        :selection="selection.price"
        @selectionchange="updateSelection($event, 'price')"
      />
    </LazyCaAccordionItem>
    <LazyCaAccordionItem
      v-for="(filter, index) in filters.parameters"
      :key="index"
      class="ca-filter-panel__toggle"
      :open-on-init="contentpanel.frame === filter.filterId"
    >
      <template #toggle-text>
        <div class="ca-filter-panel__toggle-content">
          <span class="ca-filter-panel__toggle-text">
            {{ filter.label }}
          </span>
          <CaNotificationBadge
            :number="getParameterSelection(filter.filterId).length || 0"
            :positioned="false"
          />
        </div>
      </template>
      <LazyCaFilterMulti
        :values="filter.values"
        :selection="getParameterSelection(filter.filterId)"
        @selectionchange="
          updateSelection($event, 'parameters', filter.filterId)
        "
      />
    </LazyCaAccordionItem>
    <LazyCaAccordionItem
      v-if="
        filters.discount &&
        filters.discount.length &&
        $config.public.showDiscountFilter
      "
      class="ca-filter-panel__toggle"
      :open-on-init="contentpanel.frame === 'discount'"
    >
      <template #toggle-text>
        <div class="ca-filter-panel__toggle-content">
          <span class="ca-filter-panel__toggle-text">
            {{ $t('FILTER_LABEL_DISCOUNT') }}
          </span>
          <CaNotificationBadge
            :number="selection.discount.length"
            :positioned="false"
          />
        </div>
      </template>
      <LazyCaFilterMulti
        :values="filters.discount"
        :selection="selection.discount"
        @selectionchange="updateSelection($event, 'discount')"
      />
    </LazyCaAccordionItem>
    <template #footer>
      <div class="ca-filter-panel__footer">
        <div class="ca-filter-panel__list-info">
          {{ totalProducts }}
          {{ $tc('PRODUCT_LOWERCASE', totalProducts) }} -
          {{ totalFiltersActive }}
          {{ $tc('FILTERS_ACTIVE', totalFiltersActive) }}
        </div>
        <div class="ca-filter-panel__buttons-wrap">
          <CaButton
            class="ca-filter-panel__button-reset"
            color="secondary"
            :size="buttonSize"
            type="full-width"
            :disabled="!selectionActive"
            @clicked="resetFilters"
          >
            {{ $t('RESET_FILTER') }}
          </CaButton>
          <CaButton
            class="ca-filter-panel__button-apply"
            :size="buttonSize"
            type="full-width"
            @clicked="closeContentPanel"
          >
            {{ $t('APPLY_FILTER') }}
          </CaButton>
        </div>
      </div>
    </template>
  </LazyCaContentPanel>
</template>
<script>
import { mapState } from 'vuex';

// @group Organisms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/organisms/ca-filter-panel.scss_
export default {
  name: 'CaFilterPanel',
  mixins: [],
  props: {
    filters: {
      type: Object,
      required: true,
    },
    selection: {
      type: Object,
      required: true,
    },
    selectionActive: {
      type: Boolean,
      required: true,
    },
    totalProducts: {
      type: Number,
      required: true,
    },
    totalFiltersActive: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    currentSelection: {},
  }),
  computed: {
    buttonSize() {
      return this.$store.getters.viewport === 'phone' ? 's' : 'm';
    },
    ...mapState(['contentpanel']),
  },
  watch: {
    selection(newVal) {
      this.currentSelection = newVal;
    },
  },
  mounted() {
    this.currentSelection = this.selection;
  },
  methods: {
    resetFilters() {
      this.$emit('reset');
    },
    closeContentPanel() {
      this.$nuxt.$emit('close-content-panel');
    },
    updateSelection(selection, type, group = null) {
      if (group) {
        const obj = this.currentSelection.parameters;
        if (obj[group]) {
          obj[group] = selection;
        } else {
          this.$set(obj, group, selection);
        }
        this.$set(this.currentSelection, 'parameters', obj);
      } else {
        this.currentSelection[type] = selection;
      }
      this.$emit('selectionchange', this.currentSelection);
    },
    getParameterSelection(group) {
      const selection = this.selection.parameters[group];
      return selection || [];
    },
  },
};
</script>
<style lang="scss">
@import 'organisms/ca-filter-panel';
</style>
