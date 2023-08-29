<template>
  <div class="ca-widget-video">
    <div
      v-if="playInModal || !videoReady"
      class="ca-widget-video__image-wrap"
      :style="{ paddingBottom: ratioPadding }"
    >
      <CaImage
        v-if="filename"
        class="ca-widget-video__image"
        type="pagewidget"
        :alt="altText"
        :filename="filename"
        :ratio="currentRatio"
        :sizes="imageSizes"
      />
      <button
        type="button"
        class="ca-widget-video__play-icon"
        aria-label="Play"
        @click="loadVideo"
      >
        <CaIcon v-if="!loading" name="play" />
        <CaSpinner class="ca-widget-video__spinner" :loading="loading" />
      </button>
    </div>
    <CaVideo
      v-if="playing && !playInModal"
      class="ca-widget-video__video"
      :class="videoModifiers"
      v-bind="videoProps"
      @ready="videoReady = true"
    />
  </div>
</template>
<script>
import MixWidgetImage from 'MixWidgetImage';
// @group Molecules
// @vuese
// The widget video component. Shows either a Youtube or Vimeo video, displayed either on the page or in a modal<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-video.scss_
export default {
  name: 'CaWidgetVideo',
  mixins: [MixWidgetImage],
  props: {},
  data: () => ({
    playerWidth: 1600,
    playerHeight: 900,
    playerRatio: 0,
    videoReady: false,
    playing: false,
  }),
  computed: {
    videoId() {
      return this.configuration.videoId.toString();
    },
    videoProvider() {
      return this.configuration.videoProvider === 0 ? 'youtube' : 'vimeo';
    },
    videoModifiers() {
      return {
        'ca-widget-video__video--not-ready': !this.videoReady,
      };
    },
    ratioPadding() {
      return Math.round((this.playerRatio + Number.EPSILON) * 100) + '%';
    },
    loading() {
      return !this.playInModal && this.playing && !this.videoReady;
    },
    playInModal() {
      return (
        this.configuration.videoDisplayType === 1 &&
        this.$store.getters.viewport !== 'phone'
      );
    },
    videoProps() {
      return {
        videoId: this.videoId,
        videoProvider: this.videoProvider,
        playerWidth: this.playerWidth,
        playerHeight: this.playerHeight,
        ratio: this.playerRatio,
      };
    },
  },
  watch: {},
  mounted() {},
  created() {
    this.setPlayerRatio();
  },
  methods: {
    loadVideo() {
      this.playing = true;
      if (this.playInModal) {
        const modalSettings = {
          component: 'CaVideo',
          componentProps: this.videoProps,
        };
        this.$store.commit('modal/open', modalSettings);
      }
    },
    setPlayerRatio() {
      const width = this.imageRatios.length
        ? this.currentSize.imageWidth
        : this.playerWidth;
      const height = this.imageRatios.length
        ? this.currentSize.imageHeight
        : this.playerHeight;

      this.playerRatio = height / width;

      if (!this.playInModal) {
        this.playerWidth = width;
        this.playerHeight = height;
      }
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-video';
</style>
