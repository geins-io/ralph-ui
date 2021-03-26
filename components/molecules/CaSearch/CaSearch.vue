<template>
  <div class="ca-search__wrapper">
    <div class="ca-search" :class="modifiers">
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
          />
          <CaIconButton
            class="ca-search__button"
            icon-name="search"
            :aria-label="$t('SEARCH')"
            @clicked="fetchSearchResult"
          />
        </div>
      </div>
      <div
        v-if="showRecentSearches && active && !searchResultsExist"
        class="ca-search__suggestions"
      >
        <h2 class="ca-search__title ca-search__title--suggestion">
          {{ $t('YOUR_RECENT_SEARCHES') }}
        </h2>
        <ul class="ca-search__suggestions-list">
          <li
            v-for="(search, index) in recentSearches"
            :key="index"
            class="ca-search__suggestion-item"
          >
            <a href="#" class="ca-search__suggestion-link">{{ search }}</a>
          </li>
        </ul>
      </div>
      <div
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
      </div>

      <section
        v-if="searchResultsExist && searchIsVisible"
        class="ca-search__results"
      >
        <div class="ca-search__top">
          <h2 class="ca-search__title">
            {{ $t('SEARCH_RESULTS_TITLE') }}
          </h2>
          <CaIconAndText
            class="ca-search__see-all"
            icon-name="arrow-right"
            icon-position="right"
          >
            {{ $t('SEARCH_RESULTS_SEE_ALL') }}
          </CaIconAndText>
        </div>
        <div class="ca-search__results-wrap">
          <div
            v-if="searchData.products.length"
            class="ca-search__result ca-search__result--products"
          >
            <h3 class="ca-search__list-title">{{ $tc('PRODUCT', 2) }}</h3>
            <ul class="ca-search__list ca-search__list--products">
              <li
                v-for="(product, index) in searchData.products"
                :key="index"
                class="ca-search__item ca-search__item--product"
              >
                <a
                  class="ca-search__item-link ca-search__item-link--product"
                  :href="product.url"
                >
                  <!-- <CaImage
                  v-if="product.images !== null && product.images.length > 0"
                  class="ca-cart-product__image"
                  type="product"
                  size="200f200"
                  :alt="product.name"
                  :filename="product.images[0]"
                  :placeholder="
                    require('~/assets/placeholders/product-image-square.png')
                  "
                /> -->
                  <img class="ca-search__item-image" :src="product.image" />
                  <div class="ca-search__item-info">
                    <div class="ca-search__item-name">{{ product.title }}</div>
                    <div class="ca-search__item-price ca-price">
                      {{ product.price }}
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div
            v-if="searchData.categories.length"
            class="ca-search__result ca-search__result--categories"
          >
            <h3 class="ca-search__list-title">{{ $t('CATEGORIES') }}</h3>
            <ul class="ca-search__list">
              <li
                v-for="(category, index) in searchData.categories"
                :key="index"
                class="ca-search__item ca-search__item--tag"
              >
                <a
                  class="ca-search__item-link ca-search__item-link--tag"
                  :href="category.url"
                >
                  {{ category.title }}
                </a>
              </li>
            </ul>
          </div>
          <div
            v-if="searchData.brands.length"
            class="ca-search__result ca-search__result--brands"
          >
            <h3 class="ca-search__list-title">{{ $t('BRANDS') }}</h3>
            <ul class="ca-search__list">
              <li
                v-for="(brand, index) in searchData.brands"
                :key="index"
                class="ca-search__item ca-search__item--tag"
              >
                <a
                  class="ca-search__item-link ca-search__item-link--tag"
                  :href="brand.url"
                >
                  {{ brand.title }}
                </a>
              </li>
            </ul>
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
// import CaImage from 'CaImage';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// @group Molecules
// The search including search results<br><br>
// **SASS-path:** _./styles/components/molecules/ca-search.scss_
export default {
  name: 'CaSearch',
  mixins: [],
  props: {
    // Used to toogle search in mobile, set to true when user opens it
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    searchString: '',
    typingTimeout: null,
    loading: false,
    active: false,
    searchData: {
      categories: [],
      brands: [],
      products: []
    },
    searchDummyData: {
      categories: [
        {
          title: 'Väskor',
          url: '/vaskor'
        },
        {
          title: 'Weekendväskor',
          url: '/weekendvaskor'
        },
        {
          title: 'Ryggsäckar',
          url: '/ryggsackar'
        },
        {
          title: 'Accessoarer',
          url: '/accessoarer'
        },
        {
          title: 'Plånböcker',
          url: '/planbocker'
        },
        {
          title: 'Halsdukar \u0026 Scarves',
          url: '/halsdukar-scarves'
        },
        {
          title: 'Mössor',
          url: '/mossor'
        },
        {
          title: 'Kepsar',
          url: '/kepsar'
        },
        {
          title: 'Jeans',
          url: '/jeans'
        }
      ],
      brands: [
        {
          title: 'Adidas',
          url: '/adidas'
        },
        {
          title: 'Acne Studios',
          url: '/acne-studios'
        },
        {
          title: 'Carhartt WIP',
          url: '/carhartt-wip'
        },
        {
          title: 'Ciele',
          url: '/ciele'
        },
        {
          title: 'Acqua Limone',
          url: '/acqua-limone'
        },
        {
          title: 'Dr Martens',
          url: '/dr-martens'
        },
        {
          title: 'Polo Ralph Lauren',
          url: '/polo-ralph-lauren-1'
        },
        {
          title: 'Tricker\u0027s',
          url: '/trickers'
        },
        {
          title: 'J.Lindeberg',
          url: '/jlindeberg'
        }
      ],
      products: [
        {
          title: 'Ac Duffle Black',
          url: '/adidas/ac-duffle-black',
          artNo: 'ED7392',
          brand: 'Adidas',
          gender: 'unisex',
          price: '262 kr',
          image:
            'https://cdn.zoovillage.com/product/72f90/adidas_ac_duffle_black.jpg'
        },
        {
          title: 'Ac Class Bp Black',
          url: '/adidas/ac-class-bp-black',
          artNo: 'ED8667',
          brand: 'Adidas',
          gender: 'unisex',
          price: '224 kr',
          image:
            'https://cdn.zoovillage.com/product/72f90/adidas_ac_class_bp_black.jpg'
        },
        {
          title: 'Aelin Lanyard Black',
          url: '/acne-studios/aelin-lanyard-black',
          artNo: 'CG0064-900',
          brand: 'Acne Studios',
          gender: 'male',
          price: '1999 kr',
          image:
            'https://cdn.zoovillage.com/product/72f90/acnestudiosaelinlanyardblack.jpg'
        },
        {
          title: 'Toronty Logo Contrast Black/White',
          url: '/acne-studios/toronty-logo-contrast-black-white',
          artNo: 'CA0044-J83',
          brand: 'Acne Studios',
          gender: 'unisex',
          price: '2099 kr',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_toronty_logo_contrast_blackwhite.jpg'
        },
        {
          title: 'Brun Cotton Canvas Oat Beige',
          url: '/acne-studios/brun-cotton-canvas-oat-beige',
          artNo: 'C40083-AE6',
          brand: 'Acne Studios',
          gender: 'male',
          price: '1099 kr',
          image:
            'https://cdn.zoovillage.com/product/72f90/acnestudiosbruncottoncanvasoatbeige.jpg'
        },
        {
          title: 'Cassiar Check Black/White',
          url: '/acne-studios/cassiar-check-black-white',
          artNo: 'CA0026-J83',
          brand: 'Acne Studios',
          gender: 'female',
          price: '900 kr',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_cassiar_check_blackwhite.jpg'
        },
        {
          title: 'Toronty Logo Grey/Pink',
          url: '/acne-studios/toronty-logo-grey-pink',
          artNo: '274176-ANS',
          brand: 'Acne Studios',
          gender: 'unisex',
          price: '1799 kr',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_toronty_logo_greypink.jpg'
        },
        {
          title: 'Toronty Logo Contrast Pink/Black',
          url: '/acne-studios/toronty-logo-contrast-pink-black',
          artNo: 'CA0044-BR0',
          brand: 'Acne Studios',
          gender: 'female',
          price: '2099 kr',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_toronty_logo_contrast_pinkblack.jpg'
        },
        {
          title: 'Toronty Logo Pink/Beige',
          url: '/acne-studios/toronty-logo-pink-beige',
          artNo: '274176-AHK',
          brand: 'Acne Studios',
          gender: 'female',
          price: '1799 kr',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_toronty_logo_pinkbeige.jpg'
        }
      ]
    },
    searchStorage: null,
    recentSearches: [],
    topSearches: ['godis', 'askar', 'lakrits', 'choklad', 'present']
  }),
  computed: {
    searchResultsExist() {
      return (
        this.searchData.categories.length ||
        this.searchData.brands.length ||
        this.searchData.products.length
      );
    },
    searchIsVisible() {
      return this.$store.getters.siteIsAtTop || this.opened;
    },
    modifiers() {
      return {
        'ca-search--visible': this.searchIsVisible
      };
    },
    showRecentSearches() {
      return this.recentSearches.length > 0;
    }
  },
  watch: {},
  mounted() {
    this.searchStorage = window.localStorage;
    this.recentSearches = this.searchStorage.getItem('recentSearches')
      ? JSON.parse(localStorage.getItem('recentSearches'))
      : [];
  },
  methods: {
    // @vuese
    // Perform search
    handleSearchInput() {
      this.loading = true;
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(this.fetchSearchResult, 1000);
    },
    fetchSearchResult() {
      this.loading = true;

      if (this.searchString !== '') {
        this.searchData = this.searchDummyData;
        this.setRecentSearch();
      } else {
        this.searchData = {
          categories: [],
          brands: [],
          products: []
        };
      }

      this.loading = false;
    },
    setRecentSearch() {
      if (this.recentSearches.includes(this.searchString)) {
        this.recentSearches.splice(
          this.recentSearches.indexOf(this.searchString),
          1
        );
        this.recentSearches.unshift(this.searchString);
      } else {
        this.recentSearches.unshift(this.searchString);
        if (this.recentSearches.length > 5) {
          this.recentSearches.pop();
        }
      }
      this.searchStorage.setItem(
        'recentSearches',
        JSON.stringify(this.recentSearches)
      );
    },
    close() {
      this.active = false;
      this.searchString = '';
      this.searchData = {
        categories: [],
        brands: [],
        products: []
      };
      clearAllBodyScrollLocks();
    },
    open() {
      this.active = true;
      this.$store.dispatch('setScrollbarWidth');
      disableBodyScroll('.ca-search');
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-search';
</style>
