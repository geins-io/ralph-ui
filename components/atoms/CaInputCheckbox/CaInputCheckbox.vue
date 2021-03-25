<template>
  <div class="ca-input-checkbox__wrap">
    <label class="ca-input-checkbox" :class="modifiers">
      <input
        :id="id"
        class="ca-input-checkbox__input"
        type="checkbox"
        :name="id"
        :checked="checked"
        :value="checked"
        @change="$emit('change', $event.target.checked)"
      />
      <span class="ca-input-checkbox__box">
        <CaIcon name="check" class="ca-input-checkbox__check" />
      </span>
      <span class="ca-input-checkbox__label">{{ label }}</span>
    </label>
    <div v-if="description" class="ca-input-text__help-text">
      {{ description }}
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Checkbox input, use v-model to bind value<br><br>
// **SASS-path:** _./styles/components/atoms/ca-input-checkbox.scss_
export default {
  name: 'CaInputCheckbox',
  mixins: [],
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // The checkbox label
    label: {
      type: String,
      default: ''
    },
    // Is checkbox checked? Use v-model to bind
    checked: {
      type: Boolean,
      default: false
    },
    // A description of the checkbox
    description: {
      type: String,
      default: ''
    },
    // The id for the checkbox
    id: {
      type: String,
      default: ''
    }
  },
  data: () => ({}),
  computed: {
    modifiers() {
      return {
        'ca-input-checkbox--checked': this.checked
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-input-checkbox';
</style>
