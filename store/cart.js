import { BroadcastChannel as BroadcastService } from 'broadcast-channel';
import getCartQuery from 'cart/get.graphql';

export const state = () => ({
  data: null,
  added: null,
});

export const mutations = {
  setCart(state, cart) {
    state.data = cart;
  },
  setAdded(state, added) {
    state.added = added;
  },
};

export const actions = {
  async get({ dispatch, getters, rootState, rootGetters }, id = null) {
    if (id) {
      dispatch('update', { id });
    }

    const variables = {
      id: id || getters.id,
      cartMarketAlias: rootGetters['channel/cartMarketAlias'],
      allowExternalShippingFee:
        rootState.currentRouteName?.includes('checkout'),
    };
    const callback = (result) => {
      return result?.data?.getCart || null;
    };

    const cart = await this.app.$fetchData(
      getCartQuery,
      callback,
      variables,
      'no-cache',
    );

    if (cart) {
      dispatch('update', cart);
    }
  },
  update({ state, commit }, cart) {
    const cartData = cart || state.data;
    commit('setCart', cartData);

    if (process.server) {
      return;
    }

    const bc = new BroadcastService('ralph_channel');
    bc.postMessage({ type: 'cart', data: cartData });

    if (cartData.id) {
      this.$cookies.set('ralph-cart', cartData.id, {
        path: '/',
        expires: new Date(new Date().getTime() + 31536000000),
      });
    }
  },
  reset({ commit, dispatch }) {
    commit('setCart', null);
    this.$cookies.remove('ralph-cart', { path: '/' });
    dispatch('get');
  },
  changed({ state }, carts) {
    return (
      carts.new.items?.length !== carts.old.items?.length ||
      carts.new.summary.shipping.shippingFeeIncVat !==
        carts.old.summary.shipping.shippingFeeIncVat ||
      carts.new.summary.total.sellingPriceIncVatFormatted !==
        carts.old.summary.total.sellingPriceIncVatFormatted ||
      carts.new.summary.shipping.isDefault !==
        carts.old.summary.shipping.isDefault
    );
  },
  itemsChanged({ state }, carts) {
    return (
      carts.new.summary?.subTotal.regularPriceIncVatFormatted !==
        carts.old.summary?.subTotal.regularPriceIncVatFormatted ||
      carts.new.promoCode !== carts.old.promoCode
    );
  },
  triggerAddedNotification({ commit }, added) {
    const item = {
      campaign: { appliedCampaigns: added.product.discountCampaigns },
      unitPrice: added.product.unitPrice,
      product: added.product,
      quantity: added.item.quantity,
      skuId: added.item.skuId,
    };
    commit('setAdded', item);
  },
  removeAddedNotification({ commit }) {
    commit('setAdded', null);
  },
};

export const getters = {
  totalQuantity(state) {
    if (state.data && state.data.items) {
      let quantity = 0;
      for (let i = 0; i < state.data.items.length; i++) {
        quantity += state.data.items[i].quantity;
      }
      return quantity;
    } else {
      return 0;
    }
  },
  id(state) {
    return state.data?.id ? state.data.id : '';
  },
};
