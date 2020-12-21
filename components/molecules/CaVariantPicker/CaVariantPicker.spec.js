import { shallowMount } from '@vue/test-utils';
import CaVariantPicker from './CaVariantPicker.vue';

describe('CaVariantPicker.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaVariantPicker);
    expect(component.contains('.ca-variant-picker')).toBe(true);
  });
});
