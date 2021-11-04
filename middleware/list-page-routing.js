export default function({ store, route }) {
  if (!process.server) {
    store.commit('list/setSkipProductsQuery', true);
    store.dispatch('list/saveQuerySelection', {
      query: route.query,
      setPage: true
    });
  }
}
