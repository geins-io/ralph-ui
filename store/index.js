export const state = () => ({
  favorites: [],
  VATincluded: true,
  scrollTop: 0,
  viewportWidth: 0,
  loading: false,
  loadingTimeout: null
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
  setViewportWidth(state) {
    state.viewportWidth = window.innerWidth;
  },
  setLoadingTimeout(state, callback) {
    state.loadingTimeout = setTimeout(callback, 300);
  },
  clearLoadingTimeout(state) {
    clearTimeout(state.loadingTimeout);
  },
  startLoading(state) {
    state.loading = true;
  },
  endLoading(state) {
    state.loading = false;
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
  startGlobalLoading(context) {
    context.commit('setLoadingTimeout', () => {
      context.commit('startLoading');
    });
  },
  endGlobalLoading(context) {
    context.commit('clearLoadingTimeout');
    context.commit('endLoading');
  }
};

export const getters = {
  siteIsAtTop(state) {
    return state.scrollTop <= 10;
  },
  viewportLaptop(state) {
    return state.viewportWidth >= 1024;
  },
  viewportMobile(state) {
    return state.viewportWidth < 768;
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
