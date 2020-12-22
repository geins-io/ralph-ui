import { shallowMount } from '@vue/test-utils';
import CaVariantPickerColor from './CaVariantPickerColor.vue';

describe('CaVariantPickerColor.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaVariantPickerColor);
    expect(component.contains('.ca-variant-picker-color')).toBe(true);
  });
});
