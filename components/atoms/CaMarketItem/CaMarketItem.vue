<template>
  <div class="ca-market-item">
    <div class="ca-market-item__info">
      <div class="ca-market-item__title-wrap">
        <CaFlag
          class="ca-market-item__flag"
          :country="market.country.code"
          shape="circle"
        />
        <h3 class="ca-market-item__title">
          {{ market.country.name }}
        </h3>
      </div>
      <p class="ca-market-item__currency">
        {{ market.currency.name }}
      </p>
      <div class="ca-market-item__languages">
        <a
          v-for="language in market.allowedLanguages"
          :key="language.id"
          :href="$getPath('index', market.alias, language.code)"
          class="ca-market-item__language"
        >
          {{ language.name }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Display item for one market and it's languages<br><br>
// **SASS-path:** _./styles/components/atoms/ca-market-item.scss_
export default {
  name: 'CaMarketItem',
  mixins: [],
  props: {
    // Market object from api
    market: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-market-item';
</style>
