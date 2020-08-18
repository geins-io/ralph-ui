import { shallowMount } from '@vue/test-utils';
import CaProductQuantity from './CaProductQuantity.vue';

describe('CaProductQuantity.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductQuantity);
    expect(component.contains('.ca-product-quantity')).toBe(true);
  });
});
