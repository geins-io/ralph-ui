import eventbus from '@ralph/ralph-ui/plugins/eventbus.js';
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
  categoryTree: [],
  headerHidden: false,
  currentRouteName: ''
});

export const mutations = {
  toggleFavorite(state, productId) {
    const favorites = state.favorites;
    if (favorites.includes(productId)) {
      favorites.splice(favorites.indexOf(productId), 1);
    } else if (productId) {
      favorites.push(productId);
    }
  },
  addFavorite(state, productId) {
    state.favorites.push(productId);
  },
  removeFavorite(state, productId) {
    state.favorites.splice(state.favorites.indexOf(productId), 1);
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
  setHeaderHidden(state, isHeaderHidden) {
    state.headerHidden = isHeaderHidden;
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
    state.config.nostoAccountId = config.nostoAccountId;
    state.config.isNostoActive = config.isNostoActive;
    state.config.nostoAccountAppsKey = config.nostoAccountAppsKey;
    state.config.gtmIsProductsKeyItems = config.gtm?.isProductsKeyItems;
  },
  setAncientBrowser(state, browser) {
    state.ancientBrowser = browser === 'Internet Explorer';
  },
  setCategoryTree(state, tree) {
    state.categoryTree = tree;
  },
  setCurrentRouteName(state, name) {
    state.currentRouteName = name;
  }
};

export const actions = {
  toggleFavorite({ state, commit, dispatch }, productId) {
    const favorites = state.favorites;

    if (favorites.includes(productId)) {
      commit('removeFavorite', productId);
      dispatch('events/pushEvent', {
        type: 'favorite:remove',
        data: { productId }
      });
    } else if (productId) {
      commit('addFavorite', productId);
      dispatch('events/pushEvent', {
        type: 'favorite:add',
        data: { productId }
      });
    }
  },
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
          // Set scroll top
          const startScrollTop = context.state.scrollTop;
          context.commit('setScrollTop');

          if (process.client) {
            // Scrolling down & past main layout padding hides header
            if (!document.querySelector('.ca-layout-default__main')) {
              return;
            }

            const stopScrollTop = context.state.scrollTop;
            const mainLayout = document.querySelector(
              '.ca-layout-default__main'
            );
            const mainLayoutOffset = parseInt(
              getComputedStyle(mainLayout).paddingTop
            );
            const isHeaderHidden =
              startScrollTop > mainLayoutOffset &&
              startScrollTop < stopScrollTop;
            context.commit('setHeaderHidden', isHeaderHidden);
          }
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
  setCustomerTypeCookie({ state }, customerType) {
    if (customerType) {
      this.$cookies.set('ralph-user-type', customerType, {
        path: '/',
        expires: new Date(new Date().getTime() + 31536000000)
      });
    }
  },
  clearAndRefetchApollo({ dispatch }) {
    this.app.apolloProvider.defaultClient.cache.reset();
    eventbus.$emit('refetch-apollo-queries');
    dispatch('cart/get');
  },
  nuxtServerInit({ commit, dispatch, getters, state }, { req, route, app }) {
    this.$appInsights?.trackTrace({
      message: 'nuxtServerInit'
    });
    commit('setHostName', req.headers.host);
    commit('setConfig', this.$config);
    commit('setCurrentRouteName', route.name);

    dispatch('list/saveQuerySelection', {
      query: route.query,
      setPage: true
    });

    if (this.$ua.deviceType() === 'pc') {
      commit('setViewportWidth', 1360);
    }
    commit('setAncientBrowser', this.$ua.browser());

    const parsed = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};

    // Set current market from cookie if exists, otherwise fallback market
    const currentMarket =
      parsed['ralph-selected-market'] ?? this.$config.fallbackMarketAlias;
    const checkoutMarket = parsed['ralph-checkout-market'] ?? currentMarket;

    // Set fallback markets for first routing (before API call is done)
    commit('channel/setMarkets', this.$config.markets);
    // Get markets from API
    dispatch('channel/getMarkets');
    // Set current market
    commit('channel/setCurrentMarket', currentMarket);
    commit('channel/setCheckoutMarket', checkoutMarket);

    // Set current locale and currency
    commit('channel/setCurrentLocale', this.$i18n.localeProperties.iso);
    commit('channel/setCurrentCurrency', getters['channel/currentCurrency']);

    // Set user from cookie
    const user = parsed['ralph-user'] || null;
    commit('auth/setUser', user);

    // Set cart id from cookie and get cart
    const cartId = parsed['ralph-cart'] || '';
    dispatch('cart/get', cartId);
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
    } else if (state.viewportWidth < state.config.breakpoints.desktopBig) {
      return 'desktop';
    } else {
      return 'desktopBig';
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
  },
  getGtmProductsKey: state => {
    return state.config.gtmIsProductsKeyItems ? 'items' : 'products';
  }
};
