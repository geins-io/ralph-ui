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
      // `false`
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
  watch: {
    quantity(val) {
      if (this.count !== val) {
        this.count = this.quantity;
      }
    }
  },
  created() {
    this.count = this.quantity;
  },
  mounted() {},
  methods: {
    // @vuese
    // Update count
    update() {
      // Count has been changed
      // @arg new count (Number)
      this.$emit('changed', this.count);
    },
    // @vuese
    // Increase count by one
    increase() {
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
  display: inline-flex;
  border: $border-dark;
  &__button {
    background: $c-light-gray;
    @include flex-calign;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 0.9em;
    &:disabled {
      pointer-events: none;
    }
    @include bp(laptop) {
      transition: background-color 150ms ease;
      &:hover {
        background: lighten($c-light-gray, 1%);
      }
    }
  }

  &__input {
    width: 34px;
    height: 30px;
    text-align: center;
    border-left: $border-dark;
    border-right: $border-dark;
  }
}
</style>
