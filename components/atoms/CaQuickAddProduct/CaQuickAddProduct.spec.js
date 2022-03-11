import { shallowMount } from '@vue/test-utils';
import CaQuickAddProduct from './CaQuickAddProduct.vue';

describe('CaQuickAddProduct.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaQuickAddProduct);
    expect(component.contains('.ca-quick-add-product')).toBe(true);
  });
});
