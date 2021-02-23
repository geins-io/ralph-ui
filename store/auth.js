import gql from 'graphql-tag';
import jwtTokenFragment from 'user/jwt-token.graphql';

export const state = () => ({
  token: null,
  refresh: null,
  headers: null
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
        `,
      context: {
        headers: state.headers
      }
    });
    const authRefresh = await refreshMutation.data?.refresh;
    dispatch('setAuth', authRefresh);
  }
};

export const getters = {
  isAuthenticated(state) {
    return state.token !== null;
  }
};
