import { shallowMount } from '@vue/test-utils';
import CaCartProduct from './CaCartProduct.vue';

describe('CaCartProduct.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCartProduct);
    expect(component.contains('.ca-ca-cart-product')).toBe(true);
  });
});
