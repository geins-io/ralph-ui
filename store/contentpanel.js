export const state = () => ({
  current: ''
});

export const mutations = {
  open(state, panelName) {
    state.current = panelName;
  },
  close(state) {
    state.current = '';
  }
};

export const actions = {};

export const getters = {
  isOpen(state) {
    return state.current !== '';
  }
};
