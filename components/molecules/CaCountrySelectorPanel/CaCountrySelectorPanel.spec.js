import { shallowMount } from '@vue/test-utils';
import CaCountrySelectorPanel from './CaCountrySelectorPanel.vue';

describe('CaCountrySelectorPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaCountrySelectorPanel);
    expect(component.contains('.ca-country-selector-panel')).toBe(true);
  });
});
