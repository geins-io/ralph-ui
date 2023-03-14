<template>
  <NuxtLink :to="linkArea.canonicalUrl || ''" class="ca-widget-link-area">
    <CaIcon
      v-if="linkArea.LinkType === 3"
      class="ca-widget-link-area__icon"
      name="x-circle"
      :style="{
        color: linkArea.LinkColor,
        top: linkArea.coords[1] + 'px',
        left: linkArea.coords[0] + 'px',
        fontSize: defaultIconSize * linkArea.dimensions.xRatio + 'px'
      }"
    />
    <div
      v-if="linkArea.LinkType === 2"
      class="ca-widget-link-area__product-info"
      :style="{
        textShadow: linkArea.DropShadow
          ? ` 0 0 ${linkArea.DropShadowBlur} rgba(0, 0, 0, ${linkArea.DropShadowOpacity})`
          : '',
        color: linkArea.LinkColor,
        fontSize: linkArea.TextSize * linkArea.dimensions.xRatio + 'px',
        left: linkArea.coords[0] + 'px',
        top: linkArea.coords[1] + 'px'
      }"
    >
      <p
        v-if="linkArea.brand && linkArea.brand.name && linkArea.ShowBrand"
        :style="{ fontSize: linkArea.TextSize, color: linkArea.LinkColor }"
      >
        {{ linkArea.brand.name }}
      </p>
      <p
        v-if="linkArea.name && linkArea.ShowTitle"
        :style="{ fontSize: linkArea.TextSize, color: linkArea.LinkColor }"
      >
        {{ linkArea.name }}
      </p>
      <p
        v-if="
          linkArea.unitPrice &&
            linkArea.unitPrice.sellingPriceIncVatFormatted &&
            linkArea.ShowPrice
        "
        :style="{ fontSize: linkArea.TextSize, color: linkArea.LinkColor }"
      >
        {{ linkArea.unitPrice.sellingPriceIncVatFormatted }}
      </p>
    </div>
  </NuxtLink>
</template>
<script>
// @group Atoms
// @vuese
// Link Area part from image map widget<br><br>
// **SASS-path:** _./styles/components/atoms/ca-widget-link-area.scss_
export default {
  name: 'CaWidgetLinkArea',
  mixins: [],
  props: {
    // link area object - link area information from configuration object and fetched information about product based on link area productId
    linkArea: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    defaultIconSize: 30
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-widget-link-area';
</style>
