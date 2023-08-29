<template>
  <NuxtLink
    :to="$getPath('favorites')"
    class="ca-favorites"
    :class="{ 'ca-favorites--no-text': !showText }"
    :title="$t('FAVORITES_LABEL')"
  >
    <CaIcon name="heart" class="ca-favorites__icon" />
    <span v-if="showText" class="ca-favorites__text only-computer">
      {{ $t('FAVORITES_LABEL') }} ({{ favoritesQty }})
    </span>
    <client-only>
      <CaNotificationBadge
        class="ca-favorites__qty"
        :class="{ 'only-mobile': showText }"
        :number="favoritesQty"
      />
    </client-only>
  </NuxtLink>
</template>
<script>
import { mapState } from 'vuex';

// @group Molecules
// @vuese
// Displaying number of favorites with a link to favorites-page<br><br>
// **SASS-path:** _./styles/components/molecules/ca-favorites.scss_
export default {
  name: 'CaFavorites',
  mixins: [],
  props: {
    // Show 'my favorites' text next to heart
    showText: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'only-mobile': this.showText,
      };
    },
    favoritesQty() {
      return this.favorites.length || 0;
    },
    ...mapState(['favorites']),
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'molecules/ca-favorites';
</style>
