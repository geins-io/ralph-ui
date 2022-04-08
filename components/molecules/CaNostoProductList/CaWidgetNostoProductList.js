import { shallowMount } from '@vue/test-utils';
import CaNostoProductList from './CaNostoProductList.vue';

describe('CaNostoProductList.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaNostoProductList);
    expect(component.contains('.ca-nosto-product-list')).toBe(true);
  });
});
