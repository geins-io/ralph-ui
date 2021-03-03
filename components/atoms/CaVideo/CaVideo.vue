<template>
  <div class="ca-video">
    <LazyYoutube
      v-if="isYoutube"
      ref="youtube"
      class="ca-video__player"
      :width="playerWidth"
      :height="playerHeight"
      :player-vars="youtubeOptions"
      :video-id="videoId"
      :fit-parent="true"
      :resize="true"
      @ready="onReady"
    />
    <LazyVimeo
      v-if="isVimeo"
      ref="vimeo"
      class="ca-video__player"
      :player-width="playerWidth"
      :player-height="playerHeight"
      :video-id="videoId"
      :options="vimeoOptions"
      :events-to-emit="[]"
      @ready="onReady"
    />
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Video component that plays a Youtube or a Vimeo video<br><br>
// **SASS-path:** _./styles/components/atoms/ca-video.scss_
export default {
  name: 'CaVideo',
  components: {
    LazyYoutube: () => import('vue-youtube').then(({ Youtube }) => Youtube),
    LazyVimeo: () =>
      import('vue-vimeo-player').then(({ vueVimeoPlayer }) => vueVimeoPlayer)
  },
  mixins: [],
  props: {
    // The video provider to use
    videoProvider: {
      // `youtube`, `vimeo`
      type: String,
      required: true,
      validator(value) {
        return ['youtube', 'vimeo'].includes(value);
      }
    },
    // The Youtube or Vimeo id
    videoId: {
      type: String,
      required: true
    },
    // Width of player
    playerWidth: {
      type: Number,
      default: 1600
    },
    // Height of player
    playerHeight: {
      type: Number,
      default: 900
    }
  },
  data: () => ({
    youtubeOptions: {
      rel: 0,
      modestbranding: 1
    },
    vimeoOptions: {
      responsive: true
    }
  }),
  computed: {
    isYoutube() {
      return this.videoProvider === 'youtube';
    },
    isVimeo() {
      return this.videoProvider === 'vimeo';
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    onReady() {
      this.$emit('ready');
      this.play();
    },
    play() {
      if (this.isYoutube) {
        this.$refs.youtube.player.playVideo();
      }
      if (this.isVimeo) {
        this.$refs.vimeo.play();
      }
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-video';
</style>
