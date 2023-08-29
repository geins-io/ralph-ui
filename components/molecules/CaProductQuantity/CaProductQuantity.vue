<template>
  <div class="ca-product-quantity" :class="typeModifier">
    <CaIconButton
      v-if="type !== 'stacked'"
      class="ca-product-quantity__button ca-product-quantity__button--decrease"
      icon-name="minus"
      aria-label="Decrease"
      :disabled="minReached"
      @clicked="decrease"
    />
    <input
      v-model.number="count"
      type="text"
      class="ca-product-quantity__input"
      aria-label="Product quantity"
      :disabled="inputDisabled"
      @input="validateInput"
      @blur="validateEmpty"
    />
    <CaIconButton
      class="ca-product-quantity__button ca-product-quantity__button--increase"
      :icon-name="type === 'stacked' ? 'chevron-up' : 'plus'"
      aria-label="Increase"
      :disabled="maxReached"
      @clicked="increase"
    />
    <CaIconButton
      v-if="type === 'stacked'"
      class="ca-product-quantity__button ca-product-quantity__button--decrease"
      icon-name="chevron-down"
      aria-label="Decrease"
      :disabled="minReached"
      @clicked="decrease"
    />
  </div>
</template>
<script>
// @group Molecules
// Used to modify quantity of products<br><br>
// **SASS-path:** _./styles/components/molecules/ca-product-quantity.scss_
export default {
  name: 'CaProductQuantity',
  mixins: [],
  props: {
    // The quantity to be modified
    quantity: {
      type: Number,
      required: true,
    },
    // Used to disable user input in the input field
    inputDisabled: {
      type: Boolean,
      // `false`
      default: false,
    },
    // What is the maximum quantity? Stock status
    maxQuantity: {
      type: Number,
      required: true,
    },
    // What is the minimum quantity? Default 1
    minQuantity: {
      type: Number,
      default: 1,
    },
    // Threshold to stop at and emit event. Used for cart vs product page stock handling
    threshold: {
      type: Number,
      default: -1,
    },
    // Different style types for the counter
    type: {
      // `default`, `round`, `stacked`
      type: String,
      default: 'default',
    },
  },
  data: () => ({
    count: 0,
    updateTimeout: null,
  }),
  computed: {
    maxReached() {
      return this.count >= this.maxQuantity;
    },
    minReached() {
      return this.count <= this.minQuantity;
    },
    inputEmpty() {
      return this.count === '';
    },
    stopAtThreshold() {
      return this.threshold > -1 && this.threshold < this.maxQuantity;
    },
    typeModifier() {
      return 'ca-product-quantity--' + this.type;
    },
  },
  watch: {
    quantity(val) {
      if (this.count !== val) {
        this.count = val;
      }
    },
    threshold(val) {
      if (this.stopAtThreshold && this.count > val) {
        this.count = this.threshold > 0 ? this.threshold : this.minQuantity;
        this.update();
      }
    },
  },
  created() {
    this.count = this.quantity;
  },
  mounted() {},
  methods: {
    // @vuese
    // Update count
    update() {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(() => {
        // Count has been changed
        // @arg new count (Number)
        this.$emit('changed', this.count);
      }, 500);
    },
    // @vuese
    // Increase count by one
    increase() {
      if (this.stopAtThreshold && this.count >= this.threshold) {
        // Threshold count reached
        this.$emit('thresholdReached');
        return;
      }
      this.count++;
      if (this.maxReached) {
        // Max count reached
        this.$emit('maxReached');
      }
      this.update();
    },
    // @vuese
    // Decrease count by one
    decrease() {
      this.count--;
      if (this.minReached) {
        // Min count reached
        this.$emit('minReached');
      }
      this.update();
    },
    // @vuese
    // If field is empty on blur, set to minimum count
    validateEmpty() {
      if (this.inputEmpty) {
        this.count = this.minQuantity;
        this.update();
      }
    },
    // @vuese
    // Validate count input field. Can only contain number and not be above or below max count
    validateInput() {
      if (this.inputEmpty) {
        return;
      }
      if (isNaN(this.count)) {
        this.count = this.minQuantity;
      } else if (this.stopAtThreshold && this.count >= this.threshold) {
        this.$emit('thresholdReached');
        this.count = this.threshold;
      } else if (this.maxReached) {
        this.$emit('maxReached');
        this.count = this.maxQuantity;
      } else if (this.minReached) {
        this.$emit('minReached');
        this.count = this.minQuantity;
      }

      this.update();
    },
  },
};
</script>
<style lang="scss">
@import 'molecules/ca-product-quantity';
</style>
