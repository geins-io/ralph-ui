export const state = () => ({
  loading: false,
  delay: 0,
});

export const mutations = {
  setDelay(state, delay) {
    state.delay = delay;
  },
  start(state) {
    state.loading = true;
  },
  end(state) {
    state.loading = false;
  },
};

export const actions = {
  start({ state, commit }, delay = 1000) {
    commit('setDelay', delay);
    const interval = setInterval(() => {
      if (state.delay === -1) {
        clearInterval(interval);
        commit('setDelay', 0);
      } else if (state.delay === 0) {
        clearInterval(interval);
        commit('start');
      }
      commit('setDelay', state.delay - 100);
    }, 100);
  },
  end(context) {
    context.commit('setDelay', -1);
    context.commit('end');
  },
};

export const getters = {};
