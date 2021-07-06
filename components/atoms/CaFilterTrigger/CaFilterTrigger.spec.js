import { shallowMount } from '@vue/test-utils';
import CaFilterTrigger from './CaFilterTrigger.vue';

describe('CaFilterTrigger.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaFilterTrigger);
    expect(component.contains('.ca-filter-trigger')).toBe(true);
  });
});
