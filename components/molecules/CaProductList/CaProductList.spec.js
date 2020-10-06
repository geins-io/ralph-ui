import { shallowMount } from '@vue/test-utils';
import CaProductList from './CaProductList.vue';

describe('CaProductList.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductList);
    expect(component.contains('.ca-product-list')).toBe(true);
  });
});
