<template>
  <section class="ca-widget-category-puffs">
    <h2
      v-if="configuration.active && configuration.heading"
      class="ca-widget-category-puffs__heading"
    >
      {{ configuration.heading }}
    </h2>
    <ul
      v-if="configuration.active && configuration.images.length"
      class="ca-widget-category-puffs__list"
    >
      <li
        v-for="(image, index) in configuration.images"
        :key="'category-image-' + index"
        class="ca-widget-category-puffs__list-element"
      >
        <nuxt-link
          class="ca-widget-category-puffs__list-element-anchor"
          :to="$getPath(image.href)"
        >
          <picture class="ca-widget-category-puffs__picture">
            <source
              class="ca-widget-category-puffs__image"
              :media="`(min-width: ${$config.breakpoints.laptop}px)`"
              :srcset="getImageSrc(image.filename)"
            />
            <img
              class="ca-widget-category-puffs__image"
              :src="getImageSrc(image.filenameForMobileDevice)"
              :alt="image.altText"
              loading="lazy"
            />
          </picture>
          <p
            v-if="image.title"
            class="ca-widget-category-puffs__category-title"
            :style="textStyles"
          >
            {{ image.title }}
          </p>
          <p
            v-if="image.text"
            class="ca-widget-category-puffs__category-subtitle"
            :style="textStyles"
          >
            {{ image.text }}
          </p>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>
<script>
// @group Molecules
// @vuese
// Category Puffs widget handler component<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-category-puffs.scss_
export default {
  name: 'CaWidgetCategoryPuffs',
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    textStyles() {
      return {
        lineHeight: `${this.customLineHeight}px`,
        padding: `${this.customPadding}px 0`,
        textDecoration: this.configuration.isUnderline
          ? 'underline'
          : 'initial',
        textTransform: this.configuration.isUppercase ? 'uppercase' : 'initial'
      };
    },
    customPadding() {
      const paddingValues = [8, 12, 16];
      return (
        `${paddingValues[this.configuration?.padding]}px` ||
        `${paddingValues[0]}px`
      );
    },
    customLineHeight() {
      const lineHeightValues = [8, 12, 16];
      return (
        `${lineHeightValues[this.configuration?.lineHeight]}px` ||
        `${lineHeightValues[0]}px`
      );
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Method to get src for the image
    // @arg [path] (String) ending of specific path url
    getImageSrc(path) {
      return `${this.$config.imageServer}/pagewidget/raw/${encodeURIComponent(
        path
      )}`;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-category-puffs';
</style>
