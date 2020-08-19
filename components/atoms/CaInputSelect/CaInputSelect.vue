<template>
  <div class="ca-input-select" :class="modifiers">
    <label v-if="label !== ''" class="ca-input-select__label">
      {{ label }}
      <span v-if="!required" class="ca-input-select__optional">
        (optional)
      </span>
    </label>
    <div
      v-if="$store.getters.viewportLaptop"
      class="ca-input-select__container"
    >
      <div class="ca-input-select__selected" @click="toggleOptions">
        {{ selected.label || placeholder }}
        <CaIcon class="ca-input-select__arrow" name="chevron-down" />
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
        @change="selectOption($event.target.value)"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <CaIcon class="ca-input-select__arrow" name="chevron-down" />
    </div>
    <div v-if="description !== ''" class="ca-input-select__description">
      {{ description }}
    </div>
  </div>
</template>
<script>
import SlideUpDown from 'vue-slide-up-down';
import CaIcon from 'CaIcon';
// @group Atoms
// @vuese
// A select input that works with v-model and has a native behavior on mobile devices
export default {
  name: 'CaInputSelect',
  components: { SlideUpDown, CaIcon },
  mixins: [],
  props: {
    // Should be an array of objects containing 'label' and 'value' for every option
    options: {
      type: Array,
      required: true
    },
    // The from element label
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
    }
  },
  data: () => ({
    selected: {
      value: null,
      label: ''
    },
    open: false
  }),
  computed: {
    modifiers() {
      return {
        'ca-input-select--open': this.open
      };
    }
  },
  watch: {
    value() {
      if (this.label === '') {
        this.setInitialValue();
      }
    }
  },
  mounted() {
    this.setInitialValue();
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
      if (!label) label = this.getLabel(value);
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
      this.open = !this.open;
    },
    // @vuese
    // Get the label for a specific value in the list of options
    // @arg value (String, Number)
    getLabel(val) {
      return this.options.find(item => item.value === val).label;
    }
  }
};
</script>
<style lang="scss">
.ca-input-select {
  $block: &;
  position: relative;
  width: 165px;
  &__label {
    left: 10px;
    font-size: $font-size-xs;
    transition: all 150ms ease;
    pointer-events: none;
    padding: 2px 5px;
    background: #fff;
    position: absolute;
    transform: translateY(-50%);
    top: 0;
    z-index: 10;
  }
  &__selected,
  &__select-wrap {
    padding: 0px 43px 0px 15px;
    line-height: 38px;
    height: 40px;
    border: $border-light;
    background: $c-lightest-gray;
    transition: border-color 200ms ease;
    cursor: pointer;
    position: relative;
  }

  &__select-wrap {
    padding: 0;
  }
  &__select {
    padding: 0px 43px 0px 15px;
    width: 100%;
    height: 100%;
  }
  &__arrow {
    @include valign;
    right: 14px;
    font-size: 16px;
  }
  &__options {
    border: $border-light;
    position: absolute;
    margin-top: 2px;
    width: 100%;
    z-index: 15;
    background: $c-lightest-gray;
    overflow: hidden;
  }

  &__option {
    line-height: 40px;
    padding: 0px 15px;
    cursor: pointer;
    background: $c-lightest-gray;
    transition: all 200ms ease;

    &:hover {
      background: $c-light-gray;
    }
  }

  &__description {
    font-size: $font-size-xs;
    color: $c-text-secondary;
    margin: 5px 0px 0px 15px;
  }
  &__optional {
    font-size: 0.9em;
    color: $c-text-secondary;
    margin-left: 2px;
  }

  &--disabled {
    color: $c-text-secondary;
  }

  &--open {
    #{$block}__label {
      font-weight: $font-weight-bold;
      color: $c-darkest-gray;
    }

    #{$block}__selected {
      border: 1px solid $c-dark-gray;

      &:before {
        transform: translateY(-50%) rotate(-180deg);
      }
    }
  }
}
</style>
