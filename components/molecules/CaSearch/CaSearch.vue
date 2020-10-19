<template>
  <div class="ca-search" :class="modifiers">
    <div class="ca-search__bar">
      <div class="ca-search__input-wrap">
        <input
          v-model="searchString"
          class="ca-search__input"
          type="text"
          aria-label="$t('SEARCH')"
          :placeholder="$t('SEARCH_PLACEHOLDER')"
          @input="getSearchResults"
        />
        <CaIconButton
          class="ca-search__button"
          icon-name="search"
          :aria-label="$t('SEARCH')"
          @clicked="getSearchResults"
        />
      </div>
    </div>
    <div
      v-if="searchResultsExist && searchIsVisible"
      class="ca-search__results"
    >
      <ul v-if="searchData.products.length" class="ca-search__list">
        <li class="ca-search__title">{{ $tc('PRODUCT', 2) }}</li>
        <li class="ca-search__link">
          <a href="#">{{ $t('SEARCH_SEE_ALL') }}</a>
        </li>
        <li
          v-for="(product, index) in searchData.products"
          :key="index"
          class="ca-search__item ca-search__item--product"
        >
          <a :href="product.url">{{ product.title }}</a>
        </li>
      </ul>
      <ul v-if="searchData.brands.length" class="ca-search__list">
        <li class="ca-search__title">{{ $t('BRANDS') }}</li>
        <li class="ca-search__link">
          <a href="#">{{ $t('SEARCH_SEE_ALL_BRANDS') }}</a>
        </li>
        <li
          v-for="(brand, index) in searchData.brands"
          :key="index"
          class="ca-search__item ca-search__item--brand"
        >
          <a :href="brand.url">{{ brand.title }}</a>
        </li>
      </ul>
      <ul v-if="searchData.categories.length" class="ca-search__list">
        <li class="ca-search__title">{{ $t('CATEGORIES') }}</li>
        <li class="ca-search__link">
          <a href="#">{{ $t('SEARCH_SEE_ALL') }}</a>
        </li>
        <li
          v-for="(category, index) in searchData.categories"
          :key="index"
          class="ca-search__item ca-search__item--category"
        >
          <a :href="category.url">{{ category.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CaIconButton from 'CaIconButton';
// @group Molecules
// The search including search results<br><br>
// **SASS-path:** _./styles/components/molecules/ca-search.scss_
export default {
  name: 'CaSearch',
  components: { CaIconButton },
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
          price: '262 SEK',
          image:
            'https://cdn.zoovillage.com/product/72f90/adidas_ac_duffle_black.jpg'
        },
        {
          title: 'Ac Class Bp Black',
          url: '/adidas/ac-class-bp-black',
          artNo: 'ED8667',
          brand: 'Adidas',
          gender: 'unisex',
          price: '224 SEK',
          image:
            'https://cdn.zoovillage.com/product/72f90/adidas_ac_class_bp_black.jpg'
        },
        {
          title: 'Aelin Lanyard Black',
          url: '/acne-studios/aelin-lanyard-black',
          artNo: 'CG0064-900',
          brand: 'Acne Studios',
          gender: 'male',
          price: '1999 SEK',
          image:
            'https://cdn.zoovillage.com/product/72f90/acnestudiosaelinlanyardblack.jpg'
        },
        {
          title: 'Toronty Logo Contrast Black/White',
          url: '/acne-studios/toronty-logo-contrast-black-white',
          artNo: 'CA0044-J83',
          brand: 'Acne Studios',
          gender: 'unisex',
          price: '2099 SEK',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_toronty_logo_contrast_blackwhite.jpg'
        },
        {
          title: 'Brun Cotton Canvas Oat Beige',
          url: '/acne-studios/brun-cotton-canvas-oat-beige',
          artNo: 'C40083-AE6',
          brand: 'Acne Studios',
          gender: 'male',
          price: '1099 SEK',
          image:
            'https://cdn.zoovillage.com/product/72f90/acnestudiosbruncottoncanvasoatbeige.jpg'
        },
        {
          title: 'Cassiar Check Black/White',
          url: '/acne-studios/cassiar-check-black-white',
          artNo: 'CA0026-J83',
          brand: 'Acne Studios',
          gender: 'female',
          price: '900 SEK',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_cassiar_check_blackwhite.jpg'
        },
        {
          title: 'Toronty Logo Grey/Pink',
          url: '/acne-studios/toronty-logo-grey-pink',
          artNo: '274176-ANS',
          brand: 'Acne Studios',
          gender: 'unisex',
          price: '1799 SEK',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_toronty_logo_greypink.jpg'
        },
        {
          title: 'Toronty Logo Contrast Pink/Black',
          url: '/acne-studios/toronty-logo-contrast-pink-black',
          artNo: 'CA0044-BR0',
          brand: 'Acne Studios',
          gender: 'female',
          price: '2099 SEK',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_toronty_logo_contrast_pinkblack.jpg'
        },
        {
          title: 'Toronty Logo Pink/Beige',
          url: '/acne-studios/toronty-logo-pink-beige',
          artNo: '274176-AHK',
          brand: 'Acne Studios',
          gender: 'female',
          price: '1799 SEK',
          image:
            'https://cdn.zoovillage.com/product/72f90/acne_studios_toronty_logo_pinkbeige.jpg'
        }
      ]
    }
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
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Perform search
    getSearchResults() {
      this.loading = true;
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
        if (this.searchString !== '') {
          this.searchData = this.searchDummyData;
        } else {
          this.searchData = {
            categories: [],
            brands: [],
            products: []
          };
        }

        this.loading = false;
      }, 800);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-search';
</style>
