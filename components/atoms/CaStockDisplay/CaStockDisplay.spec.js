import { shallowMount } from '@vue/test-utils';
import CaStockDisplay from './CaStockDisplay.vue';

describe('CaStockDisplay.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaStockDisplay);
    expect(component.contains('.ca-stock-display')).toBe(true);
  });
});
