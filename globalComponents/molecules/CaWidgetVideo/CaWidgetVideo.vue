<template>
  <div class="ca-widget-video">
    <div
      v-if="!videoReady"
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
      <button class="ca-widget-video__play-icon" @click="playing = true">
        <CaIcon v-if="!loading" name="play" />
        <CaSpinner class="ca-widget-video__spinner" :loading="loading" />
      </button>
    </div>
    <div v-if="playing" class="ca-widget-video__video" :class="videoModifiers">
      <Youtube
        v-if="configuration.videoProvider === 0"
        ref="youtube"
        :width="playerWidth"
        :height="playerHeight"
        :player-vars="playerVars"
        :video-id="configuration.videoId"
        :fit-parent="true"
        :resize="true"
        @ready="startPlaying"
      />
    </div>
  </div>
</template>
<script>
import MixWidgetImage from 'MixWidgetImage';
import { Youtube } from 'vue-youtube';
// @group Molecules
// @vuese
// The widget video component. Shows either a Youtube or Vimeo video, displayed either on the page or in a modal<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-video.scss_
export default {
  name: 'CaWidgetVideo',
  components: { Youtube },
  mixins: [MixWidgetImage],
  props: {},
  data: () => ({
    playerWidth: 1600,
    playerHeight: 900,
    playerRatio: 0,
    playerVars: {
      rel: 0,
      modestbranding: 1
    },
    videoReady: false,
    playing: false
  }),
  computed: {
    ytPlayer() {
      return this.$refs.youtube.player;
    },
    videoModifiers() {
      return {
        'ca-widget-video__video--not-ready': !this.videoReady
      };
    },
    ratioPadding() {
      return Math.round((this.playerRatio + Number.EPSILON) * 100) + '%';
    },
    loading() {
      return this.playing && !this.videoReady;
    }
  },
  watch: {},
  mounted() {},
  created() {
    this.setPlayerRatio();
  },
  methods: {
    startPlaying() {
      console.log('is ready');
      this.videoReady = true;
      this.ytPlayer.playVideo();
    },
    setPlayerRatio() {
      if (this.imageRatios.length) {
        this.playerWidth = this.currentSize.imageWidth;
        this.playerHeight = this.currentSize.imageHeight;
      }
      this.playerRatio = this.playerHeight / this.playerWidth;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-video';
</style>
