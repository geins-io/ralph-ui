<template>
  <CaIconButton
    class="ca-toggle-favorite"
    :class="{
      'ca-toggle-favorite--active': isFavorite
    }"
    :aria-label="ariaLabel"
    :icon-name="iconName"
    @clicked="toggleFavorite"
  />
</template>
<script>
// @group Atoms
// @vuese
// A component for the toggle favorite icon<br><br>
// **SASS-path:** _./styles/components/atoms/ca-toggle-favorite.scss_
export default {
  name: 'CaToggleFavorite',
  mixins: [],
  props: {
    // The product alias
    prodAlias: {
      type: String,
      required: true
    },
    // The product id
    prodId: {
      type: Number,
      required: true
    },
    // The icon name
    iconName: {
      type: String,
      default: 'heart'
    }
  },
  data: () => ({}),
  computed: {
    // @vuese
    // Is the current product already a favorite?
    // @type Boolean
    isFavorite() {
      return (
        this.$store.getters.isFavorite(this.prodId) ||
        this.$store.getters.isFavorite(this.prodAlias)
      );
    },
    // @vuese
    // The aria label for the button
    // @type String
    ariaLabel() {
      return this.isFavorite
        ? this.$t('REMOVE_FAVORITE')
        : this.$t('ADD_FAVORITE');
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Toggle the favorite state of the current product
    toggleFavorite() {
      const favorites = this.$store.state.favorites;
      const isAliases = favorites.length && typeof favorites[0] === 'string';
      const newFavorite = isAliases ? this.prodAlias : this.prodId;
      this.$store.dispatch('toggleFavorite', newFavorite);
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-toggle-favorite';
</style>
