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
        class="ca-input-text__toggle-password"
        tabindex="-1"
        @click="togglePasswordVisible"
      >
        {{ passwordToggleText }}
      </button>
      <Password
        v-show="validate === 'passwordStrength' && value"
        v-model="value"
        class="ca-input-text__password-strength"
        :strength-meter-only="true"
        strength-meter-class="Password__strength-meter ca-input-text__password-meter"
        @score="setPasswordScore"
      />
    </div>

    <div v-if="description && allValid" class="ca-input-text__help-text">
      {{ description }}
    </div>
    <div
      v-else-if="errorText && !allValid"
      class="ca-input-text__help-text ca-input-text__help-text--error"
    >
      {{ errorText }}
    </div>
  </div>
</template>
<script>
import CaSpinner from 'CaSpinner';
import CaIcon from 'CaIcon';
import Password from 'vue-password-strength-meter';
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-input-text.scss_
export default {
  name: 'CaInputText',
  components: { CaSpinner, CaIcon, Password },
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
        return ['', 'email', 'passwordStrength', 'passwordMatch'].includes(
          value
        );
      }
    },
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
    modifiers() {
      return {
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
    },
    inputType() {
      return this.passwordType ? this.passwordType : this.type;
    },
    passwordToggleText() {
      return this.inputType === 'password' ? 'Visa' : 'Dölj';
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
    validateInput() {
      if (this.validate === 'email') {
        this.fieldValid = this.validateEmail(this.value);
      } else if (this.validate === 'passwordStrength') {
        this.fieldValid = this.passwordScore > 1;
      } else if (this.validate === 'passwordMatch') {
        this.fieldValid = this.value === this.passwordToMatch;
      } else if (this.required) {
        this.fieldValid = this.value !== '';
      }
      this.$emit('validation', this.fieldValid);
      return this.fieldValid;
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validateIfError() {
      if (!this.allValid) {
        this.validateInput();
      }
    },
    blurHandler() {
      this.focused = false;
      this.validateInput();
    },
    togglePasswordVisible() {
      this.passwordType = this.passwordType ? '' : 'text';
    },
    setPasswordScore(score) {
      this.passwordScore = score;
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-input-text';
</style>
