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
      const client = new AuthClient(
        async (id) => await client.get(rootState.config.signEndpoint + id),
        rootState.config.authEndpoint,
      );
      commit('setClient', client);
      const refreshToken = this.$cookies.get('ralph-auth-refresh');
      if (refreshToken) {
        state.client.setRefreshToken(refreshToken);
      }
      await dispatch('refresh');
    }
  },
  async refresh({ state, dispatch }, refetchQueries = false) {
    await state.client?.connect();
    dispatch('update', { refetchQueries });
  },
  async login({ state, dispatch }, credentials) {
    await state.client?.connect(credentials);
    dispatch('update', { credentials, refetchQueries: true });
  },
  async register({ state, dispatch }, credentials) {
    await state.client?.connect(credentials, 'register');
    dispatch('update', { credentials, refetchQueries: true });
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
    dispatch('update', { refetchQueries: true });
  },
  update({ state, commit, dispatch }, payload) {
    const credentials = payload?.credentials;
    let refetchQueries = payload?.refetchQueries;
    let broadcast = process.client;
    let username = credentials
      ? credentials.username
      : this.$cookies.get('ralph-user');

    if (state.client.authorized) {
      commit(
        'setTokenTimeout',
        setTimeout(() => {
          if (process.client) {
            dispatch('refresh', true);
          }
        }, state.client.maxAge * 900),
      );
      this.$cookies.set('ralph-auth', state.client.token, {
        path: '/',
        maxAge: state.client.maxAge,
      });
      let maxAge = 604800;
      if (credentials) {
        maxAge = credentials.rememberUser ? 604800 : 1800; // 7 days or 30 minutes - This is matching the lifetime of the refresh cookie from the auth service
      } else if (this.$cookies.get('ralph-user-maxAge')) {
        maxAge = this.$cookies.get('ralph-user-maxAge');
      }
      commit('setUser', username);
      this.$cookies.set('ralph-user', username, {
        path: '/',
        maxAge,
      });
      this.$cookies.set('ralph-user-maxage', maxAge, {
        path: '/',
        maxAge,
      });
      this.$cookies.set('ralph-auth-refresh', state.client.refreshToken, {
        path: '/',
        maxAge,
      });
    } else if (state.user !== null) {
      username = null;
      commit('clearTokenTimeout');
      commit('setUser', username);
      this.$cookies.remove('ralph-auth', { path: '/' });
      this.$cookies.remove('ralph-user', { path: '/' });
      this.$cookies.remove('ralph-user-maxage', { path: '/' });
      this.$cookies.remove('ralph-user-type', { path: '/' });
      this.$cookies.remove('ralph-auth-refresh', { path: '/' });
    } else {
      // No login, no logout, no need to refetch queries or broadcast
      refetchQueries = false;
      broadcast = false;
    }
    if (broadcast) {
      const bc = new BroadcastService('ralph_channel');
      bc.postMessage({ type: 'auth', data: username });
    }
    if (refetchQueries) {
      dispatch('refetchQueries', null, { root: true });
    }
  },
};

export const getters = {
  authenticated(state) {
    return state.user !== null;
  },
};
