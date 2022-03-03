import getCartQuery from 'cart/get.graphql';
const cookie = process.server ? require('cookie') : undefined;

export const state = () => ({
  favorites: [],
  customerType: 'PERSON',
  vatIncluded: true,
  scrollTop: 0,
  viewportWidth: 0,
  hostname: '',
  config: {},
  ancientBrowser: false,
  categoryTree: []
});

export const mutations = {
  toggleFavorite(state, prodAlias) {
    const favorites = state.favorites;
    if (favorites.includes(prodAlias)) {
      favorites.splice(favorites.indexOf(prodAlias), 1);
    } else if (prodAlias) {
      favorites.push(prodAlias);
    }
  },
  setCustomerType(state, type) {
    state.customerType = type;
  },
  setVatIncluded(state, vatIncluded) {
    state.vatIncluded = vatIncluded;
  },
  setScrollTop(state) {
    state.scrollTop = window.pageYOffset;
  },
  setViewportWidth(state, width = window.innerWidth) {
    state.viewportWidth = width;
  },
  setHostName(state, hostname) {
    state.hostname = hostname;
  },
  setConfig(state, config) {
    state.config.breakpoints = config.breakpoints;
    state.config.authEndpoint = config.authEndpoint;
    state.config.signEndpoint = config.signEndpoint;
    state.config.siteTopThreshold = config.siteTopThreshold;
    state.config.productListDefaultSort = config.productListDefaultSort;
    state.config.customerTypes = config.customerTypes;
  },
  setAncientBrowser(state, browser) {
    state.ancientBrowser = browser === 'Internet Explorer';
  },
  setCategoryTree(state, tree) {
    state.categoryTree = tree;
  }
};

export const actions = {
  initScrollListener(context) {
    let timeout;
    window.addEventListener(
      'scroll',
      () => {
        // If there's a timer, cancel it
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }
        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function() {
          // Run scroll functions
          context.commit('setScrollTop');
        });
      },
      { passive: true }
    );
  },
  initResizeListener(context) {
    let timeout;
    window.addEventListener(
      'resize',
      () => {
        // If there's a timer, cancel it
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }
        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function() {
          // Run resize functions
          context.commit('setViewportWidth');
        });
      },
      { passive: true }
    );
  },
  // Set scrollbar width, used to keep gap when disabeling body scroll
  setScrollbarWidth() {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      scrollbarWidth + 'px'
    );
  },
  // Set viewport height, used to know the actual viewpoer height on mobile
  setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  redirect404() {
    const url = window.location.origin + '/404';
    window.location.replace(url);
  },
  changeCustomerType({ state, commit }, type) {
    const currentType = type ?? 'PERSON';
    const typeObj = state.config.customerTypes.find(
      i => i.type === currentType
    );
    commit('setCustomerType', typeObj.type);
    commit('setVatIncluded', typeObj.vat);
  },
  nuxtServerInit({ commit, dispatch, getters }, { req, route, app }) {
    this.$appInsights?.trackTrace({
      message: 'nuxtServerInit'
    });
    commit('setHostName', req.headers.host);
    commit('setConfig', this.$config);

    dispatch('list/saveQuerySelection', {
      query: route.query,
      setPage: true
    });

    if (this.$ua.deviceType() === 'pc') {
      commit('setViewportWidth', 1360);
    }
    commit('setAncientBrowser', this.$ua.browser());

    // const defaultCustomerType = this.$config.customerTypes.find(i => i.default)
    //   .type;
    // commit('setCustomerType', defaultCustomerType);

    if (req.headers.cookie) {
      const parsed = cookie.parse(req.headers.cookie);
      const user = parsed['ralph-user'] || null;
      const cartId = parsed['ralph-cart'] || '';
      commit('auth/setUser', user);
      dispatch('cart/update', { id: cartId });
    }

    const client = app.apolloProvider.defaultClient;
    client
      .query({
        query: getCartQuery,
        variables: {
          id: getters['cart/id']
        }
      })
      .then(result => {
        dispatch('cart/update', result.data.getCart);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }
};

export const getters = {
  siteIsAtTop: state => {
    return state.scrollTop <= state.config.siteTopThreshold;
  },
  viewportComputer: state => {
    return state.viewportWidth >= state.config.breakpoints.laptop;
  },
  viewport: state => {
    if (state.viewportWidth < state.config.breakpoints.tablet) {
      return 'phone';
    } else if (state.viewportWidth < state.config.breakpoints.laptop) {
      return 'tablet';
    } else if (state.viewportWidth < state.config.breakpoints.desktop) {
      return 'laptop';
    } else {
      return 'desktop';
    }
  },
  isFavorite: state => prodAlias => {
    return state.favorites.includes(prodAlias);
  },
  getSellingPrice: state => price => {
    return state.vatIncluded
      ? price.sellingPriceIncVatFormatted
      : price.sellingPriceExVatFormatted;
  },
  getRegularPrice: state => price => {
    return state.vatIncluded
      ? price.regularPriceIncVatFormatted
      : price.regularPriceExVatFormatted;
  }
};
