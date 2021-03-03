import { shallowMount } from '@vue/test-utils';
import CaSliderDots from './CaSliderDots.vue';

describe('CaSliderDots.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSliderDots);
    expect(component.contains('.ca-slider-dots')).toBe(true);
  });
});
