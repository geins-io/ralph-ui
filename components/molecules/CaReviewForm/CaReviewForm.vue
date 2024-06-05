<template>
  <section class="ca-review-form">
    <h3 class="ca-review-form__header">
      {{ $t('REVIEW_WRITE') }}
    </h3>

    <div v-if="!showForm && !isAuthenticated" class="ca-review-form__login">
      <p class="ca-review-form__login-message">
        {{ $t('REVIEW_NEED_LOG_IN') }}
      </p>
      <CaButton
        class="ca-review-form__login-button"
        size="s"
        @clicked="openLoginPanel"
      >
        {{ $t('LOG_IN') }}
      </CaButton>
    </div>

    <div v-else-if="!showForm" class="ca-review-form__default">
      <CaButton
        class="ca-review-form__login-button"
        size="s"
        @clicked="showForm = true"
      >
        {{ $t('REVIEW_WRITE') }}
      </CaButton>
    </div>

    <div v-else-if="showForm && !success" class="ca-review-form__form">
      <LazyCaStarRating
        v-if="$config.public.showStarsInProductReviewForm"
        :show-counter="false"
        :read-only="false"
        class="ca-review-form__form-stars"
        @getProductStarRate="setRate"
      />
      <LazyCaFeedback
        ref="feedback"
        class="ca-review-form__form-feedback"
        type="error"
        :message="feedbackMessage"
      />
      <CaInputText
        id="author"
        ref="author"
        v-model="reviewForm.author"
        type="text"
        class="ca-review-form__form-author"
        validate="empty"
        autocomplete="username"
        :maxlength="50"
        :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
        :label="$t('REVIEW_NAME_PLACEHOLDER')"
        required
        @validation="checkValid"
      />
      <CaInputTextarea
        id="comment"
        ref="comment"
        v-model="reviewForm.comment"
        type="text"
        class="ca-review-form__form-comment"
        :maxlength="150"
        :label="$t('REVIEW_COMMENT_PLACEHOLDER')"
        :error-message="$t('FEEDBACK_REQUIRED_FIELD')"
        :required="shouldValidateCommentInput"
        :valid="shouldValidateCommentInput ? undefined : true"
        validate="empty"
        @validation="checkValid"
      />
      <CaButton
        class="ca-review-form__form-button"
        size="s"
        :loading="loading"
        :disabled="isButtonDisabled"
        @clicked="confirmReviewForm"
      >
        {{ $t('SEND') }}
      </CaButton>
    </div>

    <p v-else-if="success" class="ca-review-form__form-success">
      {{ $t('REVIEW_IN_ACCEPTANCE') }}
    </p>
  </section>
</template>
<script>
import postProductReviewMutation from 'product/post-product-review.graphql';
import MixFetch from 'MixFetch';
import { mapGetters } from 'vuex';

// @group Molecules
// @vuese
// Form component to add review (comment) <br><br>
// **SASS-path:** _./styles/components/molecules/ca-review-form.scss_
export default {
  name: 'CaReviewForm',
  mixins: [MixFetch],
  props: {
    productAlias: {
      type: String,
      default: '',
    },
    productStarRating: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    loading: false,
    showForm: false,
    success: false,
    reviewForm: {
      author: '',
      comment: '',
    },
    feedbackMessage: '',
    isButtonDisabled: false,
    rate: 0,
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/authenticated',
    }),
    // @vuese
    // indicate if stars should be validated depending on config value
    shouldValidateCommentInput() {
      return !this.$config.public.showStarsInProductReviewForm;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Used to open login panel
    openLoginPanel() {
      this.$store.commit('contentpanel/open', {
        name: 'account',
        frame: 'login',
      });
    },
    // @vuese
    // Validate inputs and submit form or show general error message
    confirmReviewForm() {
      const showRatingError =
        this.$config.public.showStarsInProductReviewForm && !this.rate;

      if (showRatingError) {
        this.feedbackMessage = this.$t('REVIEW_FEEDBACK_RATE_REQUIRED');
        this.$refs.feedback.show();
        return;
      }

      if (this.$refs.author.validateInput()) {
        this.loading = true;
        this.isButtonDisabled = true;
        this.addReviewAPICall();
        return;
      }
      this.feedbackMessage = this.$t('FEEDBACK_ALL_INPUTS_REVIEW');
      this.$refs.feedback.show();
    },
    // @vuese
    // API call with handling error or success
    async addReviewAPICall() {
      const variables = {
        alias: this.productAlias,
        author: this.reviewForm.author,
        comment: this.reviewForm.comment,
        rating: this.rate,
      };
      const callback = () => {
        this.success = true;
        this.loading = false;
        this.isButtonDisabled = false;
      };
      await this.mutateData(
        postProductReviewMutation,
        callback,
        variables,
        this.showErrorFeedback,
      );
    },
    // @vuese
    // Used to hide feedback if field becomes valid after error
    // @arg valid (Boolean)
    checkValid(valid) {
      if (valid) {
        this.$refs.feedback.hide();
      }
    },
    // @vuese
    // Show generic error
    showErrorFeedback() {
      this.loading = false;
      this.feedbackMessage = this.$t('FEEDBACK_ERROR');
      this.$refs.feedback.show();
    },
    // @vuese
    // set emitted rate from child component
    // @arg rate (Number)
    setRate(rate) {
      this.rate = rate;
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-review-form';
</style>
