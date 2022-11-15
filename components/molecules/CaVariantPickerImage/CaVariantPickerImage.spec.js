import { shallowMount } from '@vue/test-utils';
import CaVariantPickerImage from './CaVariantPickerImage.vue';

describe('CaVariantPickerImage.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaVariantPickerImage);
    expect(component.contains('.ca-variant-picker-image')).toBe(true);
  });
});
