import { shallowMount } from '@vue/test-utils';
import CaFilter from './CaFilter.vue';

describe('CaFilter.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFilter);
    expect(component.contains('.ca-filter')).toBe(true);
  });
});
