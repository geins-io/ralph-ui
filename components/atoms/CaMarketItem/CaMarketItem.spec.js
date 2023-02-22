import { shallowMount } from '@vue/test-utils';
import CaMarketItem from './CaMarketItem.vue';

describe('CaMarketItem.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaMarketItem);
    expect(component.contains('.ca-market-item')).toBe(true);
  });
});
