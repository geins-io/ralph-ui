<template>
  <div v-if="number > 0" class="ca-notification-badge">{{ number }}</div>
</template>
<script>
// @group Atoms
// Badge to show a number as a notification badge
export default {
  name: 'CaNotificationBadge',
  components: {},
  mixins: [],
  props: {
    // The number to be displayed
    number: {
      type: [Number, String],
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
$c-notification-badge-bg: $c-dark-gray !default;
$c-notification-badge-txt: $c-text-inverse !default;
.ca-notification-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  background: $c-notification-badge-bg;
  color: $c-notification-badge-txt;
  border-radius: 50%;
  width: 1.8em;
  height: 1.8em;
  font-weight: $font-weight-bold;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(40%, -20%);
}
</style>
