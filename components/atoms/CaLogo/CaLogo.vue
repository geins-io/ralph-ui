<template>
  <div class="ca-logo">
    <h1>{{ $t("greeting") }}</h1>
  </div>
</template>
<script>
export default {
  name: "CaLogo"
};
</script>
<style lang="scss">
@import "../../helpers";
.ca-logo {
  background-color: red;
}
</style>
