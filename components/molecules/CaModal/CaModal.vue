<template>
  <div>
    <transition v-if="opened" name="grow">
      <div
        v-show="contentLoaded"
        ref="modal"
        class="ca-modal"
        :class="{ 'ca-modal--prompt': isPrompt }"
      >
        <CaIconButton
          v-if="!isPrompt"
          class="ca-modal__close"
          icon-name="x"
          aria-label="Close"
          @clicked="closeModal"
        />
        <div class="ca-modal__content">
          <component
            :is="modal.component"
            v-bind="modal.componentProps"
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
import eventbus from '~/plugins/event-bus.js';
// @group Molecules
// @vuese
// A modal that can display a component inside it. Is triggered like so: `this.$store.commit('modal/open', modalSettings)`. modalSettings should be an object including component (String) and componentProps (Object). The component must emit event ready when content is loaded.<br><br>
// **SASS-path:** _./styles/components/molecules/ca-modal.scss_
export default {
  name: 'CaModal',
  mixins: [],
  props: {},
  data: () => ({
    contentLoaded: false,
    opened: false
  }),
  computed: {
    isPrompt() {
      return this.modal.component === 'CaPrompt';
    },
    ...mapState(['modal'])
  },
  watch: {
    'modal.component'(newVal, oldVal) {
      if (oldVal === '' && newVal !== oldVal) {
        this.openModal();
      }
    }
  },
  mounted() {
    eventbus.$on('close-modal', () => {
      this.closeModal();
    });
  },
  methods: {
    onReady() {
      this.contentLoaded = true;
      this.$store.dispatch('loading/end');
    },
    openModal() {
      this.opened = true;
      this.$store.dispatch('loading/start');
      this.$nextTick(() => {
        disableBodyScroll(this.$refs.modal);
      });
    },
    closeModal(fromStateChange = false) {
      this.contentLoaded = false;
      if (!fromStateChange) {
        this.$store.commit('modal/close');
      }
      enableBodyScroll(this.$refs.modal);
      this.$nextTick(() => {
        this.opened = false;
      });
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-modal';
</style>