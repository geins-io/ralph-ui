<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="ca-widget-banner" :class="modifiers">
    <component
      :is="linkBaseElem"
      v-bind="linkElemAttributes"
      class="ca-widget-banner__inner"
      @click.native="clickHandler"
    >
      <div v-if="hasVideo" class="ca-widget-banner__video-wrap">
        <CaImage
          v-if="!videoLoaded && placeholderImage"
          class="ca-widget-banner__image ca-widget-banner__image--placeholder"
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
          class="ca-widget-banner__video"
          :class="{ 'ca-widget-banner__video--playing': videoLoaded }"
          v-html="videoHtml"
        />
      </div>
      <div v-else class="ca-widget-banner__image-wrap">
        <CaImage
          class="ca-widget-banner__image"
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
          configuration.text1 || configuration.text2 || configuration.buttonText
        "
        class="ca-widget-banner__content"
      >
        <p
          v-if="configuration.text1"
          class="ca-widget-banner__text1"
          :style="'color:' + textColorHex"
        >
          {{ configuration.text1 }}
        </p>
        <p
          v-if="configuration.text2"
          class="ca-widget-banner__text2"
          :style="'color:' + textColorHex"
        >
          {{ configuration.text2 }}
        </p>
        <LazyCaWidgetBannerButton
          v-if="configuration.buttonText"
          class="ca-widget-banner__button"
          :text-color="configuration.textColor"
          :below-image="!fullWidth && textAndButtonPlacement === 0"
        >
          {{ configuration.buttonText }}
        </LazyCaWidgetBannerButton>
      </div>
    </component>
  </div>
</template>
<script>
import MixWidgetImage from 'MixWidgetImage';

// @group Molecules
// @vuese
// The banner widget, displaying an image with text and button<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-banner.scss_
export default {
  name: 'CaWidgetBanner',
  mixins: [MixWidgetImage],
  props: {},
  data: () => ({
    startLoadingIframe: false,
    videoLoaded: false,
    videoOptions: {
      responsive: true,
      background: true,
      loop: true,
      quality: '1080p',
    },
    playerOrigin: '*',
    playerId: '',
  }),
  computed: {
    modifiers() {
      const modifiers = [];
      const baseClass = 'ca-widget-banner--';

      modifiers.push(baseClass + this.configuration.classNames);

      let placement = '';
      switch (this.textAndButtonPlacement) {
        case 0:
          placement = this.fullWidth
            ? baseClass + 'left'
            : baseClass + 'below-image';
          break;
        case 1:
          placement = this.fullWidth
            ? baseClass + 'middle'
            : baseClass + 'on-image';
          break;
        case 2:
          placement = baseClass + 'right';
      }
      modifiers.push(placement);

      modifiers.push(baseClass + this.textColor);

      if (this.href) {
        modifiers.push(baseClass + 'link');
      }

      return modifiers;
    },
    textAndButtonPlacement() {
      return this.fullWidth
        ? this.configuration.textAndButtonPlacementFullWidth
        : this.configuration.textAndButtonPlacement;
    },
    textColorHex() {
      return this.configuration.textColor === 0
        ? this.$config.bannerWidgetPrimaryColor
        : this.$config.bannerWidgetSecondaryColor;
    },
    textColor() {
      return this.configuration.textColor === 0
        ? 'color-primary'
        : 'color-secondary';
    },
    hasVideo() {
      return this.$store.getters.viewport === 'phone'
        ? !!this.configuration.mobileVideoHtml
        : !!this.configuration.desktopVideoHtml;
    },
    videoHtml() {
      let videoHtml =
        this.$store.getters.viewport === 'phone'
          ? this.configuration.mobileVideoHtml
          : this.configuration.desktopVideoHtml;
      videoHtml = videoHtml.replace('?', '?player_id=' + this.playerId + '&');
      return videoHtml;
    },
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
    placeholderImage() {
      return this.$store.getters.viewport === 'phone'
        ? this.configuration.image.filenameForMobileDevice
        : this.configuration.image.filename;
    },
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
        method: action,
      };

      if (value) {
        data.value = value;
      }
      this.$refs.player.firstChild.firstChild.contentWindow.postMessage(
        data,
        this.playerOrigin,
      );
    },
    // @vuese
    // Pushing the widget:click event
    clickHandler() {
      this.$store.dispatch('events/push', {
        type: 'widget:click',
        data: {
          href: this.processedHref,
        },
      });
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-banner';
</style>
