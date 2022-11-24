import { shallowMount } from '@vue/test-utils';
import CaProductPriceHistoryPanel from './CaProductPriceHistoryPanel.vue';

describe('CaProductPriceHistoryPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductPriceHistoryPanel);
    expect(component.contains('.ca-product-price-history-panel')).toBe(true);
  });
});
