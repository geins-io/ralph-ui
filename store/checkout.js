export const state = () => ({
  nshiftData: null,
  currentZip: '',
  externalShippingFee: null,
  merchantData: '',
});

export const mutations = {
  setNshiftData(state, data) {
    state.nshiftData = data;
  },
  setCurrentZip(state, zip) {
    state.currentZip = zip;
  },
  setExternalShippingFee(state, fee) {
    state.externalShippingFee = fee;
  },
  setMerchantData(state, data) {
    state.merchantData = data;
  },
};

export const actions = {};

export const getters = {};
