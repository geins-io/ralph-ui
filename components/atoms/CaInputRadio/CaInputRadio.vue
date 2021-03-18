<template>
  <div class="ca-input-radio__wrap">
    <label class="ca-input-radio">
      <input
        class="ca-input-radio__button"
        type="radio"
        :value="value"
        :disabled="disabled"
        :checked="modelValue === value"
        @change="$emit('change', value)"
      />
      <span class="ca-input-radio__value">{{ label }}</span>
    </label>
    <div v-if="description !== ''" class="ca-input-radio__description">
      {{ description }}
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Radio input component<br><br>
// **SASS-path:** _./styles/components/atoms/ca-input-radio.scss_
export default {
  name: 'CaInputRadio',
  mixins: [],
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import 'atoms/ca-input-radio';
</style>
