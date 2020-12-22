<template>
  <div class="ca-widget-area">
    <div v-if="containers.length" class="ca-widget-area__inner">
      <CaWidgetContainer
        v-for="(container, index) in containers"
        :key="index"
        :widgets="container.widgets"
      />
    </div>
  </div>
</template>
<script>
import CaWidgetContainer from 'CaWidgetContainer';
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
          displaySetting: this.displaySetting
        };
      },
      result() {
        this.$emit('dataFetched');
      },
      error(error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  },
  components: { CaWidgetContainer },
  mixins: [],
  props: {
    // The widget area family
    family: {
      type: String,
      required: true
    },
    // The widget area name
    areaName: {
      type: String,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    displaySetting() {
      return this.$store.getters.viewportMobile ? 'mobile' : 'desktop';
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
