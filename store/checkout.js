export const state = () => ({
  udcData: null,
  currentZip: ''
});

export const mutations = {
  setUDCdata(state, data) {
    state.udcData = data;
  },
  setCurrentZip(state, zip) {
    state.currentZip = zip;
  }
};

export const actions = {};

export const getters = {};
