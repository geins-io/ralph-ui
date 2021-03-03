import { shallowMount } from '@vue/test-utils';
import CaVariantPickerDisplay from './CaVariantPickerDisplay.vue';

describe('CaVariantPickerDisplay.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaVariantPickerDisplay);
    expect(component.contains('.ca-variant-picker-display')).toBe(true);
  });
});
