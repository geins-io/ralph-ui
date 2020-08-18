<template>
  <div class="ca-product-quantity">
    <CaIconButton
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
      :disabled="inputDisabled"
      @input="validateInput"
      @blur="validateEmpty"
    />
    <CaIconButton
      class="ca-product-quantity__button ca-product-quantity__button--increase"
      icon-name="plus"
      aria-label="Increase"
      :disabled="maxReached"
      @clicked="increase"
    />
  </div>
</template>
<script>
import CaIconButton from 'CaIconButton';
// @group Molecules
// Used to modify quantity of products
export default {
  name: 'CaProductQuantity',
  components: { CaIconButton },
  mixins: [],
  props: {
    // The quantity to be modified
    quantity: {
      type: Number,
      required: true
    },
    // Used to disable user input in the input field
    inputDisabled: {
      type: Boolean,
      default: false
    },
    // What is the maximum quantity? Stock status
    maxQuantity: {
      type: Number,
      required: true
    },
    // What is the minimum quantity? Default 1
    minQuantity: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    count: 0
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
    }
  },
  watch: {},
  created() {
    this.count = this.quantity;
  },
  mounted() {},
  methods: {
    update() {
      this.$emit('changed', this.count);
    },
    increase() {
      this.count++;
      if (this.maxReached) {
        this.$emit('maxReached');
      }
      this.update();
    },
    decrease() {
      this.count--;
      if (this.minReached) {
        this.$emit('minReached');
      }
      this.update();
    },
    validateEmpty() {
      if (this.inputEmpty) {
        this.count = this.minQuantity;
        this.update();
      }
    },
    validateInput() {
      if (this.inputEmpty) return;

      if (isNaN(this.count)) {
        this.count = this.minQuantity;
      } else if (this.maxReached) {
        this.$emit('maxReached');
        this.count = this.maxQuantity;
      } else if (this.minReached) {
        this.$emit('minReached');
        this.count = this.minQuantity;
      }

      this.update();
    }
  }
};
</script>
<style lang="scss">
.ca-product-quantity {
  display: flex;
  &__button,
  &__input {
    width: 30px;
    height: 30px;
    text-align: center;
  }
}
</style>
