export const state = () => ({
  component: '',
  componentProps: {}
});

export const mutations = {
  open(state, settings) {
    state.component = settings.component;
    state.componentProps = settings.componentProps;
  },
  close(state) {
    state.component = '';
    state.componentProps = {};
  }
};

export const actions = {};

export const getters = {};
