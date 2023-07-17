import brandsByProductsQuery from 'products/brands-by-products.graphql';
// @group Mixins
// @vuese
// The full functionality for the brands page
// **Data:**<br>
// brands: `[]`<br>
// isLoading: `true`<br>
// brandsTree: `[]`<br>
// isGroupFilter: `false`<br>
// activeGroupFilter: `''`<br>
export default {
  name: 'MixBrandsPage',
  mixins: [],
  apollo: {
    products: {
      query: brandsByProductsQuery,
      errorPolicy: 'all',
      result(result) {
        if (result.data && result.data.products.filters) {
          const facets = result.data.products.filters.facets;
          const brandFacets = facets.find(facet => facet.type === 'Brand');

          this.updateBrandsFromFacets(brandFacets);
          if (!this.brandsTree.length) {
            this.createBrandsTree();
          }
          this.isLoading = false;
        }

        this.$store.dispatch('loading/end');
      },
      error(error) {
        this.$nuxt.error({ statusCode: 500, message: error });
      }
    }
  },
  props: {},
  data: () => ({
    brands: [],
    isLoading: true,
    brandsTree: [],
    isGroupFilter: false,
    activeGroupFilter: ''
  }),
  computed: {
    // @vuese
    // Returns the brands sorted by alias
    // @type Array
    sortedBrands() {
      const getBrands = [...this.brands];

      return getBrands.sort((a, b) => {
        const aliasA = a.alias;
        const aliasB = b.alias;

        if (aliasA < aliasB) {
          return -1;
        }
        if (aliasA > aliasB) {
          return 1;
        }

        return 0;
      });
    },
    // @vuese
    // Returns one bradn per character
    // @type Array
    getOneBrandPerCharacter() {
      const getBrands = [...this.sortedBrands];

      return getBrands.filter((item, index, array) => {
        const a = item.alias.substring(0, 1);
        const b = array[index + 1]?.alias.substring(0, 1);

        return a !== b;
      });
    },
    // @vuese
    // Returns all initial characters
    // @type Array
    getAllInitialCharacters() {
      const brands = [...this.getOneBrandPerCharacter];

      return brands.map(item => item.alias.substring(0, 1));
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Updates the brands from the facets
    // @arg facets (Object)
    updateBrandsFromFacets(facets) {
      if (facets && facets.values.length) {
        this.brands = [...facets.values].map(item => {
          return {
            alias: item.label.toUpperCase(),
            name: item.label,
            canonicalUrl: item.url
          };
        });
      }
    },
    // @vuese
    // Returns all brands by initial character
    // @arg character (String)
    getAllBrandsByInitial(character) {
      const getBrands = [...this.sortedBrands];

      return getBrands.filter(item => item.alias.substring(0, 1) === character);
    },
    // @vuese
    // Creates the brands tree
    createBrandsTree() {
      const initialCharacters = this.getAllInitialCharacters;

      initialCharacters.forEach(character => {
        this.brandsTree.push({
          group: character,
          brands: this.getAllBrandsByInitial(character)
        });
      });
    },
    // @vuese
    // Sets the group filter
    // @arg group (String)
    setGroupFilter(group) {
      this.isGroupFilter = true;

      if (this.activeGroupFilter === group) {
        this.activeGroupFilter = '';
        this.isGroupFilter = false;
        return;
      }

      this.activeGroupFilter = group;
    }
  }
};
