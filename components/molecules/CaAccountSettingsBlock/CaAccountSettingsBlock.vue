<template>
  <div class="ca-account-settings-block">
    <div class="ca-account-settings-block__header">
      <h2 class="ca-account-settings-block__title">{{ title }}</h2>
      <button
        v-if="editable"
        class="ca-account-settings-block__toggle"
        @click="toggleEditMode"
      >
        {{ toggleText }}
      </button>
    </div>
    <div class="ca-account-settings-block__content">
      <slot name="content" :edit-mode="editMode"></slot>
      <CaButton
        v-if="editMode"
        class="ca-account-settings-block__save"
        type="full-width"
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
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/molecules/ca-account-settings-block.scss_
export default {
  name: 'CaAccountSettingsBlock',
  mixins: [],
  props: {
    title: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    editMode: false
  }),
  computed: {
    toggleText() {
      return this.editMode
        ? this.$t('ACCOUNT_SETTINGS_CANCEL')
        : this.$t('ACCOUNT_SETTINGS_EDIT');
    }
  },
  watch: {},
  mounted() {},
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    }
  }
};
</script>
<style lang="scss">
@import 'molecules/ca-account-settings-block';
</style>
