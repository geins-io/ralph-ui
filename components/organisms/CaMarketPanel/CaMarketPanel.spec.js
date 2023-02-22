import { shallowMount } from '@vue/test-utils';
import CaMarketPanel from './CaMarketPanel.vue';

describe('CaMarketPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaMarketPanel);
    expect(component.contains('.ca-market-panel')).toBe(true);
  });
});
