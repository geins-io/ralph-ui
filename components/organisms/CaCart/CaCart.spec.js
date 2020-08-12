import { shallowMount } from '@vue/test-utils';
import CaCart from './CaCart.vue';

describe('CaCart.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCart);
    expect(component.contains('.ca-ca-cart')).toBe(true);
  });
});
