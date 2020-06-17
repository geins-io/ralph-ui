import { shallowMount } from '@vue/test-utils';
import CaFilterRange from './CaFilterRange.vue';

describe('CaFilterRange.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFilterRange);
    expect(component.contains('.ca-filter-range')).toBe(true);
  });
});
