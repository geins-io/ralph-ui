import { mapState } from 'vuex';
import productsQuery from 'productlist/products.graphql';
import MixFetch from 'MixFetch';
// @group Mixins
// @vuese
// All functionality for the favorites page<br><br>
// **Data:**<br>
// products: `null`<br>
// allProducts: `[]`<br>
export default {
  name: 'MixFavoritesPage',
  mixins: [MixFetch],
  props: {},
  async fetch() {
    this.products = await this.fetchData(productsQuery, (result) => {
      return result?.data?.products?.products || [];
    });

    this.processProducts(this.products);
    this.$store.dispatch('loading/end');
  },
  data: () => ({
    products: null,
    allProducts: [],
  }),
  computed: {
    variables() {
      return {
        filter: this.filter,
        take: this.favorites.length,
      };
    },
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
