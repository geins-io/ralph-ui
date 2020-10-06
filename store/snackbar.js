export const state = () => ({
  message: '',
  timeout: null
});

export const mutations = {
  show(state, message) {
    state.message = message;
  },
  hide(state) {
    state.message = '';
  },
  setTimeout(state, callback) {
    state.timeout = setTimeout(callback, 3000);
  },
  clearTimeout(state) {
    clearTimeout(state.timeout);
  }
};

export const actions = {
  trigger(context, message) {
    context.commit('clearTimeout');
    context.commit('show', message);
    context.commit('setTimeout', () => {
      context.commit('hide');
    });
  }
};

export const getters = {};
