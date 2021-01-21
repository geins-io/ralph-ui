import MixLinkHandler from 'MixLinkHandler';
// @group Mixins
// @vuese
// Shared functionality between widgets that has images
export default {
  name: 'MixWidgetImage',
  components: {},
  mixins: [MixLinkHandler],
  props: {},
  data: () => ({}),
  computed: {
    // @vuese
    // The href of the image
    // @type String
    href() {
      return this.configuration.image.href;
    },
    // @vuese
    // The alt text
    // @type String
    altText() {
      return this.configuration.image.altText || 'Widget image';
    },
    // @vuese
    // The current filename, can be different images on phone or computer
    // @type String
    filename() {
      return this.$store.getters.viewport === 'phone'
        ? this.filenamePhone
        : this.filenameTabletUp;
    },
    // @vuese
    // File name for phones
    // @type String
    filenamePhone() {
      return this.configuration.image.filenameForMobileDevice
        ? this.configuration.image.filenameForMobileDevice
        : this.configuration.image.filename;
    },
    // @vuese
    // File names if not phone
    // @type String
    filenameTabletUp() {
      return this.configuration.image.filename
        ? this.configuration.image.filename
        : this.configuration.image.filenameForMobileDevice;
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
