<template>
  <div class="ca-widget-product-list">
    Template för produktlistewidget finns ej tillgänglig ännu
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Widget displaying a product list<br><br>
// **SASS-path:** _./styles/components/molecules/ca-widget-product-list.scss_
export default {
  name: 'CaWidgetProductList',
  components: {},
  mixins: [],
  props: {
    // Widget configuration object
    configuration: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
.ca-widget-product-list {
  text-align: center;
  color: $c-text-secondary;
}
@import 'molecules/ca-widget-product-list';
</style>
