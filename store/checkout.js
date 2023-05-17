export const state = () => ({
  udcData: null,
  currentZip: '',
  externalShippingFee: null,
  merchantData: ''
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
  },
  setMerchantData(state, data) {
    state.merchantData = data;
  }
};

export const actions = {};

export const getters = {};
