import { mapState } from 'vuex';
import productsQuery from 'productlist/products.graphql';
import MixApolloRefetch from 'MixApolloRefetch';
// @group Mixins
// @vuese
// All functionality for the favorites page<br><br>
// **Data:**<br>
// allProducts: `[]`<br>
export default {
  name: 'MixFavoritesPage',
  mixins: [MixApolloRefetch],
  apollo: {
    products: {
      query: productsQuery,
      variables() {
        return {
          filter: this.filter,
          take: this.favorites.length,
        };
      },
      errorPolicy: 'all',
      result(result) {
        this.$store.dispatch('loading/end');
        if (result.data.products) {
          this.processProducts(result.data.products.products);
        }
      },
      error(error) {
        this.$nuxt.error({ statusCode: 500, message: error });
      },
    },
  },
  props: {},
  data: () => ({
    allProducts: [],
  }),
  computed: {
    // @vuese
    // Are favorites saved as aliases?
    // @type Boolean
    isAliases() {
      return this.favorites.length && typeof this.favorites[0] === 'string';
    },
    // @vuese
    // Filter object for products query
    // @type Object
    filter() {
      if (this.isAliases) {
        const facets = this.favorites.map((i) => {
          return 'a_' + i;
        });
        const sort = 'FACET_ORDER';

        return { facets, sort };
      }
      return { productIds: this.favorites };
    },
    ...mapState(['favorites']),
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Remove discontinued products from favorites and sort them in the order they where added
    // @arg products (Array)
    processProducts(products) {
      if (products.length !== this.favorites.length) {
        if (!this.isAliases) {
          const productIds = products.map((product) => {
            return product.productId;
          });
          this.favorites.forEach((favorite) => {
            if (!productIds.includes(favorite)) {
              this.$store.dispatch('toggleFavorite', favorite);
            }
          });
        } else {
          const productAliases = products.map((product) => {
            return product.alias;
          });

          this.favorites.forEach((favorite) => {
            if (!productAliases.includes(favorite)) {
              this.$store.dispatch('toggleFavorite', favorite);
            }
          });
        }
      }
      if (!this.isAliases) {
        products.sort((a, b) => {
          return (
            this.favorites.indexOf(a.productId) -
            this.favorites.indexOf(b.productId)
          );
        });
      }
      this.allProducts = products;
    },
  },
};
