import { shallowMount } from '@vue/test-utils';
import CaProductGalleryModal from './CaProductGalleryModal.vue';

describe('CaProductGalleryModal.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaProductGalleryModal);
    expect(component.contains('.ca-product-gallery-modal')).toBe(true);
  });
});
