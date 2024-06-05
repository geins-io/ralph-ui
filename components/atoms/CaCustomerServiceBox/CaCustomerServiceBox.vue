<template>
  <div class="ca-customer-service-box">
    <h2 class="ca-customer-service-box__title">
      {{ $t('CUSTOMER_SERVICE_BOX_TITLE') }}
    </h2>
    <p class="ca-customer-service-box__text">
      {{ $t('CUSTOMER_SERVICE_BOX_TEXT') }}
    </p>
    <a
      class="ca-customer-service-box__contact"
      :href="'tel:' + $config.public.customerServicePhone"
    >
      <CaIconAndText icon-name="phone">
        {{ $config.public.customerServicePhone }}
      </CaIconAndText>
    </a>
    <a
      class="ca-customer-service-box__contact"
      :href="'mailto:' + $config.public.customerServiceEmail"
    >
      <CaIconAndText icon-name="mail">
        {{ $config.public.customerServiceEmail }}
      </CaIconAndText>
    </a>
  </div>
</template>
<script>
// @group Atoms
// @vuese
// A box displaying som customer service information<br><br>
// **SASS-path:** _./styles/components/atoms/ca-customer-service-box.scss_
export default {
  name: 'CaCustomerServiceBox',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'atoms/ca-customer-service-box';
</style>
