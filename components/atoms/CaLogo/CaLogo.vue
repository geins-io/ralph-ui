<template>
  <div class="ca-logo">
    <h1>{{ $t("GREETING_HELLO") }} {{ message }}</h1>
  </div>
</template>
<script>
export default {
  name: "CaLogo",
  props: {
    someProp: {
      type: String,
      default: "TOP"
    }
  },
  data() {
    return {
      message: process.env.DB_HOST
    };
  }
};
</script>
<style lang="scss">
@import "../../helpers";
.ca-logo {
  background-color: red;
}
</style>
