import searchQuery from 'global/search.graphql';
import eventbus from '@ralph/ralph-ui/plugins/eventbus.js';
// @group Mixins
// @vuese
// Main search functionality
export default {
  name: 'MixSearch',
  mixins: [],
  props: {
    // Used to toogle search in mobile, set to true when user opens it
    opened: {
      type: Boolean,
      default: false
    },
    // Should search be visible when site is at top?
    visibleWhenSiteIsAtTop: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    searchString: '',
    typingTimeout: null,
    loading: false,
    active: false,
    products: [],
    totalResults: 0,
    searchStorage: null,
    recentSearches: [],
    topSearches: ['godis', 'askar', 'lakrits', 'choklad', 'present'],
    noResults: false
  }),
  computed: {
    setSearchLink() {
      const index =
        this.$getPath('index') === '/' ? '' : this.$getPath('index');
      return index + this.$config.routePaths.search + '/' + this.searchString;
    },
    searchResultsVisible() {
      return this.$store.getters.viewport === 'phone' ? 5 : 10;
    },
    searchResultsExist() {
      return this.products.length > 0;
    },
    searchIsVisible() {
      if (this.visibleWhenSiteIsAtTop) {
        if (
          this.$store.getters.viewport === 'phone' ||
          this.$store.getters.viewport === 'tablet'
        ) {
          return this.$store.getters.siteIsAtTop || this.opened;
        } else {
          return true;
        }
      } else {
        return this.$store.getters.viewport === 'phone' ||
          this.$store.getters.viewport === 'tablet'
          ? this.opened
          : true;
      }
    },
    modifiers() {
      return {
        'ca-search--visible': this.searchIsVisible,
        'ca-search--active': this.active
      };
    },
    showRecentSearches() {
      return this.recentSearches.length > 0;
    },
    productsVisible() {
      return this.products.slice(0, this.searchResultsVisible);
    },
    categoriesVisible() {
      let arr = [];
      this.products.forEach(item => {
        item.categories.forEach(cat => {
          arr.push(cat);
        });
      });
      const collectedArr = [];
      arr = arr.map(item => {
        const index = collectedArr.findIndex(i => i.name === item.name);
        if (index === -1) {
          const obj = {
            name: item.name,
            canonicalUrl: item.canonicalUrl,
            count: 1
          };
          collectedArr.push(obj);
        } else {
          collectedArr[index].count++;
        }
      });
      return collectedArr
        .sort((a, b) => b.count - a.count)
        .slice(0, this.searchResultsVisible);
    },
    brandsVisible() {
      let arr = [];
      this.products.forEach(item => {
        arr.push(item.brand);
      });
      const collectedArr = [];
      arr = arr.map(item => {
        const index = collectedArr.findIndex(i => i.name === item.name);
        if (index === -1) {
          const obj = {
            name: item.name,
            canonicalUrl: item.canonicalUrl,
            count: 1
          };
          collectedArr.push(obj);
        } else {
          collectedArr[index].count++;
        }
      });
      return collectedArr
        .sort((a, b) => b.count - a.count)
        .slice(0, this.searchResultsVisible);
    }
  },
  watch: {},
  mounted() {
    this.searchStorage = window.localStorage;
    this.recentSearches = this.searchStorage.getItem('recentSearches')
      ? JSON.parse(localStorage.getItem('recentSearches'))
      : [];
    eventbus.$on('route-change', () => {
      this.close();
    });
  },
  beforeDestroy() {
    eventbus.$off('route-change');
  },
  methods: {
    // @vuese
    // Perform search
    handleSearchInput() {
      this.loading = true;
      this.noResults = false;
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(this.fetchSearchResult, 500);
    },
    fetchSearchResult() {
      this.loading = true;
      if (this.searchString !== '') {
        this.$apollo
          .query({
            query: searchQuery,
            variables: {
              filter: {
                searchText: this.searchString,
                sort: 'RELEVANCE'
              }
            }
          })
          .then(result => {
            this.products = result?.data?.products?.products || [];
            this.loading = false;
            if (this.searchResultsExist) {
              this.totalResults = result.data.products.count;
            } else {
              this.noResults = true;
            }
          })
          .catch(error => {
            this.$nuxt.error({ statusCode: error.statusCode, message: error });
          });
      } else {
        this.products = [];
        this.loading = false;
      }
    },
    setRecentSearch() {
      if (this.searchString === '') {
        return;
      }
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
    blurHandler(event) {
      this.$nextTick(() => {
        if (this.searchString === '') {
          this.close();
        }
      });
    },
    setSearchString(string) {
      this.searchString = string;
      this.fetchSearchResult();
    },
    goToSearchPage() {
      if (this.searchString) {
        this.setRecentSearch();
        this.$router.push(this.setSearchLink);
        this.$emit('searchRouteChange');
        this.close();
      }
    },
    close() {
      if (this.searchResultsExist) {
        this.setRecentSearch();
      }
      document.body.style.overflow = null;
      this.noResults = false;
      this.active = false;
      this.searchString = '';
      this.products = [];
      this.$emit('closed');
    },
    open() {
      if (!this.active) {
        this.active = true;
        this.$store.dispatch('setViewportHeight');
        this.$store.dispatch('setScrollbarWidth');
        document.body.style.overflow = 'hidden';
      }
    }
  }
};
