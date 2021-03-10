import AuthClient from '~/plugins/authClient.js';

export const state = () => ({
  headers: null,
  tokenTimeout: null,
  client: null
});

export const mutations = {
  setHeaders(state, headers) {
    state.headers = headers;
  },
  setClient(state, client) {
    state.client = client;
  },
  setTokenTimeout(state, timeout) {
    state.tokenTimeout = timeout;
  },
  clearTokenTimeout(state) {
    clearTimeout(state.tokenTimeout);
  }
};

export const actions = {
  update({ state, commit, rootState, dispatch }, update = true) {
    if (update && state.client.authorized) {
      commit('setHeaders', {
        apikey: rootState.config.apiKey,
        authorization: 'Bearer ' + state.client.token
      });
      commit(
        'setTokenTimeout',
        setTimeout(() => {
          dispatch('refresh');
        }, state.client.maxAge * 900)
      );
    } else {
      commit('setHeaders', null);
      commit('clearTokenTimeout');
    }
  },
  async initClient({ state, rootState, commit, dispatch }) {
    if (!state.client) {
      const signEndpoint = rootState.config.signEndpoint.replace(
        '{API_KEY}',
        rootState.config.apiKey
      );
      const client = new AuthClient(
        async id => await client.get(signEndpoint + id),
        rootState.config.authEndpoint
      );
      commit('setClient', client);
      console.log(client);
      await dispatch('refresh');
      return true;
    }
  },
  async refresh({ state, dispatch }) {
    await state.client?.refresh();
    if (state.client.token) {
      dispatch('update');
    } else {
      dispatch('update', false);
    }
  },
  async register({ state, dispatch }, credentials) {
    await state.client?.register(credentials.username, credentials.password);
    dispatch('update');
  },
  async login({ state, dispatch }, credentials) {
    await state.client?.login(credentials.username, credentials.password);
    dispatch('update');
  },
  async logout({ state, dispatch }) {
    await state.client?.logout();
    dispatch('update', false);
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.client && state.client.authorized;
  }
};
