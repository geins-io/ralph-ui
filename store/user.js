export const state = () => ({
  id: null
});

export const mutations = {
  setUserId(state, id) {
    state.id = id;
  },
  unsetUserId(state) {
    state.id = null;
  }
};

export const actions = {};

export const getters = {};
