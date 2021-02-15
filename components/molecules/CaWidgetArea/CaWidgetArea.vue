<template>
  <div class="ca-widget-area">
    <div v-if="containers.length" class="ca-widget-area__inner">
      <CaWidgetContainer
        v-for="(container, index) in containers"
        :key="index"
        :widgets="container.widgets"
        :layout="container.layout"
        :widget-image-sizes="widgetImageSizes"
      />
    </div>
  </div>
</template>
<script>
import widgetAreaQuery from 'global/widget-area.graphql';
// @group Molecules
// @vuese
// The area that contains the widget containers and from which the graphql query for widgets is made.<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-area.scss_
export default {
  name: 'CaWidgetArea',
  apollo: {
    widgetArea: {
      query: widgetAreaQuery,
      variables() {
        return {
          apiKey: this.$config.apiKey.toString(),
          family: this.family,
          areaName: this.areaName,
          alias: this.alias,
          displaySetting: this.displaySetting,
          filters: this.filters
        };
      },
      result(result) {
        this.$emit('dataFetched', result.data);
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  mixins: [],
  props: {
    // The widget area family
    family: {
      type: String,
      default: ''
    },
    // The widget area name
    areaName: {
      type: String,
      default: ''
    },
    // The widget area alias, if content page
    alias: {
      type: String,
      default: ''
    },
    // Sizes attribute for widget images. Set with widget size as key like so: `{full: '(min-width:1360px) 1320px, 96vw'}` etc. Defaults to $config.widgetImageSizes if not set
    widgetImageSizes: {
      type: Object,
      default: null
    },
    // Filters for the area
    filters: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({}),
  computed: {
    displaySetting() {
      return this.$store.getters.viewport === 'phone' ? 'mobile' : 'desktop'; // Not consistent with rest of viewport usage, but would require API changes
    },
    containers() {
      return this.widgetArea &&
        this.widgetArea.containers &&
        this.widgetArea.containers.length
        ? this.widgetArea.containers
        : [];
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-area';
</style>
