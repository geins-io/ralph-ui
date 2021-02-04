<template>
  <div class="ca-input-textarea__wrap">
    <div class="ca-input-textarea" :class="modifiers">
      <label v-if="label" class="ca-input-textarea__label" :for="id">
        {{ label }}
        <span v-if="!required" class="ca-input-textarea__optional">
          ({{ $t('INPUT_OPTIONAL') }})
        </span>
      </label>
      <textarea
        :id="id"
        :value="value"
        class="ca-input-textarea__textarea"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="id"
        v-bind="$attrs"
        v-on="inputListeners"
        @keyup="validateIfError"
        @blur="blurHandler"
        @focus="focused = true"
      ></textarea>
      <CaIcon
        v-if="!allValid"
        class="ca-input-textarea__error-icon"
        name="alert-octagon"
      />
    </div>
    <div v-if="description && allValid" class="ca-input-textarea__help-text">
      {{ description }}
    </div>
    <div
      v-else-if="errorText && !allValid"
      class="ca-input-textarea__help-text ca-input-textarea__help-text--error"
    >
      {{ errorText }}
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Text field, use v-model to bind value<br><br>
// **SASS-path:** _./styles/components/atoms/ca-input-textarea.scss_
export default {
  name: 'CaInputTextarea',
  mixins: [],
  props: {
    // The label of the field, showed as "placeholder" when field empty or not in focus
    label: {
      type: String,
      default: ''
    },
    // The field placeholder, can be used if not using label
    placeholder: {
      type: String,
      default: ''
    },
    // The value of the field, use v-model to bind data
    value: {
      type: [String, Number],
      required: true
    },
    // A description text for the field
    description: {
      type: String,
      default: ''
    },
    // Is the field requierd?
    required: {
      type: Boolean,
      default: true
    },
    // Is the field disabled?
    disabled: {
      type: Boolean,
      default: false
    },
    // Id of field, also used as name
    id: {
      type: String,
      default: ''
    },
    // Used to handle validation outside input scope
    valid: {
      type: Boolean,
      default: true
    },
    // What error text should be displayed if field not vaild
    errorText: {
      type: String,
      default: null
    }
  },
  data: () => ({
    fieldValid: true,
    focused: false
  }),
  computed: {
    // @vuese
    // All the modifier classes
    // @type Object
    modifiers() {
      return {
        'ca-input-textarea--error': !this.allValid,
        'ca-input-textarea--focused': this.focused,
        'ca-input-textarea--empty': !this.value
      };
    },
    // @vuese
    // Is field valid?
    // @type Boolean
    allValid() {
      return this.valid && this.fieldValid;
    },
    // @vuese
    // Used to be a transparent wrapper for the text input, all events will be passed through
    // @type Object
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
            // Input has been made
            // @arg Field value (String/Number)
            this.$emit('input', event.target.value);
          }
        }
      );
    }
  },
  watch: {},
  mounted() {},
  methods: {
    // @vuese
    // Validate input, sets `fieldValid` and returns bool
    validateInput() {
      if (this.required) {
        this.fieldValid = this.value !== '';
      }
      // Validation has been made
      // @arg Is valid (Boolean)
      this.$emit('validation', this.fieldValid);
      return this.fieldValid;
    },
    // @vuese
    // Validates field instantly if not valid, used on keyup
    validateIfError() {
      if (!this.allValid) {
        this.validateInput();
      }
    },
    // @vuese
    // Controls what happens on field blur
    blurHandler() {
      this.focused = false;
      this.validateInput();
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-input-textarea';
</style>
