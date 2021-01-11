<template>
  <div class="ca-input-checkbox__wrap">
    <label :for="id" class="ca-input-checkbox" :class="modifiers">
      <input
        :id="id"
        class="ca-input-checkbox__input"
        type="checkbox"
        :name="id"
        :checked="checked"
        :value="checked"
        @change="$emit('change', $event.target.checked)"
      />
      <div class="ca-input-checkbox__box">
        <CaIcon name="check" class="ca-input-checkbox__check" />
      </div>
      <span class="ca-input-checkbox__label">{{ label }}</span>
    </label>
    <div v-if="description" class="ca-input-text__help-text">
      {{ description }}
    </div>
  </div>
</template>
<script>
import CaIcon from 'CaIcon';
// @group Atoms
// @vuese
// (Description of component)<br><br>
// **SASS-path:** _./styles/components/atoms/ca-input-checkbox.scss_
export default {
  name: 'CaInputCheckbox',
  components: { CaIcon },
  mixins: [],
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    },
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
