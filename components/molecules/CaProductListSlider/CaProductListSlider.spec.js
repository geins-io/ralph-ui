import { shallowMount } from '@vue/test-utils';
import CaProductListSlider from './CaProductListSlider.vue';

describe('CaProductListSlider.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductListSlider);
    expect(component.contains('.ca-product-list-slider')).toBe(true);
  });
});
