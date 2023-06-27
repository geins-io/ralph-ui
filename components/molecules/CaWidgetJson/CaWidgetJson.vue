<template>
   <code
      v-if="configuration.JSON"
      v-html="configuration.JSON"
    >
    </code>
</template>
<script>
/* 
  Custom widget component that renders a widget based on the configuration JSON object
*/
export default {
  name: 'CaWidgetJson',
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