import { shallowMount } from '@vue/test-utils';
import CaUdc from './CaUdc.vue';

describe('CaUdc.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaUdc);
    expect(component.contains('.ca-udc')).toBe(true);
  });
});
