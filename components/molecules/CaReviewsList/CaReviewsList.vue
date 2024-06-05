<template>
  <section class="ca-reviews-list">
    <div class="ca-reviews-list__header">
      <h3 class="ca-reviews-list__header-text">
        {{ $t('PRODUCT_REVIEWS') }} ({{ totalReviewsCount }})
      </h3>
      <client-only>
        <LazyCaStarRating
          v-if="canShowMainStarRate"
          class="ca-reviews-list__header-counter"
          :default-rate="averageRating"
        />
      </client-only>
    </div>

    <p v-if="!reviews.length" class="ca-reviews-list__empty">
      {{ $t('REVIEWS_LIST_EMPTY') }}
    </p>

    <article
      v-for="(review, index) in reviews"
      :key="review.author + index"
      class="ca-reviews-list__reviews"
    >
      <LazyCaStarRating
        v-if="$config.public.showStarsInProductReviewForm"
        class="ca-reviews-list__reviews-stars"
        :show-counter="false"
        :default-rate="review.rating"
      />
      <p class="ca-reviews-list__reviews-comment">
        {{ review.comment }}
      </p>
      <div class="ca-reviews-list__reviews-info">
        <span class="ca-reviews-list__reviews-info-written-by">
          {{ $t('REVIEW_WRITTEN_BY') }}
        </span>
        <span class="ca-reviews-list__reviews-info-author">
          {{ review.author }}
        </span>
        <strong class="ca-reviews-list__reviews-info-separator">|</strong>
        <span class="ca-reviews-list__reviews-info-date">
          {{
            new Date(review.reviewDate).toLocaleDateString('en-GB', {
              dateStyle: 'medium',
            })
          }}
        </span>
      </div>
    </article>

    <ol v-if="pages > 0" class="ca-reviews-list__pagination">
      <li
        v-for="page of pages"
        :key="page"
        :class="[
          'ca-reviews-list__pagination-item',
          { 'ca-reviews-list__pagination-item--active': page === currentPage },
        ]"
      >
        <a
          class="ca-reviews-list__pagination-item-inner"
          @click="goToReviewsPage(page)"
          >{{ page }}</a
        >
      </li>
    </ol>
  </section>
</template>
<script>
import reviews from 'product/reviews.graphql';
import MixFetch from 'MixFetch';

// indicates how many reviews should be displayed on 1 page in pagination
const REVIEWS_PER_PAGE = 5;

// @group Molecules
// @vuese
// Component to display paginated reviews (comments) for specific product<br><br>
// **SASS-path:** _./styles/components/molecules/ca-reviews-list.scss_
export default {
  name: 'CaReviewsList',
  mixins: [MixFetch],
  props: {
    // The product alias to fetch reviews for
    productAlias: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    reviews: [],
    totalReviewsCount: 0,
    currentPage: 1,
    averageRating: 0,
  }),
  async fetch() {
    const callback = (result) => {
      const {
        reviews = [],
        count = 0,
        averageRating = 0,
      } = result?.data?.reviews;
      this.totalReviewsCount = count;
      this.averageRating = averageRating;
      return reviews;
    };

    this.reviews = await this.fetchData(reviews, callback);
  },
  computed: {
    // @vuese
    // variables to fetch reviews
    // @type Object
    variables() {
      return {
        take: REVIEWS_PER_PAGE,
        skip: this.skipElements,
        alias: this.productAlias,
      };
    },
    // @vuese
    // total amount of available pages of products (page size indicated by var 'REVIEWS_PER_PAGE')
    // @type Number
    pages() {
      const innerPages = this.totalReviewsCount
        ? Math.ceil(this.totalReviewsCount / REVIEWS_PER_PAGE)
        : 0;
      return innerPages;
    },
    // @vuese
    // number of elements to skip (number of elements to cut from total list to display elements for current page)
    // @type Number
    skipElements() {
      return (this.currentPage - 1) * REVIEWS_PER_PAGE;
    },
    // @vuese
    // indicates if total product review count should be displayed
    // @type Boolean
    canShowMainStarRate() {
      return (
        !!this.averageRating && this.$config.public.showStarsInProductReviewForm
      );
    },
  },
  mounted() {},
  methods: {
    // @vuese
    // change page to display the other reviews
    // @arg page (Number)
    goToReviewsPage(page) {
      this.currentPage = page;
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-reviews-list';
</style>
