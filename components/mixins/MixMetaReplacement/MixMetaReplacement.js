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
  data() {
    return {
      genders: [
        'man-1',
        'kvinna-1',
        'unisex',
        'kille-1',
        'tjej-1',
        'ungdom-1',
        'unisex-youth',
        'girl-1',
        'boy-1',
        'unisex',
        'woman-1',
        'man-1',
        'mann',
        'kvinne',
        'unisex',
        'gutt',
        'jente',
        'unisex-ungdom',
        'unisex-nuoret',
        'tytöt',
        'pojat',
        'unisex',
        'nainen',
        'mies',
        'mand',
        'kvinde',
        'unisex',
        'dreng',
        'pige',
        'ungdom',
        'unisex-youth',
        'girl',
        'boy',
        'unisex',
        'woman',
        'man'
      ]
    };
  },
  computed: {
    arrayFromRoute() {
      const route = this.$route.path;
      const array = route.split('/');
      return array;
    }
  },
  methods: {
    // @vuese
    // Check if string is included in array of genedrs
    // @arg string (String)
    checkForGender(string) {
      if (this.genders.some(element => element === string)) {
        // Danish
        if (string === 'mand' || string === 'mand-1') {
          return 'For mænd og drenge';
        }
        if (string === 'kvinde' || string === 'kvinde-1') {
          return 'For kvinder og piger';
        }
        if (string === 'dreng' || string === 'dreng-1') {
          return 'For drenge';
        }
        if (string === 'pige' || string === 'pige-1') {
          return 'For piger';
        }
        if (string === 'ungdom' || string === 'ungdom-1') {
          return 'For unge';
        }
        // Swedish
        if (string === 'man' || string === 'man-1') {
          return 'för män och killar';
        }
        if (string === 'kvinna' || string === 'kvinna-1') {
          return 'för kvinnor och tjejer';
        }
        if (string === 'kille' || string === 'kille-1') {
          return 'för killar';
        }
        if (string === 'tjej' || string === 'tjej-1') {
          return 'för tjejer';
        }
        if (string === 'ungdom' || string === 'ungdom-1') {
          return 'för ungdomar';
        }
        return this.unslug(string);
      } else {
        return false;
      }
    },
    // @vuese
    // Convert slug into words with capital letters
    // @arg slug (String)
    unslug(slug) {
      const regexp = /[_,\- ]+/;
      if (slug && isNaN(slug)) {
        const words = slug.split(regexp);

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }

        return words.join(' ');
      } else {
        return slug;
      }
    },
    // @vuese
    // Capitalize first letter of a string
    // @arg string (String)
    capitalize(string) {
      if (string) {
        const str = string;
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        return str2;
      } else {
        return false;
      }
    },
    // @vuese
    // Replace meta placeholders with correct values
    // @arg Meta string (String)
    metaReplacement(string) {
      const replacements = /\[.*?\]/gi;
      if (string) {
        const replacedString = string.replace(replacements, match => {
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
              match = this.checkForGender(this.gender)
                ? this.checkForGender(this.gender)
                : '';
              break;

            case '[brand]':
              match = this.product?.brand?.name || '';
              break;

            case '[pid]':
              match = this.product?.productId || '';
              break;

            case '[cat]':
            case '[category]':
              match = this.listInfo?.name || '';
              break;

            case '[price]':
              match = this.product?.unitPrice
                ? this.$store.getters.getSellingPrice(this.product?.unitPrice)
                : '';
              break;

            case '[pmax]':
              match = this.filters?.price?.highest || '';
              break;

            case '[pmin]':
              match = this.filters?.price?.lowest || '';
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
