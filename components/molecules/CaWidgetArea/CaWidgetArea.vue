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
import gql from 'graphql-tag';
import CaWidgetContainer from 'CaWidgetContainer';
// @group Molecules
// @vuese
export default {
  name: 'CaWidgetArea',
  apollo: {
    widgetArea: {
      query: gql`
        query widgetArea(
          $apiKey: String!
          $family: String!
          $areaName: String!
          $displaySetting: String!
        ) {
          widgetArea(
            apiKey: $apiKey
            family: $family
            areaName: $areaName
            displaySetting: $displaySetting
          ) {
            containers {
              widgets {
                name
                size
                configuration
              }
            }
          }
        }
      `,
      variables() {
        return {
          apiKey: this.$store.getters.currentApiKey,
          family: this.family,
          areaName: this.areaName,
          displaySetting: this.displaySetting
        };
      }
    }
  },
  components: { CaWidgetContainer },
  mixins: [],
  props: {
    family: {
      type: String,
      required: true
    },
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
      return this.widgetArea && this.widgetArea.containers.length
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
.ca-widget-area {
  &__inner {
    margin-top: -$widget-spacing;
  }
}
</style>
