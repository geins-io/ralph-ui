<template>
  <div class="ca-address">
    <p class="ca-address__row">
      {{ address.firstName }} {{ address.lastName }}
    </p>
    <p class="ca-address__row">{{ address.addressLine1 }}</p>
    <p v-if="address.addressLine2" class="ca-address__row">
      {{ address.addressLine2 }}
    </p>
    <p v-if="address.addressLine3" class="ca-address__row">
      {{ address.addressLine3 }}
    </p>
    <p class="ca-address__row">{{ address.zip }} {{ address.city }}</p>
    <p class="ca-address__row">{{ address.country }}</p>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-address.scss_
export default {
  name: 'CaAddress',
  mixins: [],
  props: {
    address: {
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
@import 'atoms/ca-address';
</style>
