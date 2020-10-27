<template>
  <div class="ca-size-picker">
    <div
      v-for="(size, index) in sizes"
      :key="index"
      class="ca-size-picker__holder"
    >
      <button
        class="ca-size-picker__trigger"
        :class="{
          'ca-size-picker__trigger--disabled': !size.stockQuantity,
          'ca-size-picker__trigger--chosen': size.value === chosenSku.value
        }"
        @click="chooseSize(size.skuId, size.value)"
      >
        {{ size.value }}
      </button>
      <!-- <button v-if="!size.stockQuantity" class="ca-size-picker__notify">
        Bevaka
      </button> -->
    </div>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// Used to pick a size variant of a product<br><br>
// **SASS-path:** _./styles/components/atoms/ca-size-picker.scss_
export default {
  name: 'CaSizePicker',
  components: {},
  mixins: [],
  props: {
    sizes: {
      type: Array,
      required: true
    },
    chosenSku: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    chosenSize() {
      return this.chosenSku.value
        ? this.sizes.filter(i => i.value === this.chosenSku.value)[0]
        : null;
    },
    chosenStockQuantity() {
      return this.chosenSku.value ? this.chosenSize.stockQuantity : null;
    },
    chosenSkuId() {
      return this.chosenSku.value ? this.chosenSize.skuId : null;
    }
  },
  watch: {
    chosenStockQuantity(val) {
      if (val === 0) {
        this.$emit('reset');
      }
    },
    chosenSkuId(val) {
      if (val !== this.chosenSku.id) {
        this.chooseSize(val, this.chosenSku.value);
      }
    }
  },
  mounted() {},
  methods: {
    chooseSize(id, value) {
      this.$emit('changed', { id, value });
    }
  }
};
</script>
<style lang="scss">
@import 'atoms/ca-size-picker';
</style>
