import { shallowMount } from '@vue/test-utils';
import CaSpecifications from './CaSpecifications.vue';

describe('CaSpecifications.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSpecifications);
    expect(component.contains('.ca-specifications')).toBe(true);
  });
});
