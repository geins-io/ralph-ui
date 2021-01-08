<template>
  <div class="ca-input-text__wrap">
    <div class="ca-input-text" :class="modifiers">
      <label class="ca-input-text__label" :for="id">
        {{ label }}
        <span v-if="!required" class="ca-input-text__optional">
          (optional)
        </span>
      </label>
      <input
        :id="id"
        class="ca-input-text__input"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :value="value"
        :disabled="disabled"
        :name="id"
        v-bind="$attrs"
        v-on="inputListeners"
        @blur="blurHandler"
        @focus="focused = true"
      />
      <CaSpinner class="ca-input-text__spinner" :loading="loading" />
    </div>
    <div v-if="description && allValid" class="ca-input-text__help-text">
      {{ description }}
    </div>
    <div
      v-if="errorText && !allValid"
      class="ca-input-text__help-text ca-input-text__help-text--error"
    >
      {{ errorText }}
    </div>
  </div>
</template>
<script>
import CaSpinner from 'CaSpinner';
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-input-text.scss_
export default {
  name: 'CaInputText',
  components: { CaSpinner },
  mixins: [],
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: 'null'
    },
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: ''
    },
    valid: {
      type: Boolean,
      default: true
    },
    errorText: {
      type: String,
      default: null
    },
    validate: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'email'].includes(value);
      }
    }
  },
  data: () => ({
    fieldValid: true,
    focused: false
  }),
  computed: {
    modifiers() {
      return {
        'ca-input-text--password': this.inputType === 'password',
        'ca-input-text--error': !this.allValid,
        'ca-input-text--focused': this.focused,
        'ca-input-text--empty': !this.value
      };
    },
    allValid() {
      return this.valid && this.fieldValid;
    },
    inputListeners() {
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: event => {
            this.$emit('input', event.target.value);
          }
        }
      );
    }
  },
  watch: {},
  mounted() {},
  methods: {
    validateInput() {
      if (this.validate === 'email') {
        // TODO: Validate email
      }
    },
    blurHandler() {
      this.focused = false;
      this.validateInput();
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-input-text';
</style>
