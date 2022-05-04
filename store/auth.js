import AuthClient from '@ralph/ralph-ui/plugins/authClient.js';
import { BroadcastChannel as BroadcastService } from 'broadcast-channel';
import eventbus from '@ralph/ralph-ui/plugins/eventbus.js';

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
    dispatch('clearCache');
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
    dispatch('clearCache');
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
          dispatch('refresh');
        }, state.client.maxAge * 900)
      );
      this.$cookies.set('ralph-auth', state.client.token, {
        path: '/',
        maxAge: state.client.maxAge
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
        maxAge: maxage
      });
      this.$cookies.set('ralph-user-maxage', maxage, {
        path: '/',
        maxAge: maxage
      });
      if (this.getters['nosto/isNostoActive']) {
        this.dispatch('nosto/generateSessionToken', true);
      }
    } else {
      username = null;
      commit('clearTokenTimeout');
      commit('setUser', username);
      this.$cookies.remove('ralph-auth');
      this.$cookies.remove('ralph-user');
      this.$cookies.remove('ralph-user-maxage');
      this.$cookies.remove('ralph-user-type');
      if (this.getters['nosto/isNostoActive']) {
        this.dispatch('nosto/generateSessionToken', false);
      }
    }
    if (process.browser) {
      const bc = new BroadcastService('ralph_channel');
      bc.postMessage({ type: 'auth', data: username });
    }
  },
  clearCache() {
    if (this.$config.user.priceLists) {
      this.app.apolloProvider.defaultClient.cache.reset();
      this.dispatch('cart/get');
      eventbus.$emit('clear-cache');
    }
  }
};

export const getters = {
  authenticated(state) {
    return state.user !== null;
  }
};
