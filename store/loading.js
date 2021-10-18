export const state = () => ({
  loading: false,
  timeout: null,
  delay: 0
});

export const mutations = {
  setDelay(state, delay) {
    state.delay = delay;
  },
  setTimeout(state, callback) {
    state.timeout = setTimeout(callback, state.delay);
  },
  clearTimeout(state) {
    clearTimeout(state.timeout);
  },
  start(state) {
    state.loading = true;
  },
  end(state) {
    state.loading = false;
  }
};

export const actions = {
  start(context, delay = 1000) {
    context.commit('setDelay', delay);
    context.commit('setTimeout', () => {
      context.commit('start');
    });
  },
  end(context) {
    context.commit('clearTimeout');
    context.commit('end');
  }
};

export const getters = {};
