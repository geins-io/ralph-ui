// const cookie = process.server ? require('cookie') : undefined;

export const state = () => ({
  favorites: [],
  VATincluded: true,
  scrollTop: 0,
  viewportWidth: 0,
  hostname: '',
  config: {},
  ancientBrowser: false
});

export const mutations = {
  toggleFavorite(state, prodID) {
    const favorites = state.favorites;
    if (favorites.includes(prodID)) {
      favorites.splice(favorites.indexOf(prodID), 1);
    } else {
      favorites.push(prodID);
    }
  },
  setVATincluded(state, vatincluded) {
    state.VATincluded = vatincluded;
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
    state.config.apiKey = config.apiKey;
    state.config.authEndpoint = config.authEndpoint;
    state.config.signEndpoint = config.signEndpoint;
  },
  setAncientBrowser(state, browser) {
    state.ancientBrowser = browser === 'Internet Explorer';
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
  nuxtServerInit({ commit, dispatch }, { req }) {
    commit('setHostName', req.headers.host);
    commit('setConfig', this.$config);
    if (this.$ua.deviceType() === 'pc') {
      commit('setViewportWidth', 1360);
    }
    commit('setAncientBrowser', this.$ua.browser());

    // dispatch('auth/initClient');
    // dispatch('auth/refresh');
    // if (req.headers.cookie) {
    //   const parsed = cookie.parse(req.headers.cookie);
    //   const token = parsed['ralph-auth'] || null;
    //   const refresh = parsed['ralph-auth-refresh'] || null;
    //   console.log({ token, refresh });
    // }
  }
};

export const getters = {
  siteIsAtTop(state) {
    return state.scrollTop <= 10;
  },
  viewportComputer(state) {
    return state.viewportWidth >= state.config.breakpoints.laptop;
  },
  viewport(state) {
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
  isFavorite: state => prodId => {
    return state.favorites.includes(prodId);
  },
  getSellingPrice: state => price => {
    return state.VATincluded
      ? price.sellingPriceIncVatFormatted
      : price.sellingPriceExVatFormatted;
  },
  getRegularPrice: state => price => {
    return state.VATincluded
      ? price.regularPriceIncVatFormatted
      : price.regularPriceExVatFormatted;
  }
};
