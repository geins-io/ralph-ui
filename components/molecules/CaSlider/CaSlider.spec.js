import { shallowMount } from '@vue/test-utils';
import CaSlider from './CaSlider.vue';

describe('CaSlider.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSlider);
    expect(component.contains('.ca-slider')).toBe(true);
  });
});
