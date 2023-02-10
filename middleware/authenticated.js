export default function({ store, redirect, route, app }) {
  if (!store.getters['auth/authenticated']) {
    if (!route.query.loginToken) {
      return redirect(app.$getPath('index'));
    }
  }
}
