<template>
  <ul class="ca-secondary-nav">
    <CaSecondaryNavItem>
      <button
        v-if="!$store.getters['auth/authenticated']"
        type="button"
        @click="
          $store.commit('contentpanel/open', {
            name: 'account',
            frame: 'login',
          })
        "
      >
        {{ $t('LOG_IN') }}/{{ $t('CREATE_ACCOUNT') }}
      </button>
      <NuxtLink v-else :to="$getPath('account-orders')">
        {{ $t('ACCOUNT_TITLE') }}
      </NuxtLink>
    </CaSecondaryNavItem>
    <CaSecondaryNavItem>
      <NuxtLink :to="$getPath('favorites')">
        {{ $t('FAVORITES_LABEL') }} ({{ $store.state.favorites.length }})
      </NuxtLink>
    </CaSecondaryNavItem>
    <CaSecondaryNavItem v-if="$store.state.channel.markets.length > 1">
      <CaMarketSelectorButton />
    </CaSecondaryNavItem>
  </ul>
</template>
<script>
// @group Molecules
// @vuese
// The secondary navigation, used for example in the bottom of the content panel navigation<br><br>
// **SASS-path:** _./styles/components/molecules/ca-secondary-nav.scss_
export default {
  name: 'CaSecondaryNav',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-secondary-nav';
</style>
