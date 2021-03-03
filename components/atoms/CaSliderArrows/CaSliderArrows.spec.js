import { shallowMount } from '@vue/test-utils';
import CaSliderArrows from './CaSliderArrows.vue';

describe('CaSliderArrows.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSliderArrows);
    expect(component.contains('.ca-slider-arrows')).toBe(true);
  });
});
