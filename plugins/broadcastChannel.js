import { BroadcastChannel as BroadcastService } from 'broadcast-channel';

export default function({ store }) {
  const bc = new BroadcastService('ralph_channel');

  bc.addEventListener('message', function(data) {
    store.commit('cart/setCart', data);
  });
}
