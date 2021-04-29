<template>
  <div
    v-if="number > 0"
    class="ca-notification-badge"
    :class="{ 'ca-notification-badge--positioned': positioned }"
  >
    {{ number }}
  </div>
</template>
<script>
// @group Atoms
// Badge to show a number as a notification badge<br><br>
// **SASS-path:** _./styles/components/atoms/ca-notification-badge.scss_
export default {
  name: 'CaNotificationBadge',
  mixins: [],
  props: {
    // The number to be displayed
    number: {
      type: [Number, String],
      required: true
    },
    positioned: {
      type: Boolean,
      default: true
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
@import 'atoms/ca-notification-badge';
</style>
