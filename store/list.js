export const state = () => ({
  backNavigated: false,
  relocateAlias: '',
  relocatePage: 1,
  querySelection: {
    categories: [],
    brands: []
  },
  firstFilterChanged: null,
  latestFilterChanged: null
});

export const mutations = {
  setBackNavigated(state, bool) {
    state.backNavigated = bool;
  },
  setRelocateAlias(state, alias) {
    state.relocateAlias = alias;
  },
  setRelocatePage(state, page) {
    state.relocatePage = page;
  },
  setQuerySelection(state, selection) {
    state.querySelection = selection;
  },
  setFirstFilterChanged(state, filter) {
    state.firstFilterChanged = filter;
  },
  setLatestFilterChanged(state, filter) {
    state.latestFilterChanged = filter;
  }
};

export const actions = {
  resetTriggerRelocate(context) {
    context.commit('setBackNavigated', false);
    context.commit('setRelocateAlias', '');
  },
  saveQuerySelection({ commit }, query) {
    const selection = {};
    if (query.categories) {
      const categories = query.categories.split(',');

      if (categories.length) {
        const selectedCategories = categories.map(i => {
          const label = i.split('~')[0];
          const id = i.split('~')[1];
          return { id, label };
        });
        selection.categories = selectedCategories;
      }
    } else {
      selection.categories = [];
    }
    if (query.brands) {
      const brands = query.brands.split(',');

      if (brands.length) {
        const selectedBrands = brands.map(i => {
          const label = i.split('~')[0];
          const id = i.split('~')[1];
          return { id, label };
        });
        selection.brands = selectedBrands;
      }
    } else {
      selection.brands = [];
    }
    if (query.sort) {
      selection.sort = query.sort;
    }
    commit('setQuerySelection', selection);
  }
};

export const getters = {
  relocateProduct(state) {
    return state.backNavigated && state.relocateAlias !== '';
  },
  backNavigated(state) {
    return state.backNavigated;
  }
};
