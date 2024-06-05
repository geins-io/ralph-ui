import { useNuxtApp, defineNuxtRouteMiddleware } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const { $store } = useNuxtApp();
  if (!process.server && from && to.path !== from.path) {
    $store.dispatch('list/saveQuerySelection', {
      query: to.query,
      setPage: false,
    });
  }
});
