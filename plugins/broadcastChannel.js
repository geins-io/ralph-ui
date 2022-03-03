export default function({ store }) {
  const bc = new BroadcastChannel('ralph_channel');

  bc.addEventListener('message', function(event) {
    store.commit('cart/setCart', event.data);
  });
}
