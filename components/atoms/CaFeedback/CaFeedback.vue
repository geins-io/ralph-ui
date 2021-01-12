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
import CaIcon from 'CaIcon';
import CaIconButton from 'CaIconButton';
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-feedback.scss_
export default {
  name: 'CaFeedback',
  components: { CaIcon, CaIconButton },
  mixins: [],
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return ['info', 'success', 'error'].includes(value);
      }
    },
    message: {
      type: String,
      required: true
    }
  },
  data: () => ({
    visible: false
  }),
  computed: {
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
    typeClass() {
      return 'ca-feedback--' + this.type;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-feedback';
</style>
