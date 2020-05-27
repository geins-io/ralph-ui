<template>
  <div class="ca-input-select" :class="modifiers">
    <label class="ca-input-select__label">
      {{ label }}
      <span v-if="!required" class="ca-input-select__optional">
        (optional)
      </span>
    </label>
    <div class="ca-input-select__container">
      <div class="ca-input-select__selected" @click="toggleOptions">
        {{ selected.title || placeholder }}
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
          @click="selectOption(option.value, option.title)"
        >
          {{ option.title }}
        </li>
      </SlideUpDown>
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
export default {
  name: 'CaInputSelect',
  components: { SlideUpDown },
  mixins: [],
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    },
    placeholder: {
      type: String,
      default: ''
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
    }
  },
  data: () => ({
    selected: {
      value: null,
      title: ''
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
  watch: {},
  mounted() {
    if (this.value) {
      const chosenOption = this.options.find(item => item.value === this.value);
      this.selectOption(chosenOption.value, chosenOption.title);
    }
  },
  methods: {
    selectOption(value, title) {
      this.selected.title = title;
      this.selected.value = value;
      this.$emit('input', value);
      this.open = false;
    },
    toggleOptions() {
      this.open = !this.open;
    }
  }
};
</script>
<style lang="scss">
.ca-input-select {
}
</style>
