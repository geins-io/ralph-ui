import { shallowMount } from '@vue/test-utils';
import CaFilterMulti from './CaFilterMulti.vue';

describe('CaFilterMulti.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFilterMulti);
    expect(component.contains('.ca-filter-multi')).toBe(true);
  });
});
