<template>
  <div v-if="containers.length" class="ca-widget-area">
    <div class="ca-widget-area__inner">
      <CaWidgetContainer
        v-for="(container, index) in containers"
        :key="index"
        :container="container"
        :widget-area-variables="widgetAreaVariables"
        :widget-image-sizes="widgetImageSizes"
        :is-first="index === 0"
      />
    </div>
  </div>
</template>
<script>
import widgetAreaQuery from 'global/widget-area.graphql';
import MixApolloRefetch from 'MixApolloRefetch';

// @group Molecules
// @vuese
// The area that contains the widget containers and from which the graphql query for widgets is made.<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-area.scss_
export default {
  name: 'CaWidgetArea',
  mixins: [MixApolloRefetch],
  props: {
    // The widget area family
    family: {
      type: String,
      default: '',
    },
    // The widget area name
    areaName: {
      type: String,
      default: '',
    },
    // The widget area alias, if content page
    alias: {
      type: String,
      default: '',
    },
    // Sizes attribute for widget images. Set with widget size as key like so: `{full: '(min-width:1360px) 1320px, 96vw'}` etc. Defaults to $config.widgetImageSizes if not set
    widgetImageSizes: {
      type: Object,
      default: null,
    },
    // Filters for the area
    filters: {
      type: Array,
      default: () => [],
    },
    // Set to true for preview mode
    preview: {
      type: Boolean,
      default: false,
    },
    // Url for list page if using /l/ routing and widget area is on list page
    listPageUrl: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    widgetArea: null,
  }),
  async fetch() {
    this.widgetArea = await this.$apollo
      .query({
        query: widgetAreaQuery,
        variables: this.widgetAreaVariables,
      })
      .then((result) => {
        this.$emit('dataFetched', result.data);
        return result?.data?.widgetArea;
      })
      .catch((error) => {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
      });
  },
  computed: {
    displaySetting() {
      return this.$store.getters.viewport === 'phone' ? 'mobile' : 'desktop'; // Not consistent with rest of viewport usage, but would require API changes
    },
    widgetAreaVariables() {
      return {
        family: this.family,
        areaName: this.areaName,
        widgetAlias: this.alias,
        displaySetting: this.displaySetting,
        filters: this.filters,
        preview: this.preview,
        customerType: this.$store.state.customerType,
        url: this.listPageUrl,
      };
    },
    containers() {
      return this.widgetArea?.containers?.length
        ? this.widgetArea.containers
        : [];
    },
  },
  watch: {
    widgetAreaVariables: {
      deep: true,
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.$emit('variables-change');
          this.$fetch();
        }
      },
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-area';
</style>
