<template>
  <div class="ca-account-page">
    <CaContainer>
      <CaAccountHeader :nav-items="accountMenu" :title="currentPageTitle" />
    </CaContainer>
    <CaContainer
      :design="$store.getters.viewport === 'phone' ? 'full-width' : 'default'"
    >
      <div class="ca-account-page__body">
        <div class="ca-account-page__content">
          <slot></slot>
        </div>
        <CaCustomerServiceBox />
      </div>
    </CaContainer>
  </div>
</template>
<script>
// @group Organisms
// @vuese
// The layout for the "my account" pages, including setup of the navigation items<br><br>
// **SASS-path:** _./styles/components/organisms/ca-account-page.scss_
export default {
  name: 'CaAccountPage',
  mixins: [],
  props: {},
  data: (vm) => ({
    accountMenu: [
      {
        name: vm.$t('ACCOUNT_ORDERS_TITLE'),
        path: 'account-orders',
      },
      {
        name: vm.$t('ACCOUNT_SETTINGS_TITLE'),
        path: 'account-settings',
      },
      {
        name: vm.$t('ACCOUNT_BALANCE_TITLE'),
        path: 'account-balance',
      },
    ],
  }),
  computed: {
    currentPageTitle() {
      const currentPage = this.accountMenu.find(
        (i) => this.$getPath(i.path) === this.$route.path,
      );
      const accountTitle = this.$t('ACCOUNT_TITLE');
      return this.$store.getters.viewport === 'phone'
        ? accountTitle
        : accountTitle + ' / ' + currentPage?.name;
    },
  },
  watch: {},
  mounted() {
    this.$store.dispatch('loading/end');
  },
  methods: {},
};
</script>
<style lang="scss">
@import 'organisms/ca-account-page';
</style>
