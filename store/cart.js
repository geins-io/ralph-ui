export const state = () => ({
  data: {},
  id: ''
});

export const mutations = {
  update(state, cart) {
    state.data = cart;
  },
  setId(state, id) {
    state.id = id;
  }
};

export const actions = {
  reset(context) {
    context.commit('update', {});
    context.commit('setId', '');
  }
};

export const getters = {
  totalQuantity(state) {
    if (state.data && state.data.items) {
      let quantity = 0;
      for (let i = 0; i < state.data.items.length; i++) {
        quantity += state.data.items[i].quantity;
      }
      return quantity;
    } else return 0;
  },
  id(state) {
    return state.data && state.data.id ? state.data.id : '';
  }
};
