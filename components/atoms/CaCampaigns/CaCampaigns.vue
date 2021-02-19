<template>
  <ul v-if="display === 'list'" class="ca-campaigns">
    <li
      v-for="(campaign, index) in campaigns"
      :key="index"
      class="ca-campaigns__item"
    >
      {{ campaign.name }}
    </li>
  </ul>
  <div v-else class="ca-campaigns ca-campaigns--box">
    <h3 class="ca-campaigns__title">Aktiverade kampanjer</h3>
    <ul class="ca-campaigns__list">
      <li
        v-for="(campaign, index) in campaigns"
        :key="index"
        class="ca-campaigns__item"
      >
        <CaIconAndText icon-name="check">
          {{ campaign.name }}
        </CaIconAndText>
      </li>
    </ul>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Display of applied campaigns<br><br>
// **SASS-path:** _./styles/components/atoms/ca-campaigns.scss_
export default {
  name: 'CaCampaigns',
  mixins: [],
  props: {
    // List of appliedCampigns from the API
    campaigns: {
      type: Array,
      required: true
    },
    // Display as list or in a box
    display: {
      // `list`, `box`
      type: String,
      // `list`
      default: 'list'
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
