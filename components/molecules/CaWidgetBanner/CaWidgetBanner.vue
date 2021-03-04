<template>
  <div class="ca-widget-banner" :class="modifiers">
    <component
      :is="linkBaseElem"
      v-bind="linkElemAttributes"
      class="ca-widget-banner__inner"
    >
      <div v-if="hasVideo" class="ca-widget-banner__video-wrap">
        <CaImage
          v-if="!videoLoaded && placeholderImage"
          class="ca-widget-banner__image ca-widget-banner__image--placeholder"
          type="pagewidget"
          :alt="altText"
          :filename="filename"
          :sizes="imageSizes"
          :ratio="videoRatio"
          :force-ratio="true"
        />
        <CaSkeleton
          v-else-if="!videoLoaded"
          class="ca-image__skeleton"
          :ratio="videoRatio"
          :radius="false"
        />
        <client-only>
          <Vimeo
            v-show="videoLoaded"
            ref="player"
            :video-id="videoId"
            :options="videoOptions"
            :events-to-emit="['playing']"
            @playing.once="onPlaying"
          />
        </client-only>
      </div>
      <div v-else class="ca-widget-banner__image-wrap">
        <CaImage
          class="ca-widget-banner__image"
          type="pagewidget"
          :alt="altText"
          :filename="filename"
          :sizes="imageSizes"
          :ratio="currentRatio"
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
        <CaWidgetBannerButton
          v-if="configuration.buttonText"
          class="ca-widget-banner__button"
          :text-color="configuration.textColor"
        >
          {{ configuration.buttonText }}
        </CaWidgetBannerButton>
      </div>
    </component>
  </div>
</template>
<script>
import MixWidgetImage from 'MixWidgetImage';
import { vueVimeoPlayer } from 'vue-vimeo-player';
// @group Molecules
// @vuese
// The banner widget, displaying an image with text and button<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-banner.scss_
export default {
  name: 'CaWidgetBanner',
  components: { Vimeo: vueVimeoPlayer },
  mixins: [MixWidgetImage],
  props: {},
  data: () => ({
    videoLoaded: false,
    videoOptions: {
      responsive: true,
      background: true,
      loop: true
    }
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
    fullWidth() {
      return this.configuration.classNames === 'full';
    },
    hasVideo() {
      return this.$store.getters.viewport === 'phone'
        ? !!this.configuration.mobileVideoId
        : !!this.configuration.desktopVideoId;
    },
    videoId() {
      return this.$store.getters.viewport === 'phone'
        ? this.configuration.mobileVideoId.toString()
        : this.configuration.desktopVideoId.toString();
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
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Action for when video is playing
    onPlaying() {
      this.videoLoaded = true;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-banner';
</style>
