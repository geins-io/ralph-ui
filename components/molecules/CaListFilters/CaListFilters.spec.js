import { shallowMount } from '@vue/test-utils';
import CaListFilters from './CaListFilters.vue';

describe('CaListFilters.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaListFilters);
    expect(component.contains('.ca-list-filters')).toBe(true);
  });
});
