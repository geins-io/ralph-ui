<template>
  <ul class="ca-campaigns">
    <li
      v-for="(campaign, index) in campaigns"
      :key="index"
      class="ca-campaigns__item"
    >
      {{ campaign.name }}
    </li>
  </ul>
</template>
<script>
// @group Atoms
// @vuese
// Display list of applied campaigns<br><br>
// **SASS-path:** _./styles/components/atoms/ca-campaigns.scss_
export default {
  name: 'CaCampaigns',
  mixins: [],
  props: {
    campaigns: {
      type: Array,
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
@import 'atoms/ca-campaigns';
</style>
