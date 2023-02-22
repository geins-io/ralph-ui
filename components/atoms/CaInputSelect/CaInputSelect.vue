<template>
  <div class="ca-input-select" :class="modifiers">
    <label v-if="label !== ''" class="ca-input-select__label">
      {{ label }}
      <span v-if="!required" class="ca-input-select__optional">
        ({{ $t('INPUT_OPTIONAL') }})
      </span>
    </label>
    <div
      v-if="$store.getters.viewportComputer"
      class="ca-input-select__container"
    >
      <div class="ca-input-select__selected" @click="toggleOptions">
        {{ selected.label || placeholder }}
        <CaIcon class="ca-input-select__arrow" :name="iconName" />
      </div>
      <SlideUpDown
        class="ca-input-select__options"
        tag="ul"
        :active="open"
        :duration="200"
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          class="ca-input-select__option"
          @click="selectOption(option.value, option.label)"
        >
          {{ option.label }}
        </li>
      </SlideUpDown>
    </div>
    <div v-else class="ca-input-select__select-wrap">
      <select
        v-model="selected.value"
        class="ca-input-select__select"
        :disabled="disabled"
        @change="selectOption($event.target.value)"
      >
        <option v-if="placeholder" value="" selected disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <CaIcon class="ca-input-select__arrow" :name="iconName" />
    </div>
    <div v-if="description !== ''" class="ca-input-select__description">
      {{ description }}
    </div>
  </div>
</template>
<script>
import SlideUpDown from 'vue-slide-up-down';
// @group Atoms
// @vuese
// A select input that works with v-model and has a native behavior on mobile devices<br><br>
// **SASS-path:** _./styles/components/atoms/ca-input-select.scss_
export default {
  name: 'CaInputSelect',
  components: { SlideUpDown },
  mixins: [],
  props: {
    // Should be an array of objects containing 'label' and 'value' for every option
    options: {
      type: Array,
      required: true
    },
    // The form element label
    label: {
      type: String,
      // ''
      default: ''
    },
    // Use v-model to bind value
    value: {
      type: [String, Number],
      required: true
    },
    // Placeholder if no option is chosen
    placeholder: {
      type: String,
      // ''
      default: ''
    },
    // Add a description under the select
    description: {
      type: String,
      // ''
      default: ''
    },
    // Is it required
    required: {
      type: Boolean,
      // `true`
      default: true
    },
    // Used to disable the input
    disabled: {
      type: Boolean,
      // `false`
      default: false
    },
    iconName: {
      type: String,
      default: 'chevron-down'
    }
  },
  data: () => ({
    selected: {
      value: '',
      label: ''
    },
    open: false
  }),
  computed: {
    modifiers() {
      return {
        'ca-input-select--open': this.open,
        'ca-input-select--disabled': this.disabled
      };
    }
  },
  watch: {
    value(val) {
      this.selectOption(val);
    }
  },
  mounted() {
    if (!this.placeholder) {
      this.setInitialValue();
    }
  },
  methods: {
    // @vuese
    // Used to set initial value when mounted
    setInitialValue() {
      const chosenOption = this.options.find(item => item.value === this.value);
      this.selectOption(chosenOption.value, chosenOption.label);
    },
    // @vuese
    // This is run to select an option
    // @arg new value (String, Number) and label (String - optional)
    selectOption(value, label = null) {
      if (!label) {
        label = this.getLabel(value);
      }
      this.selected.label = label;
      this.selected.value = value;
      // Triggered by user input change
      // @arg The newly selected value (String, Number)
      this.$emit('input', value);
      this.open = false;
    },
    // @vuese
    // Opening and closing the dropdown
    toggleOptions() {
      if (!this.open) {
        this.$emit('opened');
      }
      this.open = !this.open;
    },
    // @vuese
    // Closing the dropdown
    close() {
      this.open = false;
    },
    // @vuese
    // Get the label for a specific value in the list of options
    // @arg value (String, Number)
    getLabel(val) {
      const option = this.options.find(item => item.value === val);
      return option?.label || this.placeholder;
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-input-select';
</style>
