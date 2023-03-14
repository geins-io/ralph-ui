<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="ca-widget-text-on-image">
    <component
      :is="linkBaseElem"
      v-bind="linkElemAttributes"
      class="ca-widget-text-on-image__inner"
    >
      <div v-if="hasVideo" class="ca-widget-text-on-image__video-wrap">
        <CaImage
          v-if="!videoLoaded && placeholderImage"
          class="ca-widget-text-on-image__image ca-widget-text-on-image__image--placeholder"
          type="pagewidget"
          :banner-image="fullWidth"
          :alt="altText"
          :filename="filename"
          :sizes="imageSizes"
          :ratio="videoRatio"
          :force-ratio="true"
          loading="eager"
        />
        <CaSkeleton
          v-else-if="!videoLoaded"
          class="ca-image__skeleton"
          :ratio="videoRatio"
          :radius="false"
        />
        <div
          v-if="startLoadingIframe"
          ref="player"
          class="ca-widget-text-on-image__video"
          :class="{ 'ca-widget-text-on-image__video--playing': videoLoaded }"
          v-html="videoHtml"
        ></div>
      </div>
      <div v-else class="ca-widget-text-on-image__image-wrap">
        <CaImage
          class="ca-widget-text-on-image__image"
          :banner-image="fullWidth"
          type="pagewidget"
          :alt="altText"
          :filename="filename"
          :sizes="imageSizes"
          :ratio="currentRatio"
          loading="eager"
        />
      </div>

      <div
        v-if="
          configuration.heading ||
            configuration.subHeading ||
            configuration.buttonText
        "
        class="ca-widget-text-on-image__content"
      >
        <p
          v-if="configuration.subHeading"
          class="ca-widget-text-on-image__subheading"
          :style="headingStyles"
        >
          {{ configuration.subHeading }}
        </p>
        <p
          v-if="configuration.heading"
          :class="['ca-widget-text-on-image__heading']"
          :style="headingStyles"
        >
          {{ configuration.heading }}
        </p>
      </div>
      <CaWidgetBannerButton
        v-if="configuration.buttonText"
        class="ca-widget-text-on-image__button"
        :custom-styles="{
          backgroundColor: configuration.buttonBackgroundColor
        }"
      >
        <span :style="{ color: configuration.buttonFontColor }">{{
          configuration.buttonText
        }}</span>
      </CaWidgetBannerButton>
      <CaWidgetBannerButton
        v-if="canShowSecondButton"
        class="ca-widget-text-on-image__button-secondary"
        :custom-styles="{
          backgroundColor: configuration.button2BackgroundColor
        }"
      >
        <span :style="{ color: configuration.button2FontColor }">{{
          configuration.button2Text
        }}</span>
      </CaWidgetBannerButton>
    </component>
  </div>
</template>
<script>
import MixWidgetImage from 'MixWidgetImage';

// @group Molecules
// @vuese
// Text on the image component<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-text-on-image.scss_
export default {
  name: 'CaWidgetTextOnImage',
  mixins: [MixWidgetImage],
  props: {},
  data: () => ({
    startLoadingIframe: false,
    videoLoaded: false,
    videoOptions: {
      responsive: true,
      background: true,
      loop: true,
      quality: '1080p'
    },
    playerOrigin: '*',
    playerId: ''
  }),
  computed: {
    // @vuese
    // Get whole component url
    // @type String
    href() {
      return this.configuration.buttonUrl;
    },
    // @vuese
    // Custom styles for heading
    // @type Object
    headingStyles() {
      const {
        headingFontColor,
        headingFontStyleItalic,
        headingLineHeight,
        headingTextShadow
      } = this.configuration;
      const lineHeightValues = [0.9, 1.2, 1.5];

      return [
        { color: headingFontColor },
        { fontStyle: headingFontStyleItalic ? 'italic' : '' },
        { backgroundColor: headingTextShadow ? 'rgba(0, 0, 0, 0.2)' : '' },
        { lineHeight: `${lineHeightValues[headingLineHeight]}em` }
      ];
    },
    // @vuese
    // Check if includes video
    // @type Boolean
    hasVideo() {
      return this.$store.getters.viewport === 'phone'
        ? !!this.configuration.mobileVideoHtml
        : !!this.configuration.desktopVideoHtml;
    },
    // @vuese
    // Custom styles for heading
    // @type Object
    videoHtml() {
      let videoHtml =
        this.$store.getters.viewport === 'phone'
          ? this.configuration.mobileVideoHtml
          : this.configuration.desktopVideoHtml;
      videoHtml = videoHtml.replace('?', '?player_id=' + this.playerId + '&');
      return videoHtml;
    },
    // @vuese
    // Get video ratio
    // @type Number
    videoRatio() {
      const height =
        this.$store.getters.viewport === 'phone'
          ? this.configuration.mobileVideoHeight
          : this.configuration.desktopVideoHeight;
      const width =
        this.$store.getters.viewport === 'phone'
          ? this.configuration.mobileVideoWidth
          : this.configuration.desktopVideoWidth;
      return (height || 0) / (width || 1);
    },
    // @vuese
    // Get filename for placeholder image
    // @type String
    placeholderImage() {
      return this.$store.getters.viewport === 'phone'
        ? this.configuration.image.filenameForMobileDevice
        : this.configuration.image.filename;
    },
    // @vuese
    // Indicates if can show second button
    // @type Boolean
    canShowSecondButton() {
      return this.configuration.button2Text && this.fullWidth;
    }
  },
  watch: {},
  mounted() {
    setTimeout(() => {
      this.startLoadingIframe = true;
    }, 300);
    if (this.hasVideo) {
      window.addEventListener('message', this.onMessageReceived);
      this.playerId = 'player_' + this._uid;
    }
  },
  beforeDestroy() {
    if (this.hasVideo) {
      window.removeEventListener('message', this.onMessageReceived);
    }
  },
  methods: {
    // @vuese
    // Action for when video is playing
    onPlaying() {
      this.postMessage('removeEventListener', 'timeupdate');
      window.removeEventListener('message', this.onMessageReceived);
      this.videoLoaded = true;
    },
    // @vuese
    // Action for when the vimeo player is mounted inside the iframe
    onReady() {
      this.postMessage('addEventListener', 'timeupdate');
    },
    // @vuese
    // Handle messages sent from the Vimeo iframe
    // @arg event
    onMessageReceived(event) {
      if (!/^https?:\/\/player.vimeo.com/.test(event.origin)) {
        return false;
      }
      let data = event.data || null;
      if (typeof data !== 'object') {
        data = JSON.parse(data);
      }
      if (data.player_id !== this.playerId) {
        return false;
      }
      if (this.playerOrigin === '*') {
        this.playerOrigin = event.origin;
      }
      switch (data.event) {
        case 'ready':
          this.onReady();
          break;
        case 'playing':
        case 'timeupdate':
          this.onPlaying();
          break;
        default:
          break;
      }
    },
    // @vuese
    // Post messages to the Vimeo iframe, mainly to register event listeners inside
    // @arg action (String), value (String)
    postMessage(action, value) {
      const data = {
        method: action
      };

      if (value) {
        data.value = value;
      }
      this.$refs.player.firstChild.firstChild.contentWindow.postMessage(
        data,
        this.playerOrigin
      );
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-text-on-image';
</style>
