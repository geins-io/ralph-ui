import { BroadcastChannel as BroadcastService } from 'broadcast-channel';

export const state = () => ({
  data: null,
  added: null
});

export const mutations = {
  setCart(state, cart) {
    state.data = cart;
  },
  setAdded(state, added) {
    state.added = added;
  }
};

export const actions = {
  update({ commit }, cart) {
    commit('setCart', cart);

    if (process.browser) {
      const bc = new BroadcastService('ralph_channel');
      bc.postMessage(cart);
    }

    if (cart.id) {
      this.$cookies.set('ralph-cart', cart.id, {
        path: '/',
        expires: new Date(new Date().getTime() + 31536000000)
      });
    }
  },
  reset({ commit }) {
    commit('setCart', null);
    this.$cookies.remove('ralph-cart');
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
      carts.old.summary?.subTotal.regularPriceIncVatFormatted
    );
  },
  triggerAddedNotification({ commit }, added) {
    const item = {
      campaign: { appliedCampaigns: added.product.discountCampaigns },
      unitPrice: added.product.unitPrice,
      product: added.product,
      quantity: added.item.quantity,
      skuId: added.item.skuId
    };
    commit('setAdded', item);
  },
  removeAddedNotification({ commit }) {
    commit('setAdded', null);
  }
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
  }
};
