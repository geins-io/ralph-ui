<template>
  <div class="ca-read-more" :class="modifiers">
    <div
      ref="text"
      class="ca-read-more__text"
      :style="{ height: textHeightComputed + 'px' }"
    >
      <!-- Text content -->
      <slot></slot>
    </div>
    <button
      v-if="toggleActive"
      type="button"
      class="ca-read-more__button"
      @click="toggleText"
    >
      <CaIconAndText :icon-name="iconName" icon-position="right">
        {{ toggleButtonText }}
      </CaIconAndText>
    </button>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Used to hide part of text and display a "read more"-toggle<br><br>
// **SASS-path:** _./styles/components/molecules/ca-read-more.scss_
export default {
  name: 'CaReadMore',
  mixins: [],
  props: {
    // Maximum height of text to show before 'read more'-function to kick in
    maxHeight: {
      type: Number,
      default: 60
    }
  },
  data: () => ({
    visible: false,
    ready: false,
    textHeight: 0,
    scrollHeight: 0
  }),
  computed: {
    modifiers() {
      return {
        'ca-read-more--visible': this.visible || !this.toggleActive,
        'ca-read-more--ready': this.ready
      };
    },
    toggleButtonText() {
      return this.visible ? this.$t('READ_LESS') : this.$t('READ_MORE');
    },
    toggleActive() {
      return this.scrollHeight > this.maxHeight;
    },
    iconName() {
      return this.visible ? 'chevron-up' : 'chevron-down';
    },
    textHeightComputed() {
      return !this.textHeight ? this.maxHeight : this.textHeight;
    }
  },
  watch: {},
  mounted() {
    this.setHeights();
  },
  methods: {
    // @vuese
    // Set heights
    setHeights() {
      this.scrollHeight = this.$refs.text.scrollHeight;
      this.textHeight = this.toggleActive
        ? this.maxHeight
        : this.$refs.text.scrollHeight;
      this.ready = true;
    },
    // @vuese
    // Toggle read more/read less
    toggleText() {
      this.visible = !this.visible;
      if (!this.visible && this.toggleActive) {
        this.textHeight = this.maxHeight;
      } else if (this.visible) {
        this.textHeight = this.$refs.text.scrollHeight;
      } else {
        this.textHeight = 0;
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-read-more';
</style>
