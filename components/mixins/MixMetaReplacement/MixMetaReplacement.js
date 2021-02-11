// @group Mixins
// @vuese
// Used to replace meta placeholders with the actual value
// [count] = Number of products on the page (Lists)
// [dlong] = Long description (Products), primaryDescription (Lists)
// [dshort] = Short description (Products), secondaryDescription (Lists)
// [color] = Color (Currently not implemented)
// [gender] = Gender (Currently not implemented)
// [brand] = Brand
// [pid] = Product ID
// [cat] [category] = Main category name (Product)
// [price] = Product price (Product)
// [pmax] = Max filterable price, unformatted (List)
// [pmin] = Min filterable price, unformatted (List)
// [name] = Product Name (Product), Category/Brand name (Lists), Title (Content pages)
// [artnr] = Article number (Currently not implemented)
// [search] = Article number (Currently not implemented)

export default {
  name: 'MixMetaReplacement',
  methods: {
    metaReplacement(string) {
      const replacements = /\[.*?\]/gi;
      if (string) {
        const replacedString = string.replace(replacements, match => {
          console.log(match);
          switch (match) {
            case '[count]':
              match = this.totalCount || '';
              break;

            case '[dlong]':
              match =
                this.listInfo?.primaryDescription ||
                this.product?.texts?.text2 ||
                '';
              break;

            case '[dshort]':
              match =
                this.listInfo?.secondaryDescription ||
                this.product?.texts?.text1 ||
                '';
              break;

            case '[color]':
              match = '';
              break;

            case '[gender]':
              match = '';
              break;

            case '[brand]':
              match = this.product?.brand?.name || '';
              break;

            case '[pid]':
              match = this.product?.productId || '';
              break;

            case '[cat]':
            case '[category]':
              match = '';
              break;

            case '[price]':
              match = this.product?.unitPrice
                ? this.$store.getters.getSellingPrice(this.product?.unitPrice)
                : '';
              break;

            case '[pmax]':
              match = this.filters.price?.highest || '';
              break;

            case '[pmin]':
              match = this.filters.price?.lowest || '';
              break;

            case '[name]':
              match =
                this.listInfo?.name ||
                this.product?.name ||
                this.meta?.title ||
                '';
              break;

            case '[artnr]':
              match = '';
              break;

            default:
              break;
          }
          return match;
        });
        return replacedString;
      }
    }
  }
};
