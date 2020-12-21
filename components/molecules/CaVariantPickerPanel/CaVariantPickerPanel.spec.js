import { shallowMount } from '@vue/test-utils';
import CaVariantPickerPanel from './CaVariantPickerPanel.vue';

describe('CaVariantPickerPanel.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaVariantPickerPanel);
    expect(component.contains('.ca-variant-picker-panel')).toBe(true);
  });
});
