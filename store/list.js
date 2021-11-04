export const state = () => ({
  backNavigated: false,
  relocateAlias: '',
  relocatePage: 1,
  querySelection: null,
  skipProductsQuery: false
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
    state.querySelection = null;
  },
  setSkipProductsQuery(state, bool) {
    state.skipProductsQuery = bool;
  }
};

export const actions = {
  resetTriggerRelocate(context) {
    context.commit('setBackNavigated', false);
    context.commit('setRelocateAlias', '');
  },
  async saveQuerySelection({ commit, dispatch }, data) {
    const selection = {};
    if (data.query.categories) {
      const categories = data.query.categories.split(',');
      if (categories.length) {
        selection.categories = await dispatch('processUrlParams', categories);
      }
    } else {
      selection.categories = [];
    }
    if (data.query.brands) {
      const brands = data.query.brands.split(',');

      if (brands.length) {
        selection.brands = await dispatch('processUrlParams', brands);
      }
    } else {
      selection.brands = [];
    }
    if (data.query.skus) {
      const skus = data.query.skus.split(',');

      if (skus.length) {
        selection.skus = await dispatch('processUrlParams', skus);
      }
    } else {
      selection.skus = [];
    }

    selection.parameters = {};

    for (const group in data.query) {
      if (group.startsWith('p-')) {
        const groupName = group.substring(2);
        selection.parameters[groupName] = await dispatch(
          'processUrlParams',
          data.query[group].split(',')
        );
      }
    }

    if (data.query.sort) {
      selection.sort = data.query.sort;
    }
    if (data.query.page && data.setPage) {
      commit('setRelocatePage', parseInt(data.query.page));
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
