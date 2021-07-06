import { shallowMount } from '@vue/test-utils';
import CaActiveFilters from './CaActiveFilters.vue';

describe('CaActiveFilters.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaActiveFilters);
    expect(component.contains('.ca-active-filters')).toBe(true);
  });
});
