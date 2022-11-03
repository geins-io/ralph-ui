<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="ca-breadcrumbs" :class="modifiers">
    <script type="application/ld+json" v-html="breadcrumbSchema"></script>
    <ol class="ca-breadcrumbs__list">
      <li
        v-for="(elem, index) in breadcrumbSchema.itemListElement"
        :key="index"
        class="ca-breadcrumbs__item"
      >
        <NuxtLink
          v-if="elem.item"
          class="ca-breadcrumbs__link"
          :to="getUrl(elem.item)"
        >
          {{ elem.name }}
        </NuxtLink>
        <span v-else class="ca-breadcrumbs__current">
          {{ elem.name }}
        </span>
      </li>
    </ol>
  </div>
</template>
<script>
import { mapState } from 'vuex';
// @group Atoms
// @vuese
// A component for generating and showing the breadcrumbs<br><br>
// **SASS-path:** _./styles/components/atoms/ca-breadcrumbs.scss_
export default {
  name: 'CaBreadcrumbs',
  props: {
    // Current category or brand
    current: {
      type: Object,
      required: true
    },
    // Name of product, if on product page
    productName: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    parents: []
  }),
  computed: {
    isParentCategory() {
      const array = this.$route.fullPath.split('/');

      return array.length > 3;
    },
    category() {
      const path = this.$route?.params[0] || '';
      return path ? path.split('/')[0] : '';
    },
    modifiers() {
      return {
        'ca-breadcrumbs--product': this.productName
      };
    },
    // Creates the schema for the breadcrumbs
    breadcrumbSchema() {
      let position = 1;

      // Add home base
      const jsonld = {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position,
            name: this.$t('BREADCRUMBS_HOME'),
            item: this.$config.baseUrl + '/'
          }
        ]
      };
      if (this.parents.length) {
        // Add dynamic category parents
        for (let i = this.parents.length - 1; i >= 0; i--) {
          position++;
          jsonld.itemListElement.push({
            '@type': 'ListItem',
            position,
            name: this.parents[i].name,
            item: this.$config.baseUrl + this.parents[i].canonicalUrl
          });
        }
      }

      // Add current category
      position++;
      const current = {
        '@type': 'ListItem',
        position,
        name: this.current.name
      };
      if (this.productName) {
        current.item = this.$config.baseUrl + this.current.canonical;
      }
      jsonld.itemListElement.push(current);

      // Add current product
      if (this.productName) {
        position++;
        jsonld.itemListElement.push({
          '@type': 'ListItem',
          position,
          name: this.productName
        });
      }

      return jsonld;
    },
    ...mapState(['categoryTree'])
  },
  watch: {},
  created() {
    if (this.current.alias && this.current.alias !== this.category) {
      this.setParent(this.current.alias);
    }
    if (!this.current.alias && this.isParentCategory) {
      this.setDefaultParent(this.category);
    }
  },
  methods: {
    // Gets the stripped url to be used with NuxtLink
    // @arg url (String)
    getUrl(url) {
      const strippedUrl = url.replace(this.$config.baseUrl, '');
      return strippedUrl === '' ? '/' : strippedUrl;
    },
    // Sets all parents for current category, if category
    // @arg alias (String)
    setParent(alias) {
      const current = this.categoryTree.find(i => i.alias === alias);
      if (current?.parentCategoryId > 0) {
        const parent = this.categoryTree.find(
          i => i.categoryId === current.parentCategoryId
        );
        this.parents.push(parent);
        this.setParent(parent.alias);
      }
    },
    // Sets default "parent" for current parent, if no category
    // @arg alias (String)
    setDefaultParent(alias) {
      const current = this.categoryTree.find(i => i.alias === alias);
      if (!current?.parentCategoryId) {
        const parent = this.categoryTree.find(
          i => i.categoryId === current.categoryId
        );
        this.parents.push(parent);
      }
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-breadcrumbs';
</style>
