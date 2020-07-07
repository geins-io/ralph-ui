<template>
  <div class="ca-read-more" :class="modifiers">
    <div
      ref="text"
      class="ca-read-more__text"
      :style="{ height: textHeight + 'px' }"
    >
      <slot></slot>
    </div>
    <button
      v-if="toggleActive"
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
import CaIconAndText from '../../molecules/CaIconAndText/CaIconAndText.vue';
// @group Molecules
// @vuese
export default {
  name: 'CaReadMore',
  components: { CaIconAndText },
  mixins: [],
  props: {
    maxHeight: {
      type: Number,
      default: 60
    }
  },
  data: () => ({
    visible: false,
    textHeight: 0,
    scrollHeight: 0
  }),
  computed: {
    modifiers() {
      return {
        'ca-read-more--visible': this.visible || !this.toggleActive
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
    }
  },
  watch: {},
  mounted() {
    this.setHeights();
  },
  methods: {
    setHeights() {
      this.scrollHeight = this.$refs.text.scrollHeight;
      this.textHeight = this.toggleActive
        ? this.maxHeight
        : this.$refs.text.scrollHeight;
    },
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
.ca-read-more {
  &__text {
    overflow: hidden;
    transition: height 200ms ease;
    position: relative;
    &:after {
      content: '';
      display: block;
      height: 50%;
      width: 100%;
      background-image: linear-gradient(transparent, $c-white);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 1;
      transition: opacity 200ms ease;
    }
  }
  &__button {
    font-weight: $font-weight-bold;
    text-transform: uppercase;
    margin-top: $px8;
  }
  &--visible & {
    &__text:after {
      opacity: 0;
    }
  }
}
</style>
