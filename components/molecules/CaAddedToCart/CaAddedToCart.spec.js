import { shallowMount } from '@vue/test-utils';
import CaAddedToCart from './CaAddedToCart.vue';

describe('CaAddedToCart.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaAddedToCart);
    expect(component.contains('.ca-added-to-cart')).toBe(true);
  });
});
