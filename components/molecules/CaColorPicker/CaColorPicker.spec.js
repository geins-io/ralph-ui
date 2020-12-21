import { shallowMount } from '@vue/test-utils';
import CaColorPicker from './CaColorPicker.vue';

describe('CaColorPicker.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaColorPicker);
    expect(component.contains('.ca-color-picker')).toBe(true);
  });
});
