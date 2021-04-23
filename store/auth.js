import AuthClient from '@ralph/ralph-ui/plugins/authClient.js';

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
      const client = new AuthClient(
        async id => await client.get(rootState.config.signEndpoint + id),
        rootState.config.authEndpoint
      );
      commit('setClient', client);
      await dispatch('refresh');
      dispatch('loading/end', null, { root: true });
    }
  },
  async refresh({ state, dispatch }) {
    await state.client?.connect();
    dispatch('update');
  },
  async login({ state, dispatch }, credentials) {
    await state.client?.connect(credentials);
    dispatch('update', credentials);
  },
  async register({ state, dispatch }, credentials) {
    await state.client?.connect(credentials, 'register');
    dispatch('update', credentials);
  },
  async changePassword({ state, dispatch }, credentials) {
    await state.client?.connect(credentials, 'password');
    dispatch('update');
  },
  async logout({ state, dispatch }) {
    await state.client?.connect(null, 'logout');
    dispatch('update');
  },
  update({ state, commit, dispatch }, credentials) {
    if (state.client.authorized) {
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
      if (credentials) {
        commit('setUser', credentials.username);
        this.$cookies.set('ralph-user', credentials.username, {
          path: '/',
          maxAge: credentials.rememberUser ? 604800 : 1800 // 7 days or 30 minutes - This is matching the lifetime of the refresh cookie from the auth service
        });
      }
    } else {
      commit('clearTokenTimeout');
      commit('setUser', null);
      this.$cookies.remove('ralph-auth');
      this.$cookies.remove('ralph-user');
    }
  }
};

export const getters = {
  authenticated(state) {
    return state.user !== null;
  }
};
