<template>
  <div class="ca-list-pagination" :class="'ca-list-pagination--' + direction">
    <CaListCountBar
      v-if="direction === 'next'"
      :min-count="minCount"
      :max-count="maxCount"
      :total-count="totalCount"
    />
    <div class="ca-list-pagination__showing">
      {{ paginationText }}
    </div>
    <a
      v-if="direction === 'next'"
      :href="buttonHref"
      class="ca-list-pagination__button ca-list-pagination__button--next"
      :class="{
        'ca-list-pagination__button--disabled': allProductsLoaded,
        'ca-list-pagination__button--loading': loading
      }"
      @click.prevent="$emit('loadmore')"
    >
      {{ $t('LOAD_MORE') }}
      <client-only>
        <CaSpinner
          class="ca-list-pagination__button-spinner"
          :loading="loading"
        />
      </client-only>
    </a>
    <a
      v-else-if="page > 1 && minCount > 1"
      :href="buttonHref"
      class="ca-list-pagination__button ca-list-pagination__button--prev"
      :class="{
        'ca-list-pagination__button--loading': loading
      }"
      @click.prevent="$emit('loadprev')"
    >
      {{ $t('LOAD_PREVIOUS') }}
      <client-only>
        <CaSpinner
          class="ca-list-pagination__button-spinner"
          :loading="loading"
        />
      </client-only>
    </a>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Buttons for paginating the product list<br><br>
// **SASS-path:** _./styles/components/molecules/ca-list-pagination.scss_
export default {
  name: 'CaListPagination',
  mixins: [],
  props: {
    // The direction of the pagination
    direction: {
      // `next` or `prev`
      type: String,
      default: 'next',
      validator(value) {
        return ['next', 'prev'].includes(value);
      }
    },
    // The total number of products
    totalCount: {
      type: Number,
      required: true
    },
    // Is the list loading?
    loading: {
      type: Boolean,
      required: true
    },
    // Current min count
    minCount: {
      type: Number,
      required: true
    },
    // Current max count
    maxCount: {
      type: Number,
      required: true
    },
    // If you want to override the pagination text, you can do it here
    text: {
      type: String,
      default: ''
    }
  },
  data: () => ({}),
  computed: {
    // @vuese
    // Current page
    // @type Number
    page() {
      return Number(this.$route.query.page) || 1;
    },
    // @vuese
    // Is the list partial?
    // @type Boolean
    isPartial() {
      return this.minCount > 1;
    },
    // @vuese
    // The pagination text
    // @type String
    paginationText() {
      if (this.text) {
        return this.text;
      }
      const text = this.isPartial
        ? this.$t('PAGINATION_SHOWING_PARTIAL', {
            sum: this.showing,
            total: this.totalCount
          })
        : this.$t('PAGINATION_SHOWING', {
            sum: this.maxCount,
            total: this.totalCount
          });
      return text + ' ' + this.$tc('PRODUCT_LOWERCASE', this.totalCount);
    },
    // @vuese
    // The href for the button
    // @type String
    buttonHref() {
      let page =
        Math.round(this.maxCount / this.$config.productListPageSize) + 1;
      if (this.direction === 'prev') {
        page = Math.round(this.minCount / this.$config.productListPageSize);
      }
      if ((this.direction === 'next' && this.allProductsLoaded) || page < 1) {
        return '';
      }
      return `${this.$route.path}?page=${page}`;
    },
    // @vuese
    // The span of products showing
    // @type String
    showing() {
      return this.minCount + ' - ' + this.maxCount;
    },
    // @vuese
    // Are all products loaded?
    // @type Boolean
    allProductsLoaded() {
      return this.maxCount >= this.totalCount;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-list-pagination';
</style>
