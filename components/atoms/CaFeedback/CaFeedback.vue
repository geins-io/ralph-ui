<template>
  <transition name="slide-and-fade">
    <div v-if="visible || constant" class="ca-feedback" :class="typeClass">
      <CaIcon class="ca-feedback__icon" :name="icon" />
      <div class="ca-feedback__message">
        <slot>{{ message }}</slot>
      </div>
      <CaIconButton
        v-if="!constant"
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
      },
    },
    // The feedback message to be displayed
    message: {
      type: String,
      default: '',
    },
    // Set to true if the feedback message should be visible at all time
    constant: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    visible: false,
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
    },
  },
  watch: {},
  mounted() {},
  created() {},
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
    },
  },
};
</script>
<style lang="scss">
@import 'atoms/ca-feedback';
</style>
