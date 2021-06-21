export const state = () => ({
  backNavigated: false,
  relocateAlias: '',
  relocatePage: 1,
  querySelection: {
    categories: [],
    brands: [],
    skus: [],
    parameters: {}
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
  resetQuerySelection(state) {
    state.querySelection = {
      categories: [],
      brands: [],
      skus: [],
      parameters: {}
    };
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
  async saveQuerySelection({ commit, dispatch }, query) {
    const selection = {};
    if (query.categories) {
      const categories = query.categories.split(',');
      if (categories.length) {
        selection.categories = await dispatch('processUrlParams', categories);
      }
    } else {
      selection.categories = [];
    }
    if (query.brands) {
      const brands = query.brands.split(',');

      if (brands.length) {
        selection.brands = await dispatch('processUrlParams', brands);
      }
    } else {
      selection.brands = [];
    }
    if (query.skus) {
      const skus = query.skus.split(',');

      if (skus.length) {
        selection.skus = await dispatch('processUrlParams', skus);
      }
    } else {
      selection.skus = [];
    }

    selection.parameters = {};

    for (const group in query) {
      if (group.startsWith('p-')) {
        const groupName = group.substring(2);
        selection.parameters[groupName] = await dispatch(
          'processUrlParams',
          query[group].split(',')
        );
      }
    }

    if (query.sort) {
      selection.sort = query.sort;
    }
    commit('setQuerySelection', selection);
  },
  processUrlParams({ context }, array) {
    return array.map(i => {
      const label = i.split('~')[0];
      const id = i.split('~')[1];
      return { id, label };
    });
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
