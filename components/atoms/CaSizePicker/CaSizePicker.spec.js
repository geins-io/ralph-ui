import { shallowMount } from '@vue/test-utils';
import CaSizePicker from './CaSizePicker.vue';

describe('CaSizePicker.vue', () => {
  it('renders a component', () => {
    const component = shallowMount(CaSizePicker);
    expect(component.contains('.ca-size-picker')).toBe(true);
  });
});
