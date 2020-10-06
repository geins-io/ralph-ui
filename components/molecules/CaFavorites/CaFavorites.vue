<template>
  <NuxtLink to="/" class="ca-favorites">
    <CaIcon name="heart" class="ca-favorites__icon" />
    <span class="ca-favorites__text only-desktop">
      {{ $t('FAVORITES_LABEL') }} ({{ favoritesQty }})
    </span>
    <CaNotificationBadge
      class="ca-favorites__qty only-mobile"
      :number="favoritesQty"
    />
  </NuxtLink>
</template>
<script>
import { mapState } from 'vuex';
import CaIcon from 'CaIcon';
import CaNotificationBadge from 'CaNotificationBadge';

// @group Molecules
// @vuese
// Displaying number of favorites with a link to favorites-page<br><br>
// **SASS-path:** _./styles/components/molecules/ca-favorites.scss_
export default {
  name: 'CaFavorites',
  components: { CaIcon, CaNotificationBadge },
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {
    favoritesQty() {
      return this.favorites.length || 0;
    },
    ...mapState(['favorites'])
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'molecules/ca-favorites';
</style>
