import { shallowMount } from '@vue/test-utils';
import CaFilterPanel from './CaFilterPanel.vue';

describe('CaFilterPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFilterPanel);
    expect(component.contains('.ca-filter-panel')).toBe(true);
  });
});
