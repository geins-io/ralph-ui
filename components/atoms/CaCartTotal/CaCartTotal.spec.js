import { shallowMount } from '@vue/test-utils';
import CartTotal from './CartTotal.vue';

describe('CartTotal.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CartTotal);
    expect(component.contains('.ca-cart-total')).toBe(true);
  });
});
