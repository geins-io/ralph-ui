export const state = () => ({
  current: '',
  frame: '',
});

export const mutations = {
  open(state, settings) {
    state.current = '';
    if (settings.frame) {
      state.frame = settings.frame;
    }
    state.current = settings.name;
  },
  close(state) {
    state.current = '';
    state.frame = '';
  },
  setFrame(state, frame) {
    state.frame = frame;
  },
};

export const actions = {};

export const getters = {
  isOpen(state) {
    return state.current !== '';
  },
};
