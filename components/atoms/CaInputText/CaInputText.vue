<template>
  <div class="ca-input-text__wrap">
    <div class="ca-input-text" :class="modifiers">
      <label v-if="label" class="ca-input-text__label" :for="id">
        {{ label }}
        <span v-if="!required" class="ca-input-text__optional">
          ({{ $t('INPUT_OPTIONAL') }})
        </span>
      </label>
      <input
        :id="id"
        class="ca-input-text__input"
        :type="inputType"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :value="value"
        :disabled="disabled"
        :name="id"
        v-bind="$attrs"
        v-on="inputListeners"
        @keyup="validateIfError"
        @blur="blurHandler"
        @focus="focused = true"
      />
      <CaSpinner class="ca-input-text__spinner" :loading="loading" />
      <CaIcon
        v-if="!allValid"
        class="ca-input-text__error-icon"
        name="alert-octagon"
      />
      <button
        v-if="type === 'password' && value"
        type="button"
        class="ca-input-text__toggle-password"
        tabindex="-1"
        @click="togglePasswordVisible"
      >
        {{ passwordToggleText }}
      </button>
    </div>

    <div v-if="description && allValid" class="ca-input-text__help-text">
      {{ description }}
    </div>
    <div
      v-else-if="errorMessage && !allValid"
      class="ca-input-text__help-text ca-input-text__help-text--error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Text field, use v-model to bind value<br><br>
// **SASS-path:** _./styles/components/atoms/ca-input-text.scss_
export default {
  name: 'CaInputText',
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
    // The autocomplete attribute
    autocomplete: {
      type: String,
      default: 'null'
    },
    // Show a loading spinner in the field
    loading: {
      type: Boolean,
      default: false
    },
    // Type of field
    type: {
      type: String,
      default: 'text'
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
    errorMessage: {
      type: String,
      default: null
    },
    // Set to use built in validation
    validate: {
      // `email`, `passwordStrength`, `passwordMatch`, `personalId`, `empty`
      type: String,
      default: '',
      validator(value) {
        return [
          '',
          'email',
          'passwordStrength',
          'passwordMatch',
          'personalId',
          'empty'
        ].includes(value);
      }
    },
    // The password to match if using the `passwordMatch` validation
    passwordToMatch: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    fieldValid: true,
    focused: false,
    passwordType: '',
    passwordScore: 0
  }),
  computed: {
    // @vuese
    // All the modifier classes
    // @type Object
    modifiers() {
      return {
        'ca-input-text--error': !this.allValid,
        'ca-input-text--focused': this.focused,
        'ca-input-text--empty': !this.value
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
    },
    // @vuese
    // Returns field type, used for toggeling password field
    // @type String
    inputType() {
      return this.passwordType ? this.passwordType : this.type;
    },
    // @vuese
    // Returns text for password field toggle
    // @type String
    passwordToggleText() {
      return this.inputType === 'password' ? this.$t('SHOW') : this.$t('HIDE');
    }
  },
  watch: {
    passwordToMatch() {
      if (this.value) {
        this.validateInput();
      }
    }
  },
  mounted() {},
  methods: {
    // @vuese
    // Validate input, sets `fieldValid` and returns bool
    validateInput() {
      if (this.validate === 'email') {
        this.fieldValid = this.validateEmail(this.value);
      } else if (this.validate === 'passwordStrength') {
        this.fieldValid = this.value.length > 6;
      } else if (this.validate === 'passwordMatch') {
        this.fieldValid = this.value === this.passwordToMatch;
      } else if (this.validate === 'personalId') {
        this.fieldValid = this.validatePersonalId(this.value);
      } else if (this.validate === 'empty') {
        this.fieldValid = this.value !== '';
      }
      // Validation has been made
      // @arg Is valid (Boolean)
      this.$emit('validation', this.fieldValid);
      return this.fieldValid;
    },
    // @vuese
    // Used by `validateInput` to validate email address
    // @arg email (String)
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.required || (!this.required && email !== '')) {
        return re.test(String(email).toLowerCase());
      } else return true;
    },
    // @vuese
    // Used by `validateInput` to validate Swedish personal ID's (Source: https://gist.github.com/peppelorum/5856691)
    // @arg identityNumber (String)
    validatePersonalId(identityNumber) {
      let id = identityNumber;
      const regEx = /^(\d{2})(\d{2})(\d{2})-(\d{4})|(\d{4})(\d{2})(\d{2})-(\d{4})$/;
      // Check valid length & form
      if (!id) {
        return false;
      }

      if (!id.includes('-')) {
        if (id.length === 10) {
          id = id.slice(0, 6) + '-' + id.slice(6);
        } else {
          id = id.slice(0, 8) + '-' + id.slice(8);
        }
      }
      const match = id.match(regEx);
      if (!match) {
        return false;
      }
      // Clean input
      id = id.replace('-', '');
      if (id.length === 12) {
        id = id.substring(2);
      }

      // Declare variables
      const d = new Date(
        match[1] ? match[1] : match[5],
        (match[2] ? match[2] : match[6]) - 1,
        match[3] ? match[3] : match[7]
      );

      // Check valid date
      if (
        Object.prototype.toString.call(d) !== '[object Date]' ||
        isNaN(d.getTime())
      ) {
        return false;
      }

      let sum = 0;
      const parity = id.length % 2;
      let digit = 0;
      // Check luhn algorithm
      for (let i = 0; i < id.length; i = i + 1) {
        digit = parseInt(id.charAt(i), 10);
        if (i % 2 === parity) {
          digit *= 2;
        }
        if (digit > 9) {
          digit -= 9;
        }
        sum += digit;
      }
      return sum % 10 === 0;
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
    },
    // @vuese
    // Toggle field type for password
    togglePasswordVisible() {
      this.passwordType = this.passwordType ? '' : 'text';
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-input-text';
</style>
