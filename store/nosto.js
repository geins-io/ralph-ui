export const state = () => ({
  sessionToken: null,
  pageWidgetsData: []
});

export const mutations = {
  setSessionToken(state, token) {
    state.sessionToken = token;
  },
  setPageWidgetsData(state, data) {
    state.pageWidgetsData = data;
  }
};

export const actions = {
  /* eslint-disable */
  loadRecommendations({ dispatch, commit, rootState }, payload = {}) {
    if (process.browser && this.$config.isNostoActive) {
      dispatch('cart/sendNostoEvent', rootState.cart.data, {
        root: true
      });

      let viewMethod = null;

      switch (payload.route) {
        case 'FrontPage':
          viewMethod = 'viewFrontPage';
          break;
        case 'Product':
          viewMethod = 'viewProduct';
          break;
        case 'Category':
          viewMethod = 'viewCategory';
          break;
        case 'Search':
          viewMethod = 'viewCart';
          break;
        case 'Checkout':
          viewMethod = 'viewSearch';
          break;
        case '404':
          viewMethod = 'viewNotFound';
          break;
        default:
          viewMethod = 'viewOther';
          break;
      }
      console.log(payload);

      setTimeout(() => {
        window.nostojs(api => {
          api
            .defaultSession()
            [viewMethod](payload.params)
            .setPlacements(api.placements.getPlacements())
            .load()
            .then(response => {
              commit('setPageWidgetsData', response.recommendations);
            });
        });
      }, 1000);
    }
  },
  generateSessionToken({ commit }, isLogin) {
    if (isLogin) {
      commit('setSessionToken', this.$cookies.get('2c.cId'));
    } else {
      commit('setSessionToken', this.$cookies.get('2c.cId'));
    }
  }
};

export const getters = {
  isNostoActive(_, _2, { config }) {
    const { isNostoActive, nostoAccountId } = config;
    if (isNostoActive && nostoAccountId && nostoAccountId.length) {
      return isNostoActive && nostoAccountId;
    } else {
      return false;
    }
  },
  getSessionToken(state) {
    return state.sessionToken;
  }
};
