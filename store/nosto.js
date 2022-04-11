export const state = () => ({
  loading: false
});

export const mutations = {
  setDelay(state, delay) {
    state.delay = delay;
  }
};

export const actions = {
  loadRecommendations(context, payload = {}) {
    if (process.browser && this.$config.isNostoActive) {
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

      window.nostojs(api => {
        api
          .defaultSession()
          [viewMethod](payload.params)
          .setPlacements(api.placements.getPlacements())
          .load()
          .then(data => {
            console.log(data.recommendations);
          });
      });
    }
  }
};

export const getters = {
  isNostoActive(_, _2, { config }) {
    const { isNostoActive, nostoAccountId, nostoAccountAppsKey } = config;
    return isNostoActive && nostoAccountId && nostoAccountAppsKey;
  }
};
