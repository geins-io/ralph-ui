export default function({ store, redirect, route }) {
  if (!store.getters['auth/authenticated']) {
    if (!route.query.loginToken) {
      return redirect('/');
    }
  }
}
