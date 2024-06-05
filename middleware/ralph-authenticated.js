import { useNuxtApp, defineNuxtRouteMiddleware } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const { $store, $getPath } = useNuxtApp();
  if (!$store.getters['auth/authenticated']) {
    if (!to.query.loginToken) {
      // eslint-disable-next-line no-undef
      return navigateTo($getPath('index'));
    }
  }
});
