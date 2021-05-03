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
      <CaButton
        class="ca-prompt__button"
        color="transparent"
        @clicked="$emit('close')"
      >
        {{ $t('ACCOUNT_SETTINGS_CANCEL') }}
      </CaButton>
      <CaButton
        class="ca-prompt__button"
        :color="button.color"
        @clicked="button.clickHandler"
      >
        {{ button.text }}
      </CaButton>
    </div>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Prompt component made to be used in the modal component to prompt about stuff<br><br>
// **SASS-path:** _./styles/components/molecules/ca-prompt.scss_
export default {
  name: 'CaPrompt',
  mixins: [],
  props: {
    // Prompt title
    title: {
      type: String,
      required: true
    },
    // Prompt text
    text: {
      type: String,
      required: true
    },
    // Prompt confirm button. Object need to include color, text and clickHandler
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
