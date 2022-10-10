import { shallowMount } from '@vue/test-utils';
import CaCountrySelector from './CaCountrySelector.vue';

describe('CaCountrySelector.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCountrySelector);
    expect(component.contains('.ca-country-selector')).toBe(true);
  });
});
