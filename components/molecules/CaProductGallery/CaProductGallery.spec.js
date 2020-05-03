import { shallowMount } from '@vue/test-utils';
import CaProductGallery from './CaProductGallery.vue';

describe('CaProductGallery.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductGallery);
    expect(component.contains('.ca-product-gallery')).toBe(true);
  });
});
