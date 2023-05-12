export const state = () => ({
  udcData: null,
  currentZip: '',
  externalShippingFee: null
});

export const mutations = {
  setUDCdata(state, data) {
    state.udcData = data;
  },
  setCurrentZip(state, zip) {
    state.currentZip = zip;
  },
  setExternalShippingFee(state, fee) {
    state.externalShippingFee = fee;
  }
};

export const actions = {};

export const getters = {};
