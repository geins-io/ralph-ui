import gql from 'graphql-tag';
import jwtTokenFragment from 'user/jwt-token.graphql';

export const state = () => ({
  token: null,
  refresh: null,
  headers: null,
  tokenTimeout: null
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setRefresh(state, refresh) {
    state.refresh = refresh;
  },
  setHeaders(state, headers) {
    state.headers = headers;
  },
  setTokenTimeout(state, timeout) {
    state.tokenTimeout = timeout;
  },
  clearTokenTimeout(state) {
    clearTimeout(state.tokenTimeout);
  }
};

export const actions = {
  setAuth({ commit, rootState }, auth) {
    if (auth !== null) {
      commit('setToken', auth.token);
      commit('setRefresh', auth.refresh);
      if (auth.token) {
        commit('setHeaders', {
          apikey: rootState.config.apiKey,
          authorization: 'Bearer ' + auth.token
        });
      }
      if (auth.maxAge) {
        commit(
          'setTokenTimeout',
          setTimeout(() => {
            commit('setToken', null);
          }, (auth.maxAge - 60) * 1000)
        );
      }
    } else {
      commit('setToken', null);
      commit('setRefresh', null);
      commit('setHeaders', null);
    }
  },
  async refreshToken({ state, rootState, dispatch }) {
    const apolloClient = this.app.apolloProvider.defaultClient;
    const jwtToken = gql`
      ${jwtTokenFragment}
    `;
    const refreshMutation = await apolloClient.mutate({
      mutation: gql`
          mutation {
            refresh(apiKey: "${rootState.config.apiKey}", refreshToken: "${state.refresh}") {
              ...JwtToken
            }
          }
          ${jwtToken}
        `
    });
    const authRefresh = await refreshMutation.data?.refresh;
    if (authRefresh) {
      dispatch('setAuth', authRefresh);
      return true;
    } else {
      return false;
    }
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.token !== null;
  },
  needsRefresh(state) {
    return state.token === null && state.refresh !== null;
  }
};
