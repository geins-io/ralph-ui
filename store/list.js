export const state = () => ({
  backNavigated: false,
  relocateAlias: '',
  relocatePage: 1,
  querySelection: {
    categories: [],
    brands: [],
    skus: [],
    price: [],
    discount: [],
    parameters: {},
  },
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
      price: [],
      discount: [],
      parameters: {},
    };
  },
};

export const actions = {
  resetTriggerRelocate(context) {
    context.commit('setBackNavigated', false);
    context.commit('setRelocateAlias', '');
  },
  async saveQuerySelection({ rootState, commit, dispatch, getters }, data) {
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
    if (data.query.price) {
      const price = data.query.price.split(',');

      if (price.length) {
        selection.price = await dispatch('processUrlParams', price);
      }
    } else {
      selection.price = [];
    }
    if (data.query.discount) {
      const discount = data.query.discount.split(',');

      if (discount.length) {
        selection.discount = await dispatch('processUrlParams', discount);
      }
    } else {
      selection.discount = [];
    }

    selection.parameters = {};

    for (const group in data.query) {
      if (group.startsWith('p-')) {
        const groupName = group.substring(2);
        selection.parameters[groupName] = await dispatch(
          'processUrlParams',
          data.query[group].split(','),
        );
      }
    }

    const isOnSearchPage = rootState.currentRouteName?.includes('search');

    if (data.query.sort) {
      selection.sort = data.query.sort;
    } else {
      selection.sort = isOnSearchPage
        ? 'RELEVANCE'
        : rootState.config.productListDefaultSort;

      if (getters.customDefaultSort) {
        selection.sort = getters.customDefaultSort;
      }
    }

    if (data.query.page && data.setPage) {
      commit('setRelocatePage', parseInt(data.query.page));
    }
    commit('setQuerySelection', selection);
  },
  processUrlParams({ context }, array) {
    return array.map((i) => {
      const label = i.split('~')[0];
      const id = i.split('~')[1];
      return { id, label };
    });
  },
};

export const getters = {
  relocateProduct(state) {
    return state.backNavigated && state.relocateAlias !== '';
  },
  backNavigated(state) {
    return state.backNavigated;
  },
  customDefaultSort(state, getters, rootState) {
    const customRoute = rootState.config.customSortRoutes?.find((route) =>
      rootState.currentRouteName?.includes(route.name),
    );
    return customRoute ? customRoute.sort : null;
  },
};
