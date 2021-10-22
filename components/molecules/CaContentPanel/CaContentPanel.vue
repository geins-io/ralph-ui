<template>
  <div>
    <client-only>
      <transition :name="transitionName">
        <section
          v-if="opened"
          ref="contentpanel"
          class="ca-content-panel"
          :class="modifiers"
        >
          <header class="ca-content-panel__header">
            <!-- The content panel header -->
            <slot name="header">
              <!--`<h1 class="ca-content-panel__title">{{ title }}</h1>`-->
              <h1 class="ca-content-panel__title">{{ title }}</h1>
            </slot>
            <CaIconButton
              class="ca-content-panel__close-icon"
              icon-name="x"
              :aria-label="$t('CLOSE')"
              @clicked="close"
            />
          </header>
          <section class="ca-content-panel__body">
            <!-- The main content of the content panel. This content will be scrollable when overflowing -->
            <slot></slot>
          </section>
          <footer class="ca-content-panel__footer">
            <!-- The content panel footer -->
            <slot name="footer">
              <!--`<button type="button" class="ca-content-panel__close-button" @click="close"><CaIconAndText icon-name="x">{{ $t('CLOSE') }}</CaIconAndText></button>`-->
              <button
                type="button"
                class="ca-content-panel__close-button"
                @click="close"
              >
                <CaIconAndText icon-name="x">{{ $t('CLOSE') }}</CaIconAndText>
              </button>
            </slot>
          </footer>
        </section>
      </transition>
      <CaOverlay
        class="ca-content-panel__overlay"
        :visible="opened"
        @clicked="close"
      />
    </client-only>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import eventbus from '~/plugins/event-bus.js';

// @group Molecules
// @vuese
// A content panel to display content off canvas, for example the cart, the mobile navigation or a country picker<br>
// Triggered like so: `$store.commit('contentpanel/open', {name: String, frame: String (optional)});`<br><br>
// **SASS-path:** _./styles/components/molecules/ca-content-panel.scss_
export default {
  name: 'CaContentPanel',
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
    // Direction from which to enter from on smaller screens (< 768)
    enterFrom: {
      // 'bottom', 'left', 'right'
      type: String,
      default: 'right'
    },
    // Direction from which to enter from on larger screens (>= 768). Defaults to `enterFrom` if not set
    enterFromTabletUp: {
      // 'right', 'left'
      type: String,
      default: ''
    }
  },
  data: () => ({
    opened: false
  }),
  computed: {
    modifiers() {
      return {
        'ca-content-panel--left': this.currentEnterFrom === 'left',
        'ca-content-panel--right': this.currentEnterFrom === 'right',
        'ca-content-panel--bottom': this.currentEnterFrom === 'bottom'
      };
    },
    currentEnterFromTabletUp() {
      return this.enterFromTabletUp ? this.enterFromTabletUp : this.enterFrom;
    },
    currentEnterFrom() {
      return this.$store.getters.viewport === 'phone'
        ? this.enterFrom
        : this.currentEnterFromTabletUp;
    },
    transitionName() {
      return 'pop-from-' + this.currentEnterFrom;
    },
    ...mapState(['contentpanel'])
  },
  watch: {
    'contentpanel.current'(newVal) {
      if (newVal === this.name) {
        this.open();
      } else if (this.opened) {
        enableBodyScroll(this.$refs.contentpanel);
        this.opened = false;
      }
    }
  },
  mounted() {
    eventbus.$on('close-content-panel', () => {
      this.close();
    });
    eventbus.$on('route-change', route => {
      if (this.opened && route.to.path !== route.from.path) {
        this.close();
      }
    });
    if (this.contentpanel.current === this.name) {
      this.open();
    }
  },
  beforeDestroy() {
    this.close();
    eventbus.$off('route-change');
    eventbus.$off('close-content-panel');
  },
  methods: {
    // Open the content panel
    open() {
      this.$store.dispatch('setScrollbarWidth');
      this.opened = true;
      this.$nextTick(() => {
        disableBodyScroll(this.$refs.contentpanel);
      });
    },
    // Close the content panel. Can be triggered via eventbus call `close-content-panel`
    close() {
      if (this.opened) {
        enableBodyScroll(this.$refs.contentpanel);
        this.$store.commit('contentpanel/close');
        this.opened = false;
      }
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-content-panel';
</style>
