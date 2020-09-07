import { shallowMount } from '@vue/test-utils';
import CaDisplayCart from './CaDisplayCart.vue';

describe('CaDisplayCart.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaDisplayCart);
    expect(component.contains('.ca-display-cart')).toBe(true);
  });
});
