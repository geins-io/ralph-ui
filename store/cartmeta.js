export const state = () => ({
  productPackages: []
});

export const mutations = {
  setProductPackage(state, productPackage) {
    state.productPackages.push(productPackage);
  },
  updateExistingProductPackageQuantity(state, { skuId, quantity }) {
    const existingProductPackage = state.productPackages.find(
      item => item.skuId === skuId
    );

    if (existingProductPackage) {
      existingProductPackage.quantity = quantity;
    }
  }
};

export const actions = {
  addProductPackage({ state, commit }, data) {
    console.log('cartmeta:addProductPackage', data);
    const cartItem = {
      campaign: { appliedCampaigns: data.product.discountCampaigns },
      unitPrice: data.product.unitPrice,
      product: data.product,
      quantity: data.quantity,
      skuId: data.product.skus[0].skuId
    };

    // If cart item already exists in productPackages, update quantity
    const existingCartItem = state.productPackages.find(
      item => item.skuId === cartItem.skuId
    );

    if (existingCartItem) {
      const quantity = existingCartItem.quantity + cartItem.quantity;
      commit('updateExistingProductPackageQuantity', {
        skuId: cartItem.skuId,
        quantity
      });
      return;
    }

    commit('setProductPackage', cartItem);
  },
  removeProductPackage({ state, commit }, skuId) {
    console.log('cartmeta:removeProductPackage');
    const existingCartItem = state.productPackages.find(
      item => item.skuId === skuId
    );

    if (existingCartItem) {
      const index = state.productPackages.indexOf(existingCartItem);
      state.productPackages.splice(index, 1);
    }
  }
};

export const getters = {};
