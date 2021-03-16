<template>
  <div class="ca-prompt">
    <div class="ca-prompt__header">
      <div class="ca-prompt__title">{{ title }}</div>
      <CaIconButton
        icon-name="x"
        class="ca-prompt__close"
        aria-label="Close"
        @clicked="$emit('close')"
      />
    </div>
    <div class="ca-prompt__body">
      <div class="ca-prompt__text">
        {{ text }}
      </div>
    </div>
    <div class="ca-prompt__footer">
      <CaButton color="transparent" @clicked="$emit('close')">Avbryt</CaButton>
      <CaButton :color="button.color" @clicked="button.clickHandler">
        {{ button.text }}
      </CaButton>
    </div>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-prompt.scss_
export default {
  name: 'CaPrompt',
  mixins: [],
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    button: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {
    this.$emit('ready');
  },
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-prompt';
</style>
