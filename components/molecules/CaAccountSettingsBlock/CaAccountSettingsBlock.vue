<template>
  <div class="ca-account-settings-block">
    <div class="ca-account-settings-block__header">
      <h2 class="ca-account-settings-block__title">
        {{ title }}
      </h2>
      <button
        v-if="editable"
        type="button"
        class="ca-account-settings-block__toggle"
        @click="toggleEditMode"
      >
        {{ toggleText }}
      </button>
    </div>
    <div class="ca-account-settings-block__content">
      <slot name="content" :edit-mode="editMode" />
      <CaButton
        v-if="editMode"
        class="ca-account-settings-block__save"
        type="full-width"
        :loading="loading"
        @clicked="$emit('save')"
      >
        {{ $t('ACCOUNT_SETTINGS_SAVE') }}
      </CaButton>
    </div>
  </div>
</template>
<script>
// @group Molecules
// @vuese
// Holder for a block of settings in the account settings page<br><br>
// **SASS-path:** _./styles/components/molecules/ca-account-settings-block.scss_
export default {
  name: 'CaAccountSettingsBlock',
  mixins: [],
  props: {
    // Block title
    title: {
      type: String,
      required: true,
    },
    // Is hte blocks content editable?
    editable: {
      type: Boolean,
      default: true,
    },
    // Shows a loading indicator on the save-button if true
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    editMode: false,
  }),
  computed: {
    toggleText() {
      return this.editMode
        ? this.$t('ACCOUNT_SETTINGS_CANCEL')
        : this.$t('ACCOUNT_SETTINGS_EDIT');
    },
  },
  watch: {},
  mounted() {},
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-account-settings-block';
</style>
