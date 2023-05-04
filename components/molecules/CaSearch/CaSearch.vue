<template>
  <div class="ca-search__wrapper">
    <div ref="search" class="ca-search" :class="modifiers">
      <div class="ca-search__bar">
        <div class="ca-search__input-wrap">
          <input
            v-model="searchString"
            class="ca-search__input"
            type="search"
            autocomplete="off"
            :aria-label="$t('SEARCH')"
            :placeholder="$t('SEARCH_PLACEHOLDER')"
            @input="handleSearchInput"
            @focus="open"
            @blur="blurHandler"
            @keyup.enter="goToSearchPage"
          />
          <CaIconButton
            v-if="searchString"
            class="ca-search__remove"
            icon-name="x"
            aria-label="Delete"
            @clicked="close"
          />
          <CaIconButton
            class="ca-search__button"
            icon-name="search"
            :aria-label="$t('SEARCH')"
            @clicked="goToSearchPage"
          />
        </div>
      </div>
      <div
        v-if="!loading && active && !searchResultsExist && !noResults"
        class="ca-search__suggestions"
      >
        <h2 class="ca-search__title ca-search__title--suggestion">
          {{ $t('YOUR_RECENT_SEARCHES') }}
        </h2>
        <ul v-if="showRecentSearches" class="ca-search__suggestions-list">
          <li
            v-for="(search, index) in recentSearches"
            :key="index"
            class="ca-search__suggestion-item"
          >
            <button
              type="button"
              class="ca-search__suggestion-link"
              @mousedown="setSearchString(search)"
              @click="clickHandler({ type: 'suggestion', data: search })"
            >
              {{ search }}
            </button>
          </li>
        </ul>
        <p v-else class="ca-search__no-suggestions">
          {{ $t('SEARCH_NO_SUGGESTIONS') }}
        </p>
      </div>
      <!-- <div
        v-else-if="active && !searchResultsExist"
        class="ca-search__suggestions"
      >
        <h2 class="ca-search__title ca-search__title--suggestion">
          {{ $t('TOP_SEARCHES') }}
        </h2>
        <ul class="ca-search__suggestions-list">
          <li
            v-for="(search, index) in topSearches"
            :key="index"
            class="ca-search__suggestion-item"
          >
            <a href="#" class="ca-search__suggestion-link">{{ search }}</a>
          </li>
        </ul>
      </div> -->

      <section
        v-if="
          loading ||
            (noResults && searchIsVisible) ||
            (searchResultsExist && searchIsVisible)
        "
        class="ca-search__results"
        :class="{
          'ca-search__results--loading': loading,
          'ca-search__results--loading-empty': loading && !searchResultsExist,
          'ca-search__results--no-results': noResults
        }"
      >
        <div class="ca-search__results-box">
          <div class="ca-search__top">
            <h2 class="ca-search__title">
              {{ $t('SEARCH_RESULTS_TITLE') }}
            </h2>
            <button type="button" @click="goToSearchPage">
              <CaIconAndText
                v-if="searchResultsExist && totalResults > searchResultsVisible"
                class="ca-search__see-all"
                icon-name="arrow-right"
                icon-position="right"
              >
                {{ $t('SEARCH_RESULTS_SEE_ALL') }}
              </CaIconAndText>
            </button>
          </div>
          <div class="ca-search__results-wrap">
            <CaSpinner
              class="ca-search__spinner"
              :class="{
                empty: !searchResultsExist
              }"
              :loading="loading"
            />
            <div v-if="noResults && !loading" class="ca-search__no-results">
              {{ $t('SEARCH_NO_RESULTS') }}
            </div>
            <div
              v-if="products.length"
              class="ca-search__result ca-search__result--products"
            >
              <h3 class="ca-search__list-title">{{ $tc('PRODUCT', 2) }}</h3>
              <ul class="ca-search__list ca-search__list--products">
                <li
                  v-for="product in productsVisible"
                  :key="product.productId"
                  class="ca-search__item ca-search__item--product"
                >
                  <NuxtLink
                    class="ca-search__item-link ca-search__item-link--product"
                    :to="product.canonicalUrl"
                    :title="product.name"
                    @click.native="
                      clickHandler({ type: 'product', data: product })
                    "
                  >
                    <CaImage
                      v-if="
                        product.images !== null && product.images.length > 0
                      "
                      class="ca-search__item-image"
                      type="product"
                      :size-array="
                        $config.imageSizes.product.filter(
                          item => parseInt(item.descriptor) < 100
                        )
                      "
                      :alt="product.name"
                      :filename="product.images[0]"
                      :ratio="$config.productImageRatio"
                      sizes="40px"
                    />
                    <CaImage
                      v-else
                      class="ca-search__item-image"
                      :ratio="$config.productImageRatio"
                      :src="
                        require('~/assets/placeholders/product-image-square.png')
                      "
                      alt="placeholder"
                    />
                    <div class="ca-search__item-info">
                      <div class="ca-search__item-name">{{ product.name }}</div>
                      <CaPrice
                        class="ca-search__item-price"
                        :price="product.unitPrice"
                      />
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div
              v-if="categoriesVisible.length"
              class="ca-search__result ca-search__result--categories"
            >
              <h3 class="ca-search__list-title">{{ $t('CATEGORIES') }}</h3>
              <ul class="ca-search__list">
                <li
                  v-for="(category, index) in categoriesVisible"
                  :key="index"
                  class="ca-search__item ca-search__item--tag"
                >
                  <NuxtLink
                    class="ca-search__item-link ca-search__item-link--tag"
                    :to="category.canonicalUrl"
                    :title="category.name"
                    @click.native="
                      clickHandler({ type: 'category', data: category })
                    "
                  >
                    {{ category.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div
              v-if="brandsVisible.length"
              class="ca-search__result ca-search__result--brands"
            >
              <h3 class="ca-search__list-title">{{ $t('BRANDS') }}</h3>
              <ul class="ca-search__list">
                <li
                  v-for="(brand, index) in brandsVisible"
                  :key="index"
                  class="ca-search__item ca-search__item--tag"
                >
                  <NuxtLink
                    class="ca-search__item-link ca-search__item-link--tag"
                    :to="brand.canonicalUrl"
                    :title="brand.name"
                    @click.native="clickHandler({ type: 'brand', data: brand })"
                  >
                    {{ brand.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="ca-search__close-button only-mobile"
          @click="close"
        >
          <CaIconAndText icon-name="x">{{ $t('CLOSE') }}</CaIconAndText>
        </button>
      </section>
    </div>
    <CaOverlay class="ca-search__overlay" :visible="active" @clicked="close" />
  </div>
</template>
<script>
import MixSearch from 'MixSearch';
// @group Molecules
// The search including search results<br><br>
// **SASS-path:** _./styles/components/molecules/ca-search.scss_
export default {
  name: 'CaSearch',
  mixins: [MixSearch],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-search';
</style>
