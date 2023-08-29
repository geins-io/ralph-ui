export const state = () => ({
  message: '',
  timeout: null,
  placement: 'top-right',
  mode: '',
});

export const mutations = {
  show(state, message) {
    state.message = message;
  },
  hide(state) {
    state.message = '';
    state.placement = 'top-right';
    state.mode = '';
  },
  setPlacement(state, placement) {
    state.placement = placement;
  },
  setMode(state, mode) {
    state.mode = mode;
  },
  setTimeout(state, callback) {
    state.timeout = setTimeout(callback, 5000);
  },
  clearTimeout(state) {
    clearTimeout(state.timeout);
  },
};

export const actions = {
  trigger(context, payload) {
    context.commit('clearTimeout');
    context.commit('hide');
    if (payload.placement) {
      context.commit('setPlacement', payload.placement);
    }
    if (payload.mode) {
      context.commit('setMode', payload.mode);
    }
    context.commit('show', payload.message);
    context.commit('setTimeout', () => {
      context.commit('hide');
    });
  },
};

export const getters = {};
