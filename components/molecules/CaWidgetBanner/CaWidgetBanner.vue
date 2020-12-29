<template>
  <div class="ca-widget-banner" :class="modifiers">
    <component
      :is="linkBaseElem"
      v-bind="linkElemAttributes"
      class="ca-widget-banner__inner"
    >
      <div class="ca-widget-banner__image-wrap">
        <CaImage
          class="ca-widget-banner__image"
          size="1360w"
          type="pagewidget"
          :alt="altText"
          :filename="imageObj.Filename"
          :ratio="630 / 902"
        />
      </div>
      <div
        v-if="
          configuration.Text1 || configuration.Text2 || configuration.ButtonText
        "
        class="ca-widget-banner__content"
      >
        <p
          v-if="configuration.Text1"
          class="ca-widget-banner__text1"
          :style="'color:' + textColorHex"
        >
          {{ configuration.Text1 }}
        </p>
        <p
          v-if="configuration.Text2"
          class="ca-widget-banner__text2"
          :style="'color:' + textColorHex"
        >
          {{ configuration.Text2 }}
        </p>
        <CaButton
          v-if="configuration.ButtonText"
          class="ca-widget-banner__button"
          :size="$store.getters.viewportLaptop ? 'm' : 's'"
        >
          {{ configuration.ButtonText }}
        </CaButton>
      </div>
    </component>
  </div>
</template>
<script>
import CaImage from 'CaImage';
import CaButton from 'CaButton';
import MixLinkHandler from 'MixLinkHandler';
// @group Molecules
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-banner.scss_
export default {
  name: 'CaWidgetBanner',
  components: { CaImage, CaButton },
  mixins: [MixLinkHandler],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      const modifiers = [];
      const baseClass = 'ca-widget-banner--';

      modifiers.push(baseClass + this.configuration.ClassNames);

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
        ? this.configuration.TextAndButtonPlacementFullWidth
        : this.configuration.TextAndButtonPlacement;
    },
    textColorHex() {
      return this.configuration.TextColor === 0
        ? this.$config.bannerWidgetPrimaryColor
        : this.$config.bannerWidgetSecondaryColor;
    },
    textColor() {
      return this.configuration.TextColor === 0
        ? 'color-primary'
        : 'color-secondary';
    },
    fullWidth() {
      return this.configuration.ClassNames === 'full';
    },
    imageObj() {
      return JSON.parse(this.configuration.Image);
    },
    href() {
      return this.imageObj.Href;
    },
    altText() {
      return this.imageObj.AltText || 'Widget image';
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-banner';
</style>
