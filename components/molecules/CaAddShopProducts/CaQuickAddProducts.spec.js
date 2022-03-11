import { shallowMount } from '@vue/test-utils';
import CaQuickShopProducts from './CaQuickShopProducts.vue';

describe('CaQuickShopProducts.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaQuickShopProducts);
    expect(component.contains('.ca-quick-shop-products')).toBe(true);
  });
});
