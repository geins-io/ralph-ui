<template>
  <div class="ca-widget-buttons">
    <CaButton
      v-for="(button, index) in configuration.buttons"
      :key="index"
      :href="button.url"
      class="ca-widget-buttons__button"
      @clicked="clickHandler"
    >
      {{ button.buttonText }}
    </CaButton>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// A widget tha displays one or more buttons<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-buttons.scss_
export default {
  name: 'CaWidgetButtons',
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Pushing the widget:click event
    clickHandler() {
      this.$store.dispatch('events/push', {
        type: 'widget:click',
        data: {
          href: this.button.url,
        },
      });
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-buttons';
</style>
