import { shallowMount } from '@vue/test-utils';
import CaMiniCart from './CaMiniCart.vue';

describe('CaMiniCart.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaMiniCart);
    expect(component.contains('.ca-mini-cart')).toBe(true);
  });
});
