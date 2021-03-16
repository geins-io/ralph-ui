import AuthClient from '~/plugins/authClient.js';

export const state = () => ({
  user: null,
  client: null,
  tokenTimeout: null
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
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
  async initClient({ state, rootState, commit, dispatch }) {
    if (!state.client) {
      dispatch('loading/start', null, { root: true });
      const signEndpoint = rootState.config.signEndpoint.replace(
        '{API_KEY}',
        rootState.config.apiKey
      );
      const client = new AuthClient(
        async id => await client.get(signEndpoint + id),
        rootState.config.authEndpoint
      );
      commit('setClient', client);
      await dispatch('refresh');
      dispatch('loading/end', null, { root: true });
    }
  },
  async refresh({ state, dispatch }) {
    await state.client?.refresh();
    dispatch('updateIfAuthorized');
  },
  async register({ state, dispatch }, credentials) {
    await state.client?.register(credentials.username, credentials.password);
    dispatch('update', credentials.username);
  },
  async login({ state, dispatch }, credentials) {
    await state.client?.login(credentials.username, credentials.password);
    dispatch('update', credentials.username);
  },
  async changePassword({ state, dispatch }, credentials) {
    await state.client?.changePassword(
      credentials.username,
      credentials.password,
      credentials.newPassword
    );
    dispatch('updateIfAuthorized');
  },
  async logout({ state, dispatch }) {
    await state.client?.logout();
    dispatch('update', null, false);
  },
  update({ state, commit, dispatch }, user, update = true) {
    if (update && state.client.authorized) {
      commit(
        'setTokenTimeout',
        setTimeout(() => {
          dispatch('refresh');
        }, state.client.maxAge * 900)
      );
      this.$cookies.set('ralph-auth', state.client.token, {
        path: '/',
        maxAge: state.client.maxAge
      });
      if (user) {
        commit('setUser', user);
        this.$cookies.set('ralph-user', user);
      }
    } else {
      commit('clearTokenTimeout');
      commit('setUser', null);
      this.$cookies.remove('ralph-auth');
      this.$cookies.remove('ralph-user');
    }
  },
  updateIfAuthorized({ state, dispatch }) {
    if (state.client.authorized) {
      dispatch('update');
    } else {
      dispatch('update', null, false);
    }
  }
};

export const getters = {
  authenticated(state) {
    return state.user !== null;
  }
};
