<template>
  <div class="ca-widget-image-map">
    <CaImage
      :ref="`mainImage${widgetId}`"
      class="ca-widget-image-map__image"
      :banner-image="fullWidth"
      type="pagewidget"
      :alt="altText"
      :filename="filename"
      :sizes="imageSizes"
      :ratio="currentRatio"
      loading="eager"
      :usemap="'#' + widgetId"
      @loaded="getAreas"
    />

    <div
      v-if="displayedLinkAreas.length"
      class="ca-widget-image-map__link-areas-list"
    >
      <CaWidgetLinkArea
        v-for="linkArea in displayedLinkAreas"
        :key="'linkArea-' + linkArea.ProductId"
        class="ca-widget-image-map__link-area"
        :link-area="linkArea"
      />
    </div>

    <map
      v-if="displayedMapAreas.length"
      :ref="configuration.image.filename"
      :name="widgetId"
    >
      <area
        v-for="area in displayedMapAreas"
        :key="area.coords"
        shape="rect"
        :coords="area.coords"
        class="ca-widget-image-map__area"
        @click="onMapAreaClick(area.Url)"
      />
    </map>
  </div>
</template>
<script>
import MixWidgetImage from 'MixWidgetImage';
import widgetImageMapProducts from 'productlist/widget-image-map-products.graphql';
// @group Molecules
// @vuese
// Image Map Widget<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-image-map.scss_
export default {
  name: 'CaWidgetImageMap',
  mixins: [MixWidgetImage],
  props: {
    // configuration object fetched from MC
    configuration: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    originalMapAreas: [],
    displayedMapAreas: [],
    originalLinkAreas: [],
    displayedLinkAreas: [],
    widgetId: ''
  }),
  computed: {},
  watch: {},
  created() {
    // pseudo ID for multiple widgets on the page
    this.widgetId =
      this.$store.getters.viewport !== 'phone'
        ? this.configuration.image.filename
        : this.configuration.image.filenameForMobileDevice;
  },
  mounted() {
    window.addEventListener('resize', this.throttle(this.resizeAreas, 500));
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.throttle(this.resizeAreas, 500));
  },
  methods: {
    // @vuese
    // trigger component computations and fetching information about the product
    getAreas() {
      const mapAreas = new Promise(resolve => {
        this.getMapAreas();
        resolve();
      });
      const linkAreas = new Promise(resolve => {
        const mapAreas = this.getLinkAreas();
        resolve(mapAreas);
      });
      Promise.all([mapAreas, linkAreas])
        .then(async values => {
          if (values[1]?.length) {
            await this.getProductInfo(values[1]);
          }
        })
        .then(() => this.resizeAreas())
        .catch(e => {
          console.error('Something went wrong', e);
        });
    },
    // @vuese
    // used to parse data for map areas and mapping coordinates for map area tag
    getMapAreas() {
      try {
        const areasForParsing =
          this.$store.getters.viewport !== 'phone'
            ? this.configuration?.desktopImageMapAreas
            : this.configuration?.mobileImageMapAreas;

        if (!areasForParsing) {
          this.originalMapAreas = [];
          return;
        }
        const parsedMapAreas = JSON.parse(areasForParsing);

        if (!parsedMapAreas.length) {
          this.originalMapAreas = [];
          return;
        }

        this.originalMapAreas = parsedMapAreas
          // filter only 'url' type (quickshop not implemented yet)
          .filter(area => area.LinkType === 0)
          .map(area => {
            const { x1, x2, y1, y2, ...restAreaProps } = area;
            const coords = [x1, y1, x2, y2]
              .filter(coord => coord || coord === 0)
              .join(',');
            return {
              coords,
              ...restAreaProps
            };
          });
      } catch (error) {
        console.error(`Can't parse map area coords.`, error); // eslint-disable-line quotes, no-console
      }
    },
    // @vuese
    // mapping method for Link Areas
    getLinkAreas() {
      try {
        const areasForParsing =
          this.$store.getters.viewport !== 'phone'
            ? this.configuration?.desktopImageLinkAreas
            : this.configuration?.mobileImageLinkAreas;

        if (!areasForParsing) {
          this.originalLinkAreas = [];
          return;
        }
        const parsedLinkAreas = JSON.parse(areasForParsing);

        if (!parsedLinkAreas.length) {
          this.originalLinkAreas = [];
          return;
        }

        return parsedLinkAreas.map(area => {
          const { x1, x2, y1, y2, ...restAreaProps } = area;
          // for map area for rect its top left x1, y1 and bottom right corners x2, y2 coords
          const coords = [x1, y1, x2, y2].filter(Boolean).join(',');
          return { coords, ...restAreaProps };
        });
      } catch (error) {
        console.error(`Can't parse map area coords.`, error); // eslint-disable-line quotes, no-console
      }
    },
    // @vuese
    // fetch information about the product for link area map component
    // @arg Array
    async getProductInfo(linkAreas) {
      const productIds = [
        ...linkAreas
          .map(area => (area.ProductId ? Number(area.ProductId) : null))
          .filter(Boolean)
      ];
      const {
        data: {
          products: { products: productInfo }
        }
      } = await this.$apollo.query({
        query: widgetImageMapProducts,
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
        variables: {
          take: 10,
          filter: {
            productIds
          },
          channelId: this.$store.state.channel.id,
          languageId: this.$i18n.localeProperties.iso,
          marketId: this.$store.state.marketId
        }
      });
      this.mergeProductsInfo(linkAreas, productInfo);
    },
    // @vuese
    // add product information to link area objects
    // @arg Array
    // @arg Array
    mergeProductsInfo(linkAreas, areasProductInfo) {
      this.originalLinkAreas = linkAreas.map(linkArea => {
        const productLinkInfo = areasProductInfo.find(
          info => info.productId === Number(linkArea.ProductId)
        );
        return {
          ...linkArea,
          ...(productLinkInfo || {})
        };
      });
    },
    // @vuese
    // @arg Func function to throttle
    // @arg Number throttle duration in milliseconds
    throttle(fn, wait) {
      let throttled = false;
      return function(...args) {
        if (!throttled) {
          fn.apply(this, args);
          throttled = true;
          setTimeout(() => {
            throttled = false;
          }, wait);
        }
      };
    },
    // @vuese
    // main method to resize dimensions (images and maps)
    resizeAreas() {
      const dimensions = this.getDimensions();
      this.displayedMapAreas = this.resizeCoords(
        this.originalMapAreas,
        dimensions
      );
      const newLinkAreas = this.resizeCoords(
        this.originalLinkAreas,
        dimensions
      );
      this.displayedLinkAreas = newLinkAreas;
    },
    // @vuese
    // getter of dimensions for resizing calculations
    getDimensions() {
      const width =
        this.$store.getters.viewport !== 'phone'
          ? this.configuration.desktopWidth
          : this.configuration.mobileWidth;
      const height =
        this.$store.getters.viewport !== 'phone'
          ? this.configuration.desktopHeight
          : this.configuration.mobileHeight;
      const W = this.$refs[`mainImage${this.widgetId}`]?.$el?.clientWidth;
      const H = this.$refs[`mainImage${this.widgetId}`]?.$el?.clientHeight;
      const xRatio = W / width;
      const yRatio = H / height;
      return {
        W,
        H,
        xRatio,
        yRatio
      };
    },
    // @vuese
    // mapper of coordinations
    resizeCoords(arrayToConvert, dimensions) {
      return arrayToConvert.map(newMapArea => {
        const areaCoord = newMapArea.coords
          .split(',')
          .map((coord, index) =>
            index % 2 === 0
              ? Math.round(Number(coord) * dimensions.xRatio)
              : Math.round(Number(coord) * dimensions.yRatio)
          );
        // distinguish link from areas
        const resizedMapArea = {
          ...newMapArea,
          coords: newMapArea?.LinkColor ? areaCoord : areaCoord.join(),
          dimensions
        };
        return resizedMapArea;
      });
    },
    // @vuese
    // method to run map area on click event
    // @arg Object - clicked map area object
    onMapAreaClick(mapAreaUrl) {
      const isExternalLink = mapAreaUrl.toLowerCase().includes('http');
      if (isExternalLink) {
        window.location.href(mapAreaUrl);
        return;
      }
      this.$router.push(mapAreaUrl);
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-widget-image-map';
</style>
