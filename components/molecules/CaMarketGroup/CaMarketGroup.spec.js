import { shallowMount } from '@vue/test-utils';
import CaMarketGroup from './CaMarketGroup.vue';

describe('CaMarketGroup.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaMarketGroup);
    expect(component.contains('.ca-market-group')).toBe(true);
  });
});
