import { shallowMount } from '@vue/test-utils';
import CaProductPriceHistory from './CaProductPriceHistory.vue';

describe('CaProductPriceHistory.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductPriceHistory);
    expect(component.contains('.ca-product-price-history')).toBe(true);
  });
});
