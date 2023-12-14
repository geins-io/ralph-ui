<template>
  <div>
    <transition v-if="opened" name="grow">
      <div
        v-show="contentLoaded"
        class="ca-modal"
        role="dialog"
        aria-labelledby="ca-modal__title"
        aria-describedby="ca-modal__description"
        :style="styleAttrs"
      >
        <CaIconButton
          v-if="!isPrompt"
          class="ca-modal__close"
          icon-name="x"
          aria-label="Close"
          @clicked="closeModal"
        />
        <div ref="content" class="ca-modal__content">
          <component
            :is="modal.component"
            v-bind="componentProps"
            @ready="onReady"
            @close="closeModal"
          />
        </div>
      </div>
    </transition>
    <CaOverlay
      class="ca-modal__overlay"
      :visible="opened"
      @clicked="closeModal"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
// @group Molecules
// @vuese
// A modal that can display a component inside it. Is triggered like so: `this.$store.commit('modal/open', modalSettings)`. modalSettings should be an object including component (String) and componentProps (Object). The component must emit event ready when content is loaded.<br><br>(Aria label & description)[https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role] is based on element with ids "ca-modal__title" & "ca-modal__description". Make sure to specify these in loaded component
// **SASS-path:** _./styles/components/molecules/ca-modal.scss_
export default {
  name: 'CaModal',
  mixins: [],
  props: {},
  data: () => ({
    contentLoaded: false,
    opened: false,
    width: null,
  }),
  computed: {
    componentProps() {
      return this.modal?.componentProps || {};
    },
    isPrompt() {
      return this.modal.component === 'CaPrompt';
    },
    ratio() {
      return this.componentProps.ratio ? this.componentProps.ratio : null;
    },
    styleAttrs() {
      const obj = {};
      if (this.width) {
        obj.width = this.width;
      }
      return obj;
    },
    ...mapState(['modal', 'viewportWidth']),
  },
  watch: {
    'modal.component'(newVal, oldVal) {
      if (oldVal === '' && newVal !== oldVal) {
        this.openModal();
      }
    },
    viewportWidth(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setSize();
      }
    },
  },
  mounted() {
    this.$ralphBus.$on('close-modal', () => {
      this.closeModal();
    });
  },
  beforeUnmount() {
    this.$ralphBus.$off('close-modal');
  },
  methods: {
    onReady() {
      this.contentLoaded = true;
      this.$store.dispatch('loading/end');
    },
    openModal() {
      this.setSize();
      this.opened = true;
      this.$store.dispatch('loading/start');
      this.$store.dispatch('setViewportHeight');
      this.$store.dispatch('setScrollbarWidth');
      this.$nextTick(() => {
        disableBodyScroll(this.$refs.content);
      });
    },
    closeModal(fromStateChange = false) {
      this.contentLoaded = false;
      if (!fromStateChange) {
        this.$store.commit('modal/close');
      }
      if (this.$refs.content) {
        enableBodyScroll(this.$refs.content);
      }
      this.$nextTick(() => {
        this.opened = false;
      });
    },
    setSize() {
      if (this.ratio) {
        const maxHeight = window.innerHeight * 0.95;
        const maxWidth = window.innerWidth * 0.95;
        const screenRatio = maxHeight / maxWidth;
        let width = maxWidth;
        if (screenRatio < this.ratio) {
          width = maxHeight / this.ratio;
        }
        this.width = Math.round(width) + 'px';
      }
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-modal';
</style>
