<template>
  <div>
    <transition :name="transitionName">
      <div
        v-if="opened"
        ref="contentpanel"
        class="ca-content-panel"
        :class="modifiers"
      >
        <CaIcon class="ca-content-panel__close-icon" name="x" />
        <div class="ca-content-panel__header">
          <!-- The content panel header -->
          <slot name="header">
            <!--`<span class="ca-content-panel__title">{{ title }}</span>`-->
            <span class="ca-content-panel__title">{{ title }}</span>
          </slot>
        </div>
        <div class="ca-content-panel__body">
          <!-- The main content of the content panel. This content will be scrollable when overflowing -->
          <slot></slot>
        </div>
        <div class="ca-content-panel__footer">
          <!-- The content panel footer -->
          <slot name="footer">
            <!--`<button class="ca-content-panel__close-button" @click="close"><CaIconAndText icon-name="x">{{ $t('CLOSE') }}</CaIconAndText></button>`-->
            <button class="ca-content-panel__close-button" @click="close">
              <CaIconAndText icon-name="x">{{ $t('CLOSE') }}</CaIconAndText>
            </button>
          </slot>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <CaOverlay
        v-if="opened"
        class="ca-content-panel__overlay"
        :visible="opened"
        @clicked="close"
      />
    </transition>
  </div>
</template>
<script>
import CaOverlay from 'CaOverlay';
import CaIcon from 'CaIcon';
import CaIconAndText from 'CaIconAndText';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { mapState } from 'vuex';
import eventbus from '~/plugins/event-bus.js';

// @group Molecules
// @vuese
// A content panel to display content off canvas, for example the cart, the mobile navigation or a country picker
export default {
  name: 'CaContentPanel',
  components: { CaOverlay, CaIcon, CaIconAndText },
  mixins: [],
  props: {
    // The name id of the content panel. Used in trigger call to open panel
    name: {
      type: String,
      required: true
    },
    // Title to be displayed in the header of the content panel
    title: {
      // ''
      type: String,
      default: ''
    },
    // Direction from which to enter from on smaller screens
    enterFromMobile: {
      // 'bottom', 'left', 'right'
      type: String,
      default: 'bottom'
    },
    // Direction from which to enter from on larger screens
    enterFromDesktop: {
      // 'right', 'left'
      type: String,
      default: 'right'
    },
    // True if panel should only exist on bigger screens
    onlyDesktop: {
      type: Boolean,
      // `false`
      default: false
    },
    // True if panel should only exist on smaller screens
    onlyMobile: {
      type: Boolean,
      // `false`
      default: false
    }
  },
  data: () => ({
    opened: false,
    unwatch: null
  }),
  computed: {
    modifiers() {
      return {
        'ca-content-panel--left': this.enterFrom === 'left',
        'ca-content-panel--right': this.enterFrom === 'right',
        'ca-content-panel--bottom': this.enterFrom === 'bottom'
      };
    },
    enterFrom() {
      return this.$store.getters.viewportLaptop
        ? this.enterFromDesktop
        : this.enterFromMobile;
    },
    transitionName() {
      return 'pop-from-' + this.enterFrom;
    },
    ...mapState(['viewportWidth'])
  },
  watch: {
    viewportWidth(newVal) {
      if (
        (newVal >= 1024 && this.onlyMobile) ||
        (newVal < 1024 && this.onlyDesktop)
      ) {
        this.close();
      }
    }
  },
  mounted() {
    eventbus.$on('close-content-panel', () => {
      this.close();
    });
    eventbus.$on('route-change', () => {
      if (this.opened) {
        this.close();
      }
    });
    // TODO: revert this later
    window.addEventListener('beforeunload', event => {
      if (this.opened) {
        this.close();
      }
    });
  },
  created() {
    this.unwatch = this.$store.watch(
      state => state.contentpanel.current,
      newVal => {
        if (newVal === this.name) {
          this.open();
        }
      }
    );
  },
  beforeDestroy() {
    this.close();
    this.unwatch();
  },
  methods: {
    // Open the content panel
    open() {
      this.setScrollbarWidth();
      // const options = {
      //   reserveScrollBarGap: true
      // };
      disableBodyScroll(this.$refs.contentpanel);
      this.opened = true;
      // document.body.classList.add('content-panel-open');
    },
    // Close the content panel. Can be triggered via eventbus call `close-content-panel`
    close() {
      // document.body.classList.remove('content-panel-open');
      this.$store.commit('contentpanel/close');
      this.opened = false;
      clearAllBodyScrollLocks();
    },
    // Set scrollbar width, used to keep gap when disabeling body scroll
    setScrollbarWidth() {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        scrollbarWidth + 'px'
      );
    }
  }
};
</script>
<style lang="scss">
.ca-content-panel {
  $block: &;
  z-index: $z-index-panel;
  background: $c-white;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  &__close-icon {
    font-size: 20px;
    color: $c-white;
    position: absolute;
    top: 13px;
    pointer-events: none;
  }
  &__header {
    height: 50px;
    border-bottom: $border-light;
    @include flex-calign;
    background: $c-content-panel-header-bg;
    color: $c-content-panel-header-txt;
  }
  &__title {
    font-weight: $font-weight-bold;
    font-size: $font-size-l;
  }
  &__body {
    flex: 1;
    overflow: auto;
    position: relative;
  }
  &__close-button {
    height: 50px;
    color: $c-text-inverse;
    background-color: $c-darkest-gray;
    width: 100%;
    text-transform: uppercase;
  }
  &--left {
    top: 0;
    left: 0;
    width: 90vw;
    #{$block}__close-icon {
      right: -27px;
    }
  }
  &--right {
    top: 0;
    right: 0;
    width: 90vw;
    #{$block}__close-icon {
      left: -27px;
    }
  }
  &--bottom {
    height: 93vh;
    width: 100vw;
    max-width: 100vw;
    left: 0;
    right: 0;
    #{$block}__close-icon {
      display: none;
    }
  }
}
</style>
