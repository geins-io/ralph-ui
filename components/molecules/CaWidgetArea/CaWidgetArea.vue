<template>
  <div v-if="containers.length" class="ca-widget-area">
    <div class="ca-widget-area__inner">
      <CaWidgetContainer
        v-for="(container, index) in containers"
        :key="index"
        :container="container"
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
        return this.widgetAreaVariables;
      },
      errorPolicy: 'all',
      result(result) {
        this.dataFetched = true;
        // this.checkMounted();
        this.$emit('dataFetched', result.data);
      },
      skip() {
        return this.isParentLoaded;
      },
      error(error) {
        this.$nuxt.error({ statusCode: error.statusCode, message: error });
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
    },
    // Whether preview-mode should be toggle on
    preview: {
      type: Boolean,
      default: false
    },
    // if true - component loads info on its own
    isParentLoaded: {
      type: Boolean,
      default: false
    },
    // Is loadedData loaded
    isParentDataLoaded: {
      type: Boolean,
      default: false
    },
    // Data of widget that we receive from parent component. Avaible only if isParentLoaded are true
    loadedData: {
      type: Object,
      default: null
    },
    // Url for list page if using /l/ routing
    listPageUrl: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    // containersMounted: 0,
    dataFetched: false,
    isComponentMount: false
  }),
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
        url: this.listPageUrl
      };
    },
    containers() {
      if (this.isParentLoaded) {
        return this.loadedData?.containers ? this.loadedData.containers : [];
      }

      return this.widgetArea?.containers?.length
        ? this.widgetArea.containers
        : [];
    }
  },
  watch: {
    widgetAreaVariables: {
      deep: true,
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.$emit('variables-change');
        }
      }
    }
    // containersMounted: {
    //   handler() {
    //     this.checkMounted();
    //   },
    //   immediate: true
    // }
  },
  mounted() {},
  methods: {
    checkMounted() {
      if (
        !this.isComponentMount &&
        this.containersMounted === this.containers?.length &&
        (this.dataFetched || (this.isParentLoaded && this.isParentDataLoaded))
      ) {
        this.isComponentMount = true;
        this.$emit('widget-area-mounted');
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-area';
</style>
