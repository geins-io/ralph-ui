import { BroadcastChannel as BroadcastService } from 'broadcast-channel';
import getMarketsQuery from 'global/markets.graphql';

export const state = () => ({
  id: '',
  currentMarket: '',
  markets: [],
  checkoutMarket: '',
  currentLocale: '',
  currentCurrency: '',
});

export const mutations = {
  setId(state, id) {
    state.id = id;
  },
  setCurrentMarket(state, alias) {
    state.currentMarket = alias;
  },
  setMarkets(state, markets) {
    state.markets = markets;
  },
  setCheckoutMarket(state, market) {
    state.checkoutMarket = market;
  },
  setCurrentLocale(state, locale) {
    state.currentLocale = locale;
  },
  setCurrentCurrency(state, currency) {
    state.currentCurrency = currency;
  },
};

export const actions = {
  async getMarkets({ commit }) {
    const callback = (result) => {
      return result?.data?.channel?.markets || [];
    };

    const markets = await this.app.$fetchData(this, getMarketsQuery, callback);

    if (markets) {
      commit('setMarkets', markets);
    }
  },
  setCurrentMarket({ state, commit, dispatch, getters }, alias) {
    if (alias === state.currentMarket) {
      return;
    }

    commit('setCurrentMarket', alias);
    commit('setCheckoutMarket', alias);
    commit('setCurrentCurrency', getters.currentCurrency);

    this.$cookies.set('ralph-selected-market', alias, {
      path: '/',
      expires: new Date(new Date().getTime() + 31536000000),
    });

    if (process.client) {
      const bc = new BroadcastService('ralph_channel');
      bc.postMessage({ type: 'market', data: alias });
      dispatch('refetchQueries', null, { root: true });
    }
  },
  setCheckoutMarket({ commit, dispatch }, alias) {
    commit('setCheckoutMarket', alias);
    dispatch('cart/get', null, { root: true });

    this.$cookies.set('ralph-checkout-market', alias, {
      path: '/',
      expires: new Date(new Date().getTime() + 31536000000),
    });

    if (process.browser) {
      const bc = new BroadcastService('ralph_channel');
      bc.postMessage({ type: 'checkout-market', data: alias });
    }
  },
};

export const getters = {
  currentCurrency: (state) => {
    const currency = state.markets.find(
      (market) => market.alias === state.currentMarket,
    )?.currency.code;
    return currency || 'Currency not found for this market';
  },
  currentMarketObj: (state) => {
    return state.markets.find((market) => market.alias === state.currentMarket);
  },
  checkoutMarketObj: (state) => {
    return state.markets.find(
      (market) => market.alias === state.checkoutMarket,
    );
  },
  cartMarketAlias: (state, getters, rootState) => {
    return rootState.currentRouteName?.includes('checkout')
      ? state.checkoutMarket
      : state.currentMarket;
  },
};
