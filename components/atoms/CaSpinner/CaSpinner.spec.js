import { shallowMount } from '@vue/test-utils';
import CaSpinner from './CaSpinner.vue';

describe('CaSpinner.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSpinner);
    expect(component.contains('.ca-spinner')).toBe(true);
  });
});
