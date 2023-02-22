import { shallowMount } from '@vue/test-utils';
import CaMarketSelectorButton from './CaMarketSelectorButton.vue';

describe('CaMarketSelectorButton.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaMarketSelectorButton);
    expect(component.contains('.ca-market-selector-button')).toBe(true);
  });
});
