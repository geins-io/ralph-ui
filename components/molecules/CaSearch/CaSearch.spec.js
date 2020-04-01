import { shallowMount } from '@vue/test-utils';
import CaSearch from './CaSearch.vue';

describe('CaSearch.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSearch);
    expect(component.contains('.ca-search')).toBe(true);
  });
});
