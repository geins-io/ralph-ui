<template>
  <transition name="slide-and-fade">
    <div v-if="visible" class="ca-feedback" :class="typeClass">
      <CaIcon class="ca-feedback__icon" :name="icon" />
      <div class="ca-feedback__message">{{ message }}</div>
      <CaIconButton
        class="ca-feedback__close"
        icon-name="x"
        aria-label="Close"
        @clicked="hide"
      />
    </div>
  </transition>
</template>
<script>
// @group Atoms
// @vuese
// An inline feedback box<br><br>
// **SASS-path:** _./styles/components/atoms/ca-feedback.scss_
export default {
  name: 'CaFeedback',
  mixins: [],
  props: {
    // Type of feedback
    type: {
      // `info`, `success`, `error`
      type: String,
      default: 'info',
      validator(value) {
        return ['info', 'success', 'error'].includes(value);
      }
    },
    // The feedback message to be displayed
    message: {
      type: String,
      required: true
    }
  },
  data: () => ({
    visible: false
  }),
  computed: {
    // @vuese
    // The icon to be used
    // @type String
    icon() {
      switch (this.type) {
        case 'success':
          return 'check-circle';
        case 'error':
          return 'alert-octagon';
        default:
          return 'info';
      }
    },
    // @vuese
    // The type modifier class
    // @type String
    typeClass() {
      return 'ca-feedback--' + this.type;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Show the feedback
    show() {
      this.visible = true;
    },
    // @vuese
    // Hide the feedback
    hide() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-feedback';
</style>
