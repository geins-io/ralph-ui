import { shallowMount } from '@vue/test-utils';
import CaCurrencySelector from './CaCurrencySelector.vue';

describe('CaCurrencySelector.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCurrencySelector);
    expect(component.contains('.ca-currency-selector')).toBe(true);
  });
});
