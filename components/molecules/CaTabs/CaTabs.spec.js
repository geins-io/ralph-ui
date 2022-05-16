import { shallowMount } from '@vue/test-utils';
import CaTabs from './CaTabs.vue';

describe('CaTabs.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaTabs);
    expect(component.contains('.ca-tabs')).toBe(true);
  });
});
