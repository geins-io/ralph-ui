import { shallowMount } from '@vue/test-utils';
import CaSlide from './CaSlide.vue';

describe('CaSlide.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSlide);
    expect(component.contains('.ca-slide')).toBe(true);
  });
});
