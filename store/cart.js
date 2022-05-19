import { BroadcastChannel as BroadcastService } from 'broadcast-channel';
import getCartQuery from 'cart/get.graphql';
import GtmService from '../services/gtm';

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
  get({ dispatch, getters }, id = null) {
    if (id) {
      dispatch('update', { id });
    }
    const client = this.app.apolloProvider.defaultClient;
    client
      .query({
        query: getCartQuery,
        variables: {
          id: id ?? getters.id
        },
        fetchPolicy: 'no-cache'
      })
      .then(result => {
        if (result?.data?.getCart) {
          dispatch('update', result.data.getCart);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  },
  sendNostoEvent(context, cart) {
    window.nostojs(api => {
      api
        .defaultSession()
        .setCart({
          items: cart.items.map(item => ({
            name: item.product.name,
            price_currency_code: 'EUR',
            product_id: item.product.productId,
            quantity: item.quantity,
            sku_id: item.skuId,
            unit_price: item.unitPrice.sellingPriceIncVat
          }))
        })
        .viewCart()
        .update();
    });
  },
  update({ commit, state, dispatch, $gtm }, cart) {
    if (process.browser) {
      if (this.$config.isNostoActive) {
        dispatch('sendNostoEvent', cart);
      }

      const bc = new BroadcastService('ralph_channel');
      bc.postMessage({ type: 'cart', data: cart });

      if (this.$gtm) {
        const { isSame, isRemove, products } = GtmService.getCheckoutUpdate(
          state.data.items,
          cart.items
        );

        if (!isSame) {
          if (isRemove) {
            this.$gtm.push({
              event: 'Remove from Cart',
              ecommerce: {
                currencyCode: 'SEK',
                remove: { products }
              },
              'gtm.uniqueEventId': 12
            });
          } else {
            this.$gtm.push({
              event: 'Add to Cart',
              ecommerce: {
                currencyCode: 'SEK',
                add: { products }
              },
              'gtm.uniqueEventId': 11
            });
          }
        }
      }
    }

    commit('setCart', cart);

    if (cart.id) {
      this.$cookies.set('ralph-cart', cart.id, {
        path: '/',
        expires: new Date(new Date().getTime() + 31536000000)
      });
    }
  },
  reset({ commit, dispatch }) {
    commit('setCart', null);
    this.$cookies.remove('ralph-cart');
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
