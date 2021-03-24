export const state = () => ({
  data: null
});

export const mutations = {
  setCart(state, cart) {
    state.data = cart;
  }
};

export const actions = {
  update({ commit }, cart) {
    commit('setCart', cart);
    if (cart.id) {
      this.$cookies.set('ralph-cart', cart.id, {
        path: '/',
        expires: new Date(new Date().getTime() + 31536000000)
      });
    }
  },
  reset({ commit }) {
    commit('setCart', null);
    this.$cookies.remove('ralph-cart');
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
    return state.data?.id ? state.data.id : '';
  }
};
