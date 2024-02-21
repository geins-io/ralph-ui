import AuthClient from '@geins/ralph-ui/plugins/auth-client.js';
import { BroadcastChannel as BroadcastService } from 'broadcast-channel';

export const state = () => ({
  user: null,
  client: null,
  tokenTimeout: null,
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
  },
};

export const actions = {
  async initClient({ state, rootState, commit, dispatch }) {
    if (!state.client) {
      dispatch('loading/start', null, { root: true });
      const client = new AuthClient(
        async (id) => await client.get(rootState.config.signEndpoint + id),
        rootState.config.authEndpoint,
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
    dispatch(
      'events/push',
      {
        type: 'user:logout',
      },
      { root: true },
    );
    dispatch('update');
  },
  update({ state, commit, dispatch }, credentials) {
    let username = credentials
      ? credentials.username
      : this.$cookies.get('ralph-user');
    if (state.client.authorized) {
      commit(
        'setTokenTimeout',
        setTimeout(() => {
          if (process.client) {
            dispatch('refresh');
          }
        }, state.client.maxAge * 900),
      );
      this.$cookies.set('ralph-auth', state.client.token, {
        path: '/',
        maxAge: state.client.maxAge,
      });
      let maxage = 604800;
      if (credentials) {
        maxage = credentials.rememberUser ? 604800 : 1800; // 7 days or 30 minutes - This is matching the lifetime of the refresh cookie from the auth service
      } else if (this.$cookies.get('ralph-user-maxage')) {
        maxage = this.$cookies.get('ralph-user-maxage');
      }
      commit('setUser', username);
      this.$cookies.set('ralph-user', username, {
        path: '/',
        maxAge: maxage,
      });
      this.$cookies.set('ralph-user-maxage', maxage, {
        path: '/',
        maxAge: maxage,
      });
    } else {
      username = null;
      commit('clearTokenTimeout');
      commit('setUser', username);
      this.$cookies.remove('ralph-auth', { path: '/' });
      this.$cookies.remove('ralph-user', { path: '/' });
      this.$cookies.remove('ralph-user-maxage', { path: '/' });
      this.$cookies.remove('ralph-user-type', { path: '/' });
    }
    if (process.client) {
      const bc = new BroadcastService('ralph_channel');
      bc.postMessage({ type: 'auth', data: username });
      dispatch('refetchQueries', null, { root: true });
    }
  },
};

export const getters = {
  authenticated(state) {
    return state.user !== null;
  },
};
