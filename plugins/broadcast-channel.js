import { BroadcastChannel as BroadcastService } from 'broadcast-channel';

export default function ({ store }) {
  const bc = new BroadcastService('ralph_channel');

  const handler = (params) => {
    if (params.type === 'cart') {
      store.commit('cart/setCart', params.data);
    } else if (params.type === 'auth') {
      store.commit('auth/setUser', params.data);
    } else if (params.type === 'market') {
      store.commit('channel/setCurrentMarket', params.data);
    } else if (params.type === 'checkout-market') {
      store.commit('channel/setCheckoutMarket', params.data);
    }
  };
  bc.addEventListener('message', handler);
}
