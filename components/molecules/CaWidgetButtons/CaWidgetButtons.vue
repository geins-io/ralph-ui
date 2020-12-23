<template>
  <div class="ca-widget-buttons">
    <CaButton
      v-for="(button, index) in buttons"
      :key="index"
      :href="button.Url"
      class="ca-widget-buttons__button"
    >
      {{ button.ButtonText }}
    </CaButton>
  </div>
</template>
<script>
import CaButton from 'CaButton';
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-buttons.scss_
export default {
  name: 'CaWidgetButtons',
  components: { CaButton },
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
    buttons() {
      return JSON.parse(this.configuration.Buttons);
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-buttons';
</style>
