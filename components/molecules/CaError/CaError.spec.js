import { shallowMount } from '@vue/test-utils';
import CaError500 from './CaError500.vue';

describe('CaError500.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaError500);
    expect(component.contains('.ca-error500')).toBe(true);
  });
});
