export default function({ store, route, from }) {
  if (!process.server && from && route.path !== from.path) {
    store.commit('list/setSkipProductsQuery', true);
    store.dispatch('list/saveQuerySelection', {
      query: route.query,
      setPage: false
    });
  }
}
