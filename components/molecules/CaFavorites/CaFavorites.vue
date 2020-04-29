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
import { CaIcon, CaNotificationBadge } from '@ralph/ralph-ui';
// @group Molecules
// @vuese
// Displaying number of favorites with a link to favorites-page
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
.ca-favorites {
  position: relative;
  margin-right: $px20;
  @include bp(laptop) {
    @include flex-valign;
  }
  &__icon {
    font-size: 24px;
    @include bp(laptop) {
      font-size: 1em;
      margin-right: $px4;
    }
  }
}
</style>
